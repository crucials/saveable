export default defineEventHandler(async event => {
    const query = getQuery(event)
    const urlToFetch = query['url']?.toString()

    if(!urlToFetch) {
        throw createError({ statusCode: 400, message: `Query parameter 'url' not provided` })
    }

    let response : Response
    try {
        const headers = query['referer'] ? {
            'Referer': query['referer'].toString()
        } : undefined

        response = await fetch(urlToFetch, { headers })
    }
    catch(error) {
        console.log(error)
        throw createError({ statusCode: 500, message: 'Failed to send request to given url' })
    }

    if(!response.ok) {
        throw createError({ 
            statusCode: response.status, 
            message: `Something went wrong, status code: ${response.status}` 
        })
    }
    
    const mediaBuffer = await response.arrayBuffer()
    
    return new Uint8Array(mediaBuffer, 0, mediaBuffer.byteLength)
})