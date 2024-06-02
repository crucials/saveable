<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <Heading margin-bottom="41px">
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
import JsFileDownloader from 'js-file-downloader'
import { DEFAULT_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'
import { EXTERNAL_PROXY_URL } from '~/constants/api-urls'
import type { MediaInfo } from '~/types/media-info'

interface Sample {
    slug : string,
    sample_mp3_url : string
}

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
        return
    }

    loading.value = true
    
    try {
        const sampleInfo = await getSampleMediaInfo(sampleLinkValue)

        await new JsFileDownloader({ 
            url: '/api/proxy/media'
                + `?url=${encodeURIComponent(sampleInfo.downloadUrl)}`
                + `&referer=${encodeURIComponent('https://samplefocus.com')}`, 
            filename: sampleInfo.name + '.mp3',
        })
    }
    catch(error) {
        if(error instanceof Error) {
            showErrorText(error.message)
        }
        else {
            showErrorText(DEFAULT_DOWNLOAD_ERROR_MESSAGE)
        }
    }
    finally {
        loading.value = false
    }
}

async function getSampleMediaInfo(sampleUrl: string) {
    const downloadMethodErrorMessage = 'Failed to grab sample info. If your URL is '
        + 'valid, then, apparently, SampleFocus updated their website'

    let fixedSampleUrl = sampleUrl
    if(sampleUrl.endsWith('/download')) {
        fixedSampleUrl = sampleUrl.substring(0, sampleUrl.lastIndexOf('/download'))
    }
    
    let samplePage : Document

    const samplePageResponse = await fetch(EXTERNAL_PROXY_URL + '/?'
        + encodeURIComponent(fixedSampleUrl))
    if(!samplePageResponse.ok) {
        throw new Error('Failed to parse sample page. Make sure URL is valid and '
            + 'requested sample exists. status code: ' + samplePageResponse.status)
    }
    samplePage = new DOMParser().parseFromString(await samplePageResponse.text(),
        'text/html')

    const rawSampleJson = samplePage.querySelector(
        'script[data-component-name="SampleWaveformContainer"]'
    )?.textContent

    if (!rawSampleJson) {
        throw new Error(downloadMethodErrorMessage)
    }

    const sample: Sample = JSON.parse(rawSampleJson)?.sample

    if (!sample) {
        throw new Error(downloadMethodErrorMessage)
    }

    return {
        downloadUrl: sample.sample_mp3_url,
        name: sample.slug,
    }
}
</script>

<style lang="scss" scoped>

</style>