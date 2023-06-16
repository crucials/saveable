import { SoundcloudApiTrack } from '~/types'

export default async function getTrackDownloadUrl(track : SoundcloudApiTrack, clientId : string) {
    const neededTranscoding = track.media.transcodings.find(transcoding => {
        return transcoding.format.protocol === 'progressive'
    })
    
    if(!neededTranscoding) {
        return undefined
    }

    const { url: downloadUrl } = await (await fetch(neededTranscoding.url + `?client_id=${clientId}`)).json()

    return downloadUrl
}