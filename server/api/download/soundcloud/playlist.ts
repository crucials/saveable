import { API_BASE_URL } from '~/constants/api-urls'
import getTrackDownloadUrl from '~/server/utils/get-track-download-url'
import { SoundcloudApiPlaylist, SoundcloudApiTrack } from '~/types/soundcloud-api'
import JSZip from 'jszip'

export default defineEventHandler(async event => {
    const clientId = useRuntimeConfig().soundcloudClientId
    const maximumPlaylistTracks = useRuntimeConfig().maximumPlaylistTracks
    
    const playlistUrl = getQuery(event)['url']?.toString()
    const excludeArtistInFilenames = getQuery(event)['exclude_artist'] === 'true'

    if(!playlistUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'url' not provided`
        })
    }

    const resolveResponse = await fetch(API_BASE_URL + `/resolve?client_id=${clientId}&url=${playlistUrl}`)
    
    if(!resolveResponse.ok) {
        if(resolveResponse.status === 404) {
            throw createError({ statusCode: 404, message: 'Playlist with that URL not found' })
        }
        else if(resolveResponse.status === 429) {
            throw createError({ statusCode: 429, message: 'Soundcloud API today\'s request limit was reached' })
        }
        else {
            throw createError({ statusCode: 500, message: 'Couldn\'t get playlist info' })
        }
    }

    const rawPlaylistInfo : SoundcloudApiPlaylist = await resolveResponse.json()

    if(rawPlaylistInfo.kind != 'playlist') {
        throw createError({ statusCode: 400, message: 'Requested resource is not a playlist' })
    }

    if(maximumPlaylistTracks !== '' && rawPlaylistInfo.track_count > +maximumPlaylistTracks) {
        throw createError({
            statusCode: 413, 
            message: 'Server cannot download playlists that have more than 20 tracks ' + 
                'cause of 512 MB memory limit. Btw, you can host this app by yourself - ' + 
                'https://github.com/crucials/saveable/blob/master/README.md#run-locally'
        })
    }

    const playlistTracksFiles = await getPlaylistTracksFiles(rawPlaylistInfo, excludeArtistInFilenames)

    const zip = new JSZip()

    for(const file of playlistTracksFiles) {
        zip.file(file.name, await file.arrayBuffer(), { binary: true, compression : 'DEFLATE' })
    }

    setHeaders(event, {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${rawPlaylistInfo.title}.zip`
    })

    return zip.generateNodeStream()
})

async function getPlaylistTracksFiles(playlist : SoundcloudApiPlaylist, excludeArtistInFilenames : boolean) {
    const MAXIMUM_TRACKS = 5
    const clientId = useRuntimeConfig().soundcloudClientId

    const playlistTracksFiles : File[] = []
    const rawPlaylistTracks = playlist.tracks

    for (let i = 0; i < rawPlaylistTracks.length; i += MAXIMUM_TRACKS) {
        const tracksIds = rawPlaylistTracks.slice(i, i + MAXIMUM_TRACKS).map(track => String(track.id))
        const tracksIdsString = tracksIds.reduce((id1, id2) => `${id1},${id2}`)

        const tracksResponse = await fetch(API_BASE_URL + `/tracks?client_id=${clientId}&ids=${tracksIdsString}`)

        if(!tracksResponse.ok) {
            if(tracksResponse.status == 429) {
                throw createError({ statusCode: 429, message: 'Soundcloud API today\'s request limit was reached' }) 
            }
            else {
                console.log(tracksResponse.status)
                throw createError({ statusCode: 500, message: 'Couldn\'t get playlist info' })
            }
        }

        const tracksResponseData : SoundcloudApiTrack[] = await tracksResponse.json()

        for (const track of tracksResponseData) {
            const downloadUrl = await getTrackDownloadUrl(track, clientId)

            if(downloadUrl) {
                const downloadUrlResponse = await fetch(downloadUrl)
                const trackName = excludeArtistInFilenames ? track.title : `${track.user.username} - ${track.title}`
                const trackFilename = trackName.replace(/[/\\?%*:|"<>]/g, '_') + '.mp3'

                if(downloadUrlResponse.ok) {
                    playlistTracksFiles.push(new File([ await downloadUrlResponse.blob() ], trackFilename))
                }
            }
        }
    }

    return playlistTracksFiles
}