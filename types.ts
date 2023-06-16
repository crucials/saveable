export interface SoundcloudApiTrack {
    user : {
        username : string
    },
    title : string,
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
    ] 
}

export interface MediaInfo {
    name : string,
    downloadUrl : string
}

export type PlaylistInfo = { name : string, tracks : MediaInfo[] }