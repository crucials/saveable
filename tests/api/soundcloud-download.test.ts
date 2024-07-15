import { describe, expect, test } from 'vitest'
import { clientId } from '~/client-id'
import type { MediaInfo } from '~/types/media-info'

describe('soundcloud downloading', () => {
    test('download soundcloud track', async () => {
        const TRACK_URL =
            'https://soundcloud.com/relaxing-white-noise' +
            '/airplane-cabin-white-noise-jet'

        const response = await fetch(
            'http://localhost:3000' +
                '/api/media-info/soundcloud/track' +
                `?url=${TRACK_URL}` +
                `&client_id=${clientId}`,
        )
        expect(response.ok, `error status code: ${response.status}`).to.be.true

        const trackInfo: MediaInfo = await response.json()
        expect(trackInfo?.downloadUrl).toBeDefined()
    })
})
