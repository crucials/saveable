import { getSoundcloudClientId } from 'soundcloud-client-id-generator'

export let clientId : string | undefined

getSoundcloudClientId().then(generatedClientId => {
    clientId = generatedClientId
})

export function setClientId(newClientId : string) {
    clientId = newClientId
}