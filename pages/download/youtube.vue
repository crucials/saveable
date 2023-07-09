<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <ServicePageHeading>
                    Download from Youtube
                </ServicePageHeading>

                <IconTextField type="url" placeholder="Video link" v-model.trim="videoLink"
                    class="link-field">
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>
                
                <div class="actions">
                    <LoadingButton :loading="loading">
                        Download
                    </LoadingButton>
                    
                    <button class="action-text" type="button" @click="extractAudio" :disabled="loading">
                        Extract audio
                    </button>
                </div>

                <ErrorText :visible="errorTextVisible">
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
    import { createFFmpeg } from '@ffmpeg/ffmpeg'    
    import type { MediaInfo } from '~~/types'
    import { DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE, DEFAULT_SERVER_EXTRACT_ERROR_MESSAGE } from '~/constants/messages'

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

                const videoInfo = await getVideoInfo(videoLinkValue)

                new JsFileDownloader({ 
                    url: `/api/proxy/google-videos?url=${encodeURIComponent(videoInfo.downloadUrl)}`, 
                    filename: videoInfo.name + '.mp4'
                }).catch(() => {
                    window.open(videoInfo.downloadUrl)
                }).finally(() => loading.value = false)
            }
            catch(error) {
                showErrorText(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                loading.value = false
            }
        }
    }

    async function extractAudio() {
        const videoLinkValue = videoLink.value

        if(videoLinkValue.length < 1) {
            showErrorText('You should enter video link to extract audio from it')
        }
        else {
            try {
                loading.value = true

                const videoInfo = await getVideoInfo(videoLinkValue)
                const videoResponse = await fetch(`/api/proxy/google-videos?url=${encodeURIComponent(videoInfo.downloadUrl)}`)

                if(!videoResponse.ok) {     
                    showErrorText(DEFAULT_SERVER_EXTRACT_ERROR_MESSAGE)
                    loading.value = false
                    return
                }

                const videoBuffer = await videoResponse.arrayBuffer()
                
                const ffmpeg = createFFmpeg({ 
                    mainName: 'main',
                    log: false,
                    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
                })
                await ffmpeg.load()

                ffmpeg.FS(
                    'writeFile',
                    'videoToExtractFrom.mp4',
                    new Uint8Array(videoBuffer, 0, videoBuffer.byteLength)
                )
                await ffmpeg.run('-i', 'videoToExtractFrom.mp4', 'extractedAudio.mp3')

                const extractedAudio = ffmpeg.FS('readFile', 'extractedAudio.mp3')

                new JsFileDownloader({
                    url: URL.createObjectURL(new Blob([extractedAudio.buffer], { type: 'audio/mpeg' })),
                    filename: videoInfo.name + '.mp3',
                    contentType: 'audio/mpeg'
                })

                loading.value = false
            }
            catch(error) {
                console.log(error)
                
                showErrorText('Failed to get video info, perhaps it does not exist or is unavailable')
                loading.value = false
            }
        }
    }

    async function getVideoInfo(videoLink : string) : Promise<MediaInfo> {
        const response = await fetch(`/api/media-info/youtube?video_url=${videoLink}`)

        if(!response.ok) {
            throw new Error()
        }

        return await response.json()
    }
</script>

<style lang="scss" scoped>

</style>