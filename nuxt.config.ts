// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@vueuse/nuxt', '@nuxt/image', [
        '@pinia/nuxt',
        {
            autoImports: [
                'defineStore', 'storeToRefs'
            ]
        }
    ], "@nuxt/eslint"],

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'Saveable',
            script: [
                {
                    src: '/scripts/color-theme-resolver.js',
                    type: 'text/javascript'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
            ]
        }
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],

    runtimeConfig: {
        soundcloudClientId: '',
        maximumPlaylistTracks: ''
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use '~/assets/styles/main.scss' as *;
                    `
                }
            }
        }
    }
})