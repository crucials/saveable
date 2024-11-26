import { getSoundcloudClientId } from 'soundcloud-client-id-generator'
import cron from 'node-cron'

let soundcloudClientId: string | null = null

async function updateSoundcloudClientId() {
    try {
        soundcloudClientId = await getSoundcloudClientId()
        console.log(`soundcloud client id updated: ${soundcloudClientId}`)
    } catch (error) {
        console.error(`error while obtaining soundcloud client id: ${error}`)
    }
}

export function getClientId() {
    return soundcloudClientId
}

export default defineNitroPlugin(async () => {
    await updateSoundcloudClientId()

    cron.schedule('0 0 * * *', updateSoundcloudClientId)
})
