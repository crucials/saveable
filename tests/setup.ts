import { getSoundcloudClientId } from 'soundcloud-client-id-generator'
import { setClientId } from '~/client-id'

setClientId(await getSoundcloudClientId())
