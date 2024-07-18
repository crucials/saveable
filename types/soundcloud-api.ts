export interface SoundcloudApiTrack {
    id: number
    artwork_url: string | null
    permalink_url: string
    user: {
        username: string
    }
    title: string
    kind: string
    media: {
        transcodings: {
            url: string
            format: {
                protocol: 'hls' | 'progressive'
            }
        }[]
    }
}

export interface SoundcloudApiPlaylist {
    title: string
    tracks: Pick<SoundcloudApiTrack, 'id'>[]
    sharing: 'public' | 'private'
    permalink_url: string
    kind: string
    track_count: number
}
