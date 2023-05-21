import { SoundcloudResolveApiResponse, MediaInfo } from '~/types'

export default defineEventHandler<MediaInfo>(async event => {
    const API_BASE_URL = 'https://api-v2.soundcloud.com'
    const clientId = useRuntimeConfig().soundcloudClientId
    const trackUrl = getQuery(event)['track_url']?.toString()
    
    if(!trackUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'track_url' not provided`
        })
    }

    const resolveResponse = await fetch(API_BASE_URL + `/resolve?client_id=${clientId}&url=${trackUrl}`)
    
    if(!resolveResponse.ok) {
        if(resolveResponse.status === 404) {
            throw createError({ statusCode: 404, message: 'Track with that URL not found' })
        }
        else {
            throw createError({ statusCode: 500, message: 'Couldn\'t get track info' })
        }
    }

    const rawTrackInfo : SoundcloudResolveApiResponse = await resolveResponse.json()
    const neededTranscoding = rawTrackInfo.media.transcodings.find(transcoding => {
        return transcoding.format.protocol === 'progressive'
    })
    
    if(!neededTranscoding) {
        throw createError({ statusCode: 500, message: 'Failed to get download URL' })
    }

    const { url: downloadUrl } = await (await fetch(neededTranscoding.url + `?client_id=${clientId}`)).json()
    console.log(rawTrackInfo)
    
    return {
        name: `${rawTrackInfo.user.username} - ${rawTrackInfo.title}`,
        downloadUrl: downloadUrl
    }
})