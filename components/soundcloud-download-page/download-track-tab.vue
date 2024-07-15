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

                <ToggleButton v-model="options.includeArtistInFilename">
                    Include artist username in filename
                </ToggleButton>

                <ToggleButton v-model="options.includeMetadata">
                    Include metadata (cover, title, artist)
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
import { ID3Writer } from 'browser-id3-writer'
import type { MediaInfo } from '~/types/media-info'
import { DEFAULT_DOWNLOAD_ERROR_MESSAGE } from '~/constants/messages'
import { clientId } from '~/client-id'
import {
    ID3_TITLE, ID3_ARTIST, ID3_PUBLISHER_URL, ID3_COVERFRONT_IMAGE, ID3_IMAGE
} from '~/constants/id3-tags'

const emit = defineEmits<{
    (event : 'tab-switched', tabNumber : number) : void
}>()

const { errorTextVisible, errorText, showErrorText } = useErrorText()

const trackLink = ref('')
const options = reactive({
    includeArtistInFilename: true,
    includeMetadata: true
})
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
                + `&exclude_artist=${!options.includeArtistInFilename}`
                + `&client_id=${clientId}`)

            if(!response.ok) {
                if(response.status == 404) {
                    showErrorText('Track with entered link not found')
                }
                else if(response.status == 400) {
                    showErrorText('Provided link is not a track')
                }
                else {
                    showErrorText(DEFAULT_DOWNLOAD_ERROR_MESSAGE)
                }

                loading.value = false
                return
            }

            const trackInfo : MediaInfo = await response.json()

            if(options.includeMetadata && trackInfo.metadata) {
                await new JsFileDownloader({
                    url: await includeMetadata(trackInfo as Required<MediaInfo>),
                    filename: trackInfo.name + '.mp3'
                })
                
                loading.value = false
                return
            }

            await new JsFileDownloader({
                url: trackInfo.downloadUrl,
                filename: trackInfo.name + '.mp3'
            })
            loading.value = false
        }
        catch(error) {
            console.error(error)
            
            showErrorText(DEFAULT_DOWNLOAD_ERROR_MESSAGE)
            loading.value = false
        }
    }
}

async function includeMetadata(trackInfo : Required<MediaInfo>) : Promise<string> {
    const trackData = await (await fetch(trackInfo.downloadUrl)).arrayBuffer()
    const trackImageData = trackInfo.metadata.imageUrl ?
        await (await fetch(trackInfo.metadata.imageUrl)).arrayBuffer() : null
    
    const writer = new ID3Writer(trackData);

    writer.setFrame(ID3_TITLE, trackInfo.metadata.title)
    writer.setFrame(ID3_ARTIST, [ trackInfo.metadata.artist ])
    writer.setFrame(ID3_PUBLISHER_URL, trackInfo.metadata.url)
    
    if(trackImageData) {
        writer.setFrame(ID3_IMAGE, {
            type: ID3_COVERFRONT_IMAGE,
            data: trackImageData,
            description: trackInfo.name,
        })
    }

    writer.addTag()

    return writer.getURL()
}
</script>

<style lang="scss" scoped>

</style>