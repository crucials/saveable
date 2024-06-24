import { describe, expect, test } from 'vitest'

describe('samplefocus downloading', () => {
    test('download a sample from samplefocus', async () => {
        const SAMPLE_URL = 'https://samplefocus.com/samples/deep-kick'

        const sampleInfo = await getSampleMediaInfo(SAMPLE_URL)
        expect(sampleInfo?.downloadUrl).toBeDefined()

        const audioData = await (await fetch(sampleInfo?.downloadUrl)).blob()
        expect(audioData).toBeDefined()
    })
})
