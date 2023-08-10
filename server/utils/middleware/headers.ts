const FFMPEG_DEPENDANT_ROUTES = [ '/extract-audio', '/download/youtube' ]

export default defineEventHandler((event) => {
    if(FFMPEG_DEPENDANT_ROUTES.some(route => event.path?.includes(route))) {
        setHeaders(event, {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
        })
    }
})