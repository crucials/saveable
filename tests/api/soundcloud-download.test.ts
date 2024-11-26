import { describe, expect, test } from 'vitest'
import type { MediaInfo } from '~/types/media-info'

const TRACK_URL =
    'https://soundcloud.com/heavyrainsoundsforsleep' +
    '/white-noise-sounds-heavy-rain'

describe('soundcloud downloading', () => {
    test(`download soundcloud track - ${TRACK_URL}`, async () => {
        const response = await fetch(
            'http://localhost:3000' +
                '/api/media-info/soundcloud/track' +
                `?url=${TRACK_URL}`,
        )
        expect(response, `error status code: ${response.status}`).to.be.ok

        const trackInfo: MediaInfo = await response.json()
        expect(trackInfo?.downloadUrl).toBeDefined()

        const fileResponse = await fetch(trackInfo.downloadUrl)
        expect(
            fileResponse,
            `error while getting audio file, status code: ${fileResponse.status}`,
        ).to.be.ok

        expect(
            (await fileResponse.blob()).type,
            'audio file has invalid format',
        ).to.eq('audio/mpeg')
    })
})
