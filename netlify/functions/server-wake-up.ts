import type { Handler } from '@netlify/functions'
import { schedule } from '@netlify/functions'
import fetch from 'node-fetch'
import { SERVER_BASE_URL } from '~~/constants/api-urls'

const scheduledHandler: Handler = async () => {
    await fetch(SERVER_BASE_URL)

    return {
        statusCode: 200,
    }
}

const handler = schedule('*/10 * * * *', scheduledHandler)

export { handler }
