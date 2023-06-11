<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <ServicePageHeading>
                    Download from Youtube
                </ServicePageHeading>

                <IconTextField type="url" placeholder="Video link" class="link-field" v-model.trim="videoLink">
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
            <img src="~~/assets/images/youtube.svg" alt="Rounded rectangle with triangle in it, YouTube logo"
                class="page-icon">
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import JsFileDownloader from 'js-file-downloader'    
    import type { MediaInfo } from '~~/types'
    import { DEFAULT_SERVER_ERROR_MESSAGE } from '~/constants/messages'

    const { errorTextVisible, errorText, showErrorText } = useErrorText()

    const videoLink = ref('')
    const loading = ref(false)

    useHead({
        title: 'Download video from YouTube | Saveable'
    })

    async function download() {
        const videoLinkValue = videoLink.value

        if(videoLinkValue.length < 1) {
            showErrorText('You should enter video link to download it')
        }
        else {
            try {
                loading.value = true

                const response = await fetch(`/api/media-info/youtube?video_url=${videoLinkValue}`)

                if(!response.ok) {
                    showErrorText(`Couldn't download this video, perhaps it doesn't exist or can't be downloaded`)
                    loading.value = false
                    return
                }

                const videoInfo : MediaInfo = await response.json()

                new JsFileDownloader({ 
                    url: videoInfo.downloadUrl, 
                    filename: videoInfo.name + '.mp3'
                }).catch(() => {
                    window.open(videoInfo.downloadUrl)
                }).finally(() => loading.value = false)
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