import { API_BASE_URL } from '~/constants/api-urls'
import getTrackDownloadUrl from '~/server/utils/get-track-download-url'
import type { MediaInfo } from '~/types/media-info'
import type { SoundcloudApiTrack } from '~/types/soundcloud-api'

export default defineEventHandler<Promise<MediaInfo>>(async event => {
    const trackUrl = getQuery(event)['url']?.toString()
    const clientId = getQuery(event)['client_id']?.toString()

    const excludeArtistInFilename = getQuery(event)['exclude_artist'] === 'true'
    
    if(!trackUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'url' not provided`
        })
    }

    if(!clientId) {
        throw createError({
            statusCode: 400,
            message: `query param 'client_id' must be specified`
        })
    }

    const response = await fetch(API_BASE_URL + `/resolve?client_id=${clientId}&url=${trackUrl}`)
    
    if(!response.ok) {
        if(response.status === 404) {
            throw createError({ statusCode: 404, message: 'Track with that URL not found' })
        }
        else {
            throw createError({ statusCode: 500, message: 'Couldn\'t get track info' })
        }
    }

    const rawTrackInfo : SoundcloudApiTrack = await response.json()

    if(rawTrackInfo.kind != 'track') {
        throw createError({ statusCode: 400, message: 'Requested resource is not a track' })
    }

    const downloadUrl = await getTrackDownloadUrl(rawTrackInfo, clientId)
    
    if(!downloadUrl) {
        throw createError({ statusCode: 500, message: 'Failed to get download URL' })
    }

    const filename = excludeArtistInFilename ? rawTrackInfo.title 
        : `${rawTrackInfo.user.username} - ${rawTrackInfo.title}`
    const trackImageUrl = rawTrackInfo.artwork_url ? 
        getLargeArtworkUrl(rawTrackInfo.artwork_url) : null
    
    return {
        name: filename,
        downloadUrl: downloadUrl,
        metadata: {
            title: rawTrackInfo.title,
            artist: rawTrackInfo.user.username,
            imageUrl: trackImageUrl,
            url: rawTrackInfo.permalink_url
        }
    }
})

function getLargeArtworkUrl(artworkUrl : string) {
    /*
        soundcloud api returns that type of tracks 
        artwork (pic) - https://i1.sndcdn.com/artworks-435uih3u6ngfi-de64hj-large.jpg.
        despite the suffix '-large.jpg', the resolution is small asf.
        
        a larger size picture stored at urls with this
        format - https://i1.sndcdn.com/artworks-435uih3u6ngfi-de64hj-t500x500.jpg
    */
    const SMALL_ARTWORK_ENDING = '-large.jpg'
    return artworkUrl.slice(0, -SMALL_ARTWORK_ENDING.length) + '-t500x500.jpg'
}
