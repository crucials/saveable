<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <ServicePageHeading>
                    Download from SoundCloud
                </ServicePageHeading>

                <IconTextField type="url" placeholder="Track link" class="link-field" v-model.trim="trackLink">
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>

                <LoadingButton :loading="loading">
                    Download
                </LoadingButton>

                <ErrorText :visible="errorTextVisible" class="error-text">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/soundcloud.svg" alt="Cloud with sound waves, SoundCloud logo"
                class="page-icon">
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import JsFileDownloader from 'js-file-downloader'    
    import type { MediaInfo } from '~~/types'
    import { DEFAULT_SERVER_ERROR_MESSAGE } from '~/messages'

    const { errorTextVisible, errorText, showErrorText } = useErrorText()    

    const trackLink = ref('')
    const loading = ref(false)

    useHead({
        title: 'Download tracks from SoundCloud | Saveable'
    })

    async function download() {
        const trackLinkValue = trackLink.value
        if(trackLinkValue.length < 1) {
            showErrorText('You should enter track link to download it')
        }
        else {
            try {
                loading.value = true

                const response = await fetch(`/api/media-info/soundcloud?track_url=${trackLinkValue}`)

                if(!response.ok) {
                    if(response.status == 404) {
                        showErrorText('Track with entered link not found')
                    }
                    else {
                        showErrorText(DEFAULT_SERVER_ERROR_MESSAGE)
                    }

                    loading.value = false
                    return
                }

                const trackInfo : MediaInfo = await response.json()
                await new JsFileDownloader({
                    url: trackInfo.downloadUrl,
                    filename: trackInfo.name + '.mp3'
                })

                loading.value = false
            }
            catch(error) {
                showErrorText(DEFAULT_SERVER_ERROR_MESSAGE)
                loading.value = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>