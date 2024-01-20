import type { SoundcloudApiTrack } from '~/types/soundcloud-api'

export default async function getTrackDownloadUrl(track : SoundcloudApiTrack, clientId : string) {
    const neededTranscoding = track.media.transcodings.find(transcoding => {
        return transcoding.format.protocol === 'progressive'
    })
    
    if(!neededTranscoding) {
        return undefined
    }

    const neededTranscodingUrl = new URL(neededTranscoding.url)
    neededTranscodingUrl.searchParams.append('client_id', clientId)

    const { url: downloadUrl } = await (await fetch(neededTranscodingUrl)).json()

    return downloadUrl
}