export interface MetadataEditorData {
    modalOpened: boolean
    file: File | null
}

export interface MetadataImage {
    data?: ArrayLike<number>
    mime: string
    type: string
}

export type MetadataImageWithUrl = MetadataImage & { url: string }

export interface MediaMetadata {
    title?: string
    album?: string
    artist?: string
    year?: string
    image?: MetadataImage
}
