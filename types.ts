export interface SoundcloudResolveApiResponse {
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

export interface MediaInfo {
    name : string,
    downloadUrl : string
}