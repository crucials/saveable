import { API_BASE_URL } from '~/constants/api-urls'
import getTrackDownloadUrl from '~/server/utils/get-track-download-url'
import { MediaInfo, PlaylistInfo, SoundcloudApiPlaylist, SoundcloudApiTrack } from '~/types'

export default defineEventHandler<PlaylistInfo>(async event => {
    const MAXIMUM_TRACKS = 5

    const clientId = useRuntimeConfig().soundcloudClientId
    const playlistUrl = getQuery(event)['url']?.toString()

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
    const rawPlaylistTracks = rawPlaylistInfo.tracks

    const playlistTracks : MediaInfo[] = []

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
                playlistTracks.push({
                    name: `${track.user.username} - ${track.title}`,
                    downloadUrl: downloadUrl
                })
            }
        }
    }

    return {
        name: rawPlaylistInfo.title,
        tracks: playlistTracks
    }
})