export interface MetadataEditorData {
    modalOpened: boolean
    file: File | null
}

export interface MetadataImage {
    data: ArrayBuffer
    mime: string
    type: string
}

export type MetadataImageWithUrl = MetadataImage & { url: string }

export interface MediaMetadata {
    title: string | null
    album: string | null
    artist: string | null
    year: string | null
    images?: MetadataImage[]
}
