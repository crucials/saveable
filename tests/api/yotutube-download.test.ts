import { describe, expect, test } from 'vitest'
import type { MediaInfo } from '~/types/media-info'

const VIDEO_URL = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'

describe('youtube downloading', () => {
    test(`download youtube video - ${VIDEO_URL}`, async () => {
        const response = await fetch(
            'http://localhost:3000' +
                '/api/media-info/youtube' +
                `?video_url=${VIDEO_URL}`,
        )

        expect(response.ok, `error status code: ${response.status}`).to.be.true

        const trackInfo: MediaInfo = await response.json()
        expect(trackInfo?.downloadUrl).toBeDefined()
    })
})
