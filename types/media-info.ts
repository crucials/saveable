export interface MediaInfo {
    name : string,
    downloadUrl : string
}

export type PlaylistInfo = { name : string, tracks : MediaInfo[] }