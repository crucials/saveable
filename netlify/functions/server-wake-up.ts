import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { schedule } from '@netlify/functions'
import fetch from 'node-fetch'
import { SERVER_BASE_URL } from '~~/constants/api-urls'

const scheduledHandler : Handler = async (event: HandlerEvent, context: HandlerContext) => {
   await fetch(SERVER_BASE_URL)

   return {
      statusCode: 200,
   }
}

const handler = schedule('*/10 * * * *', scheduledHandler)

export { handler }