import parse from 'id3-parser'
import { convertFileToBuffer } from 'id3-parser/lib/util'
import type { MediaMetadata } from '~/types/metadata-editor'

/**
 * reads id3 tags of a file
 * @param fileData buffer of a file to read from. see {@link convertFileToBuffer}
 * @returns object with file metadata properties (title, artist, etc.). can also return
 * empty object if tags cant be loaded
 */
export async function getId3Tags(fileData: Uint8Array): Promise<MediaMetadata> {
    const fileMetadata = parse(fileData)

    if (fileMetadata === false) {
        return {}
    }

    return fileMetadata
}
