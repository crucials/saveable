<template>
    <ModalWindow :opened="downloadStatus.inProcess" @closed="closeDownloadStatusModal">
        <div class="spinner spinner-partial-border" v-show="downloadStatus.stage === 'downloading'"></div>

        <img src="~~/assets/images/checkmark.svg" alt="Checkmark in green circle" 
            v-show="downloadStatus.stage === 'success'">

        <img src="~~/assets/images/broken-laptop.svg" alt="Laptop with broken screen" 
            v-show="downloadStatus.stage === 'error'">

        <h2 class="download-status-heading"> 
            {{ downloadStatus.heading }}
        </h2>

        <p class="download-status-note" v-show="downloadStatus.note">
            {{ downloadStatus.note }}
        </p>

        <EmeraldFilledButton @click="closeDownloadStatusModal">
            {{ downloadStatus.stage === 'downloading' ? 'Cancel' : 'Close' }}
        </EmeraldFilledButton>
    </ModalWindow>

    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <ServicePageHeading>
                    Download playlist from SoundCloud
                </ServicePageHeading>

                <IconTextField type="url" placeholder="Playlist link" class="link-field" v-model.trim="playlistLink">
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>

                <div class="actions">
                    <WhiteFilledButton :disabled="downloadStatus.inProcess">
                        Download
                    </WhiteFilledButton>

                    <button class="action-text" type="button" @click="emit('tab-switched', 1)">
                        Download track
                    </button>
                </div>

                <ErrorText :visible="errorTextVisible" class="error-text">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/soundcloud-logo-with-reflection.svg" 
                alt="Cloud with sound waves with reflection, SoundCloud logo"
                class="page-icon">
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import JsFileDownloader from 'js-file-downloader'    
    import { DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'

    interface DownloadStatus {
        inProcess : boolean,
        stage : 'downloading' | 'success' | 'error' | undefined,
        heading : string,
        note : string | undefined
    }

    const { errorTextVisible, errorText, showErrorText } = useErrorText()

    const playlistLink = ref('')

    const downloadStatus = ref<DownloadStatus>({
        inProcess : false,
        stage : undefined,
        heading : '',
        note: undefined
    })

    const emit = defineEmits<{
        (event : 'tab-switched', tabNumber : number) : void
    }>()

    let abortController : AbortController | undefined = undefined

    async function download() {
        const playlistLinkValue = playlistLink.value

        if(playlistLinkValue.length < 1) {
            showErrorText('You should enter playlist link to download it')
        }
        else {
            try {
                downloadStatus.value.inProcess = true
                downloadStatus.value.stage = 'downloading'
                downloadStatus.value.heading = 'Downloading...'
                downloadStatus.value.note = 'Downloading large playlists can take up to 7 minutes'

                abortController = new AbortController()

                const response = await fetch(`/api/download/soundcloud/playlist?url=${playlistLinkValue}`, {
                    signal: abortController.signal
                }) 

                if(!response.ok) {
                    if(response.status == 404) {
                        showErrorInModal('Playlist with entered link not found')
                    }
                    else if(response.status == 429) {
                        showErrorInModal('Soundcloud servers request limit is reached for today')
                    }
                    else if(response.status == 400) {
                        showErrorInModal('Provided link is not a playlist')
                    }
                    else {
                        showErrorInModal(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                    }

                    return
                }

                const playlistZipBlob = new Blob([ await response.arrayBuffer() ])
                const zipDownloadUrl = URL.createObjectURL(playlistZipBlob)

                await new JsFileDownloader({
                    url: zipDownloadUrl,
                    filename: getFilenameFromHeaders(response) || 'playlist'
                })

                downloadStatus.value.stage = 'success'
                downloadStatus.value.heading = 'Successfully downloaded'
                downloadStatus.value.note = undefined

                setTimeout(() => {
                    downloadStatus.value.inProcess = false
                }, 2000)
            }
            catch(error) {
                if(error instanceof Error && error.name == 'AbortError') {
                    downloadStatus.value.inProcess = false
                }
                else {
                    showErrorInModal(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                }
            }
        }
    }

    function getFilenameFromHeaders(response : Response) {
        const headerParts = response.headers.get('Content-Disposition')?.split('; filename=')

        if(headerParts) {
            return headerParts[1]
        }
        else {
            return undefined
        }
    }

    function showErrorInModal(errorText : string) {
        downloadStatus.value.heading = errorText
        downloadStatus.value.stage = 'error'
        downloadStatus.value.note = undefined
    }

    function closeDownloadStatusModal() {
        if(downloadStatus.value.stage === 'downloading') {
            abortController?.abort()
        }
        else {
            downloadStatus.value.inProcess = false
            downloadStatus.value.stage = undefined
            downloadStatus.value.note = undefined
        }
    }
</script>

<style lang="scss" scoped>
    .spinner {
        width: 74px;
        height: 74px;
    }

    .download-status-heading {
        color: black;
        font-weight: 600;
        text-align: center;
        font-size: 1.5rem;

        .dark & {
            color: white;
        }
    }

    .download-status-note {
        color: black;
        text-align: center;
        font-size: 1rem;


        .dark & {
            color: white;
        }
    }
</style>