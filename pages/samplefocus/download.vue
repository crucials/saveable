<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <Heading margin-bottom="41px">
                    Download from SampleFocus
                </Heading>

                <IconTextField
                    v-model.trim="sampleLink"
                    type="url"
                    placeholder="Sample page link"
                    full-width
                >
                    <img
                        src="~~/assets/images/link.svg"
                        alt="Two paperclips, link icon"
                    />
                </IconTextField>

                <LoadingButton :loading="loading"> Download </LoadingButton>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img
                src="~~/assets/images/samplefocus.svg"
                alt="'Sample' and 'Focus' labels divided by sound wave, SampleFocus logo"
                class="page-icon"
            />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import JsFileDownloader from 'js-file-downloader'
import { DEFAULT_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'

useHead({
    title: 'Download from SampleFocus | Saveable',
})

const { errorTextVisible, errorText, showErrorText } = useErrorText()

const sampleLink = ref('')
const loading = ref(false)

async function download() {
    const sampleLinkValue = sampleLink.value

    if (sampleLinkValue.length < 1) {
        showErrorText('You should enter sample link to download it')
        return
    }

    loading.value = true

    try {
        const sampleInfo = await getSampleMediaInfo(sampleLinkValue)

        await new JsFileDownloader({
            url:
                '/api/proxy/media' +
                `?url=${encodeURIComponent(sampleInfo.downloadUrl)}` +
                `&referer=${encodeURIComponent('https://samplefocus.com')}`,
            filename: sampleInfo.name + '.mp3',
        })
    } catch (error) {
        if (error instanceof Error) {
            showErrorText(error.message)
        } else {
            showErrorText(DEFAULT_DOWNLOAD_ERROR_MESSAGE)
        }
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped></style>
