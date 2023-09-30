import ytdl from 'ytdl-core'
import { MediaInfo } from '~/types/media-info'

export default defineEventHandler<MediaInfo>(async event => {
    const videoUrl = getQuery(event)['video_url']?.toString()

    if(!videoUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'video_url' not provided`
        })
    }

    try {
        const videoInfo = await ytdl.getInfo(videoUrl)
        const bestFormat = videoInfo.formats.find(format => format.hasAudio && format.hasVideo) || videoInfo.formats[0]

        return {
            name: videoInfo.videoDetails.title,
            downloadUrl: bestFormat.url
        }
    }
    catch(error) {
        throw createError({ statusCode: 500, message: 'Couldn\'t get info for this video. Perhaps it doesn\'t exist' })
    }
})