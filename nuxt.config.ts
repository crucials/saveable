// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
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
        soundcloudClientId: ''
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use '~/assets/styles/colors.scss' as *;
                        @use '~/assets/styles/reusable.scss' as *;
                    `
                }
            }
        }
    },

    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore', 'storeToRefs'
                ]
            }
        ]
    ]
})