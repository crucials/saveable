import { getSoundcloudClientId } from 'soundcloud-client-id-generator'
import { clientId, setClientId } from '~/client-id'
import { EXTERNAL_PROXY_URL } from '~/constants/api-urls'

export default defineNuxtPlugin(async () => {
    try {
        setClientId(await getSoundcloudClientId(EXTERNAL_PROXY_URL + '?'))
    }
    catch(error) {
        console.log('error while getting soundcloud client id: ' + error)
    }
})
