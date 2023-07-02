import { API_BASE_URL } from '~/constants/api-urls'
import getTrackDownloadUrl from '~/server/utils/get-track-download-url'
import { SoundcloudApiTrack, MediaInfo } from '~/types'

export default defineEventHandler<MediaInfo>(async event => {
    const clientId = useRuntimeConfig().soundcloudClientId
    const trackUrl = getQuery(event)['url']?.toString()
    
    if(!trackUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'url' not provided`
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
    
    return {
        name: `${rawTrackInfo.user.username} - ${rawTrackInfo.title}`,
        downloadUrl: downloadUrl
    }
})