export interface MediaInfo {
    name: string
    downloadUrl: string
    metadata?: {
        title: string
        artist: string
        imageUrl: string | null
        url: string
    }
}

export type PlaylistInfo = { name: string; tracks: MediaInfo[] }
