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

        // const mp4Format =
        //     videoInfo.formats.find((format) =>
        //         format.mimeType?.startsWith('audio/mp4'),
        //     ) ||
        //     videoInfo.formats.find((format) =>
        //         format.mimeType?.startsWith('video/mp4'),
        //     )
        const mp4Format = searchFormat(
            videoInfo.formats,
            (format) =>
                format.mimeType !== undefined &&
                format.mimeType.startsWith('video/mp4') &&
                format.hasAudio &&
                format.hasVideo,
            (format) =>
                format.mimeType !== undefined &&
                format.mimeType.startsWith('audio/mp4'),
            (format) =>
                format.mimeType !== undefined &&
                format.mimeType.startsWith('video/mp4'),
        )

        if (!mp4Format) {
            throw createError({
                statusCode: 500,
                message: "Couldn't find suitable video format to download",
            })
        }

        return {
            name: videoInfo.videoDetails.title,
            downloadUrl: mp4Format.url,
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message:
                "Couldn't get info for this video. Perhaps it doesn't exist",
        })
    }
})

/**
 * finds format that matches according to **first** of provided
 * filter-functions (`filters`)
 * @param filters functions that check if format is suitable or not,
 * **from most to least prioritized**
 */
function searchFormat(
    formats: ytdl.videoFormat[],
    ...filters: ((format: ytdl.videoFormat) => boolean)[]
) {
    for (const filter of filters) {
        const foundFormat = formats.find(filter)

        if (foundFormat) {
            return foundFormat
        }
    }

    return null
}
