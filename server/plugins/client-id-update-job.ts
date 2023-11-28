import cron from 'node-cron'
import { getSoundcloudClientId } from 'soundcloud-client-id-generator'
import { clientId, setClientId } from '~/client-id'

export default defineNitroPlugin(() => {
    cron.schedule('0 1 * * *', async () => {
        setClientId(await getSoundcloudClientId())
        console.log('got the new client id', clientId)
    })
})