export default defineEventHandler((event) => {
    if(event.path?.includes('/extract-audio')) {
        setHeaders(event, {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
        })
    }
})