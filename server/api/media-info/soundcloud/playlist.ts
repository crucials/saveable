import { API_BASE_URL } from '~/constants/api-urls'
import { getClientId } from '~/server/plugins/soundcloud-client-id'
import type { SoundcloudApiPlaylist } from '~/types/soundcloud-api'

export default defineEventHandler<Promise<SoundcloudApiPlaylist>>(
    async (event) => {
        const clientId = getClientId()
        const playlistUrl = getQuery(event)['url']?.toString()

        if (!playlistUrl) {
            throw createError({
                statusCode: 400,
                message: `Query parameter 'url' not provided`,
            })
        }

        if (!clientId) {
            throw createError({
                statusCode: 400,
                message: `couldn't obtain soundcloud client id`,
            })
        }

        const resolveResponse = await fetch(
            API_BASE_URL + `/resolve?client_id=${clientId}&url=${playlistUrl}`,
        )

        if (!resolveResponse.ok) {
            if (resolveResponse.status === 404) {
                throw createError({
                    statusCode: 404,
                    message: 'Playlist with that URL not found',
                })
            } else if (resolveResponse.status === 429) {
                throw createError({
                    statusCode: 429,
                    message: "Soundcloud API today's request limit was reached",
                })
            } else {
                throw createError({
                    statusCode: 500,
                    message: "Couldn't get playlist info",
                })
            }
        }

        return await resolveResponse.json()
    },
)
