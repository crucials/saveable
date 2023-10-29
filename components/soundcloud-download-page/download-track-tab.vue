<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="download">
                <Heading margin-bottom="41px">
                    Download track from SoundCloud
                </Heading>

                <IconTextField type="url" placeholder="Track link" v-model.trim="trackLink" 
                    full-width>
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>

                <ToggleButton v-model="includeArtistInFilename">
                    Include artist username in filename
                </ToggleButton>

                <div class="actions">
                    <LoadingButton :loading="loading">
                        Download
                    </LoadingButton>

                    <button class="action-text" type="button" @click="emit('tab-switched', 2)">
                        Download playlist
                    </button>
                </div>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/soundcloud.svg" alt="Cloud with sound waves, SoundCloud logo"
                class="page-icon">
        </template>

        <OtherToolsSection platform-name="SoundCloud" :tools-pages="[
            {
                title: 'Export & Import playlist',
                link: '/soundcloud/save-playlist',
                iconSrc: '/images/soundcloud-save-playlist-black.svg',
                darkThemeIconSrc: '/images/soundcloud-save-playlist-white.svg',
                iconAltText: 'Cloud with sound waves (SoundCloud logo) and the up arrow on top'
            }
        ]"/>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import JsFileDownloader from 'js-file-downloader'    
    import type { MediaInfo } from '~/types/media-info'
    import { DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'

    const emit = defineEmits<{
        (event : 'tab-switched', tabNumber : number) : void
    }>()

    const { errorTextVisible, errorText, showErrorText } = useErrorText()

    const trackLink = ref('')
    const includeArtistInFilename = ref(true)
    const loading = ref(false)

    async function download() {
        const trackLinkValue = trackLink.value
        if(trackLinkValue.length < 1) {
            showErrorText('You should enter track link to download it')
        }
        else {
            try {
                loading.value = true

                const response = await fetch(`/api/media-info/soundcloud/track?url=${trackLinkValue}` 
                    + `&exclude_artist=${!includeArtistInFilename.value}`)

                if(!response.ok) {
                    if(response.status == 404) {
                        showErrorText('Track with entered link not found')
                    }
                    else if(response.status == 400) {
                        showErrorText('Provided link is not a track')
                    }
                    else {
                        showErrorText(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
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
                showErrorText(DEFAULT_SERVER_DOWNLOAD_ERROR_MESSAGE)
                loading.value = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>