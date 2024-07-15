<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="extract">
                <Heading> Extract audio from video </Heading>

                <p class="white-text">
                    Extracting process happens in your browser, so your videos
                    isn't uploaded to anywhere
                </p>

                <FileUploadArea v-model="uploadedFile" accept="video/*">
                    Upload a video (<mark class="white-text">click</mark>
                    or
                    <mark class="white-text">drag and drop</mark>)
                </FileUploadArea>

                <LoadingButton :loading="loading"> Extract </LoadingButton>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img
                src="~~/assets/images/sound-wave.svg"
                alt="Sound wave"
                class="page-icon"
            >
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import JsFileDownloader from 'js-file-downloader'
import { DEFAULT_SERVER_EXTRACT_ERROR_MESSAGE } from '~/constants/messages'

useHead({
    title: 'Extract audio from video | Saveable',
})

const { errorTextVisible, errorText, showErrorText } = useErrorText()
const loading = ref(false)

const uploadedFile: File | undefined = undefined

async function extract() {
    if (uploadedFile) {
        if (!uploadedFile.type.startsWith('video/')) {
            showErrorText('File must be a video')
            return
        }

        loading.value = true

        const videoFilename = uploadedFile.name.split('.')[0]
        const videoBuffer = await uploadedFile.arrayBuffer()

        try {
            const ffmpeg = createFFmpeg({
                mainName: 'main',
                log: false,
                corePath:
                    'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
            })
            await ffmpeg.load()

            const targetVideoFilename = `videoToExtractFrom.${uploadedFile.type.split('/')[1]}`

            ffmpeg.FS(
                'writeFile',
                targetVideoFilename,
                new Uint8Array(videoBuffer, 0, videoBuffer.byteLength),
            )

            await ffmpeg.run('-i', targetVideoFilename, 'extractedAudio.mp3')

            const extractedAudio = ffmpeg.FS('readFile', 'extractedAudio.mp3')

            new JsFileDownloader({
                url: URL.createObjectURL(
                    new Blob([extractedAudio.buffer], { type: 'audio/mpeg' }),
                ),
                filename: videoFilename + '.mp3',
                contentType: 'audio/mpeg',
            })

            loading.value = false
        } catch (error) {
            loading.value = false
            showErrorText(
                `${DEFAULT_SERVER_EXTRACT_ERROR_MESSAGE}. Error: ${error}`,
            )
        }
    } else {
        showErrorText('You need to upload video to extract audio from it')
    }
}
</script>

<style lang="scss" scoped></style>
