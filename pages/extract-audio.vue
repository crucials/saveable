<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="extract">
                <ServicePageHeading class="extract-audio-page-heading">
                    Extract audio from video
                </ServicePageHeading>

                <p class="note">
                    Extracting process happens in your browser, so your videos isn't uploaded to anywhere
                </p>

                <FileUploadArea @file-uploaded="printFile" class="video-upload-area">
                    Upload a video 
                    (<mark class="tip-action">click</mark>
                    or
                    <mark class="tip-action">drag and drop</mark>)
                </FileUploadArea>

                <LoadingButton :loading="loading">
                    Extract
                </LoadingButton>

                <ErrorText :visible="errorTextVisible" class="error-text">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/sound-wave.svg" alt="Звуковая волна" class="page-icon">
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import { createFFmpeg } from '@ffmpeg/ffmpeg'
    import JsFileDownloader from 'js-file-downloader'

    useHead({
        title: 'Extract audio from video | Saveable'
    })

    const { errorTextVisible, errorText, showErrorText } = useErrorText()
    const loading = ref(false)

    let uploadedFile : File | undefined = undefined

    function printFile(file : File) {
        uploadedFile = file
    }

    async function extract() {
        if(uploadedFile) {
            if(!uploadedFile.type.startsWith('video/')) {
                showErrorText('File must be a video')
                return
            }

            loading.value = true

            const videoFilename = uploadedFile.name.split('.')[0]
            const videoBuffer = await uploadedFile.arrayBuffer()

            try {
                const ffmpeg = createFFmpeg({ 
                    mainName: 'main',
                    log: true,
                    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js'
                })
                await ffmpeg.load()

                const targetVideoFilename = `videoToExtractFrom.${uploadedFile.type.split('/')[1]}`

                ffmpeg.FS(
                    "writeFile",
                    targetVideoFilename,
                    new Uint8Array(videoBuffer, 0, videoBuffer.byteLength)
                )

                await ffmpeg.run('-i', targetVideoFilename, 'extractedAudio.mp3')

                const extractedVideo = ffmpeg.FS('readFile', 'extractedAudio.mp3')

                new JsFileDownloader({
                    url: URL.createObjectURL(new Blob([extractedVideo.buffer], { type: 'audio/mpeg' })),
                    filename: videoFilename + '.mp3',
                    contentType: 'audio/mpeg'
                })

                loading.value = false
            }
            catch(error) {
                loading.value = false
                console.log(error)
                showErrorText('Something went wrong while extracting. Error: ' + error)
            }
        }
        else {
            showErrorText('You need to upload video to extract audio from it')
        }
    }
</script>

<style lang="scss" scoped>
    .tip-action {
        color: white;
    }

    .video-upload-area {
        margin-bottom: 41px;
    }

    .note {
        font-size: 1rem;
        color: white;
        margin-bottom: 39px;
    }

    .extract-audio-page-heading {
        margin-bottom: 16px;
    }
</style>