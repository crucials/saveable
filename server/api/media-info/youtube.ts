import ytdl from '@distube/ytdl-core'
import type { MediaInfo } from '~/types/media-info'

export default defineEventHandler<Promise<MediaInfo>>(async (event) => {
    const videoUrl = getQuery(event)['video_url']?.toString()

    if (!videoUrl) {
        throw createError({
            statusCode: 400,
            message: `Query parameter 'video_url' not provided`,
        })
    }

    try {
        const videoInfo = await ytdl.getInfo(videoUrl)
        console.log(videoInfo.formats)
        const bestFormat =
            videoInfo.formats.find(
                (format) => format.mimeType === 'video/mp4' && format.hasAudio
                    && format.hasVideo,
            ) || videoInfo.formats[0]

        return {
            name: videoInfo.videoDetails.title,
            downloadUrl: bestFormat.url,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message:
                "Couldn't get info for this video. Perhaps it doesn't exist",
        })
    }
})
