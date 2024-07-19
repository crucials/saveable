import { readFileSync } from 'fs'
import { describe, expect, test } from 'vitest'
import type { MediaMetadata } from '~/types/metadata-editor'
import { getId3Tags } from '~/utils/id3-tags'
import { getTypedObjectKeys } from '~/utils/get-typed-object-keys'

describe('file id3 tags/metadata editing', () => {
    test('read file metadata', async () => {
        const TEST_FILE_PATH = './tests/assets/audio/test.mp3'

        const testFileBuffer = readFileSync(TEST_FILE_PATH)
        const testFileExpectedMetadata: MediaMetadata = {
            title: 'test audio file',
            album: 'album 1',
            artist: 'yyy',
        }

        const metadata = await getId3Tags(testFileBuffer)

        expect(
            metadata,
            'expected id3 tags wasnt loaded from file ' + TEST_FILE_PATH,
        ).to.not.empty

        getTypedObjectKeys(testFileExpectedMetadata).forEach(
            (metadataProperty) => {
                console.log(
                    metadata[metadataProperty],
                    testFileExpectedMetadata[metadataProperty],
                )
                const actualValue = metadata[metadataProperty]
                const expectedValue = testFileExpectedMetadata[metadataProperty]

                expect(
                    actualValue,
                    `value '${actualValue}' of property '${metadataProperty}' ` +
                        `doesnt match expected value '${expectedValue}'`,
                ).toBe(expectedValue)
            },
        )

        expect(
            metadata.image,
            `expected image wasnt loaded from test file ${TEST_FILE_PATH}`,
        ).toBeDefined()
    })
})
