import { API_BASE_URL } from '~/constants/api-urls'
import { SoundcloudApiPlaylist } from '~/types/soundcloud-api'

export default defineEventHandler<Promise<SoundcloudApiPlaylist>>(async event => {
    const clientId = useRuntimeConfig().soundcloudClientId

    const body : {
        playlistData? : SoundcloudApiPlaylist,
        token? : string
    } = JSON.parse(await readBody(event))

    const { token, playlistData } = body

    if(!token) {
        throw createError({
            statusCode: 400,
            message: 'Field \'token\' is not provided'
        })
    }

    if(playlistData && playlistData.tracks?.length) {
        const tracksIds = playlistData.tracks.map(track => track.id)

        const response = await fetch(API_BASE_URL + `/playlists?client_id=${clientId}`, {
            headers: {
                'Authorization': 'OAuth ' + token,
            },
            body: JSON.stringify({
                playlist: {
                    title: playlistData.title || 'playlist from saveable',
                    sharing: playlistData.sharing || 'public',
                    tracks: tracksIds,
                    _resource_type: 'playlist'
                }
            }),
            method: 'POST'
        })

        if(!response.ok) {
            if(response.status === 401) {
                throw createError({
                    statusCode: 401,
                    message: 'Your token is invalid'
                })
            }
            else if(response.status === 400) {
                throw createError({
                    statusCode: 400,
                    message: 'Your playlist data is corrupted or invalid'
                })
            }
            else {
                throw createError({
                    statusCode: 500,
                    message: 'Something went wrong while creating new playlist'
                })
            }
        }

        return await response.json()
    }
    else {
        throw createError({
            statusCode: 400,
            message: 'Your playlist data is corrupted or invalid'
        })
    }
})