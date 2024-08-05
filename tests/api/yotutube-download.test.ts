import { describe, expect, test } from 'vitest'
import type { MediaInfo } from '~/types/media-info'

const VIDEO_URL = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'

describe('youtube downloading', () => {
    test(`download youtube video - ${VIDEO_URL}`, async () => {
        const videoResponse = await fetch(
            'http://localhost:3000' +
                '/api/media-info/youtube' +
                `?video_url=${VIDEO_URL}`,
        )

        expect(
            videoResponse,
            `error while getting video info, status code: ${videoResponse.status}`,
        ).to.be.ok

        const videoInfo: MediaInfo = await videoResponse.json()
        expect(videoInfo?.downloadUrl).toBeDefined()

        const videoFileResponse = await fetch(videoInfo.downloadUrl)
        expect(
            videoFileResponse,
            `error while getting video file, status code: ${videoFileResponse.status}`,
        ).to.be.ok

        await videoFileResponse.blob()
    })
})
