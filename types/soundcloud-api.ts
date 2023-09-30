export interface SoundcloudApiTrack {
    user : {
        username : string
    },
    title : string,
    kind : string,
    media : {
        transcodings: {
            url : string,
            format : {
                protocol : 'hls' | 'progressive'
            }
        }[]
    }
}

export interface SoundcloudApiPlaylist {
    title : string,
    tracks : [
        {
            id : number
        }
    ],
    kind : string
}