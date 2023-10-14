<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <Heading>
                    Download from SampleFocus
                </Heading>

                <IconTextField type="url" placeholder="Sample page link" v-model.trim="sampleLink"
                    full-width>
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>

                <LoadingButton :loading="loading">
                    Download
                </LoadingButton>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/samplefocus.svg" 
                alt="'Sample' and 'Focus' labels divided by sound wave, SampleFocus logo"
                class="page-icon">
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'
    import JsFileDownloader from 'js-file-downloader'
    import { MediaInfo } from '~/types/media-info'

    useHead({
        title: 'Download from SampleFocus | Saveable'
    })

    const { errorTextVisible, errorText, showErrorText } = useErrorText()

    const sampleLink = ref('')
    const loading = ref(false)

    async function download() {
        const sampleLinkValue = sampleLink.value

        if(sampleLinkValue.length < 1) {
            showErrorText('You should enter sample link to download it')
        }
        else {
            try {
                loading.value = true

                const response = await fetch(`/api/media-info/samplefocus?sample_url=${sampleLinkValue}`)

                if(!response.ok) {
                    if(response.status === 400) {
                        const error = await response.json()
                        showErrorText(error.message)
                    }
                    else if(response.status === 500) {
                        showErrorText('Failed to grab sample info. If your URL is valid, then, apparently, ' 
                            + 'SampleFocus updated their website', 3500)
                    }
                    else {
                        showErrorText(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                    }

                    loading.value = false
                }
                else {
                    const sampleInfo : MediaInfo = await response.json()

                    await new JsFileDownloader({ 
                        url: `/api/proxy/media?url=${encodeURIComponent(sampleInfo.downloadUrl)}`, 
                        filename: sampleInfo.name + '.mp3'
                    })

                    loading.value = false
                }
            }
            catch(error) {
                showErrorText(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                loading.value = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>