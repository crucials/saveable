<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="exportPlaylist">
                <Heading smaller-margin-bottom>
                    Export SoundCloud playlist as JSON
                </Heading>

                <p class="white-text">
                    Save your SoundCloud playlist for future import, for example, on other account
                </p>

                <IconTextField type="url" placeholder="Playlist link" v-model.trim="playlistLink" 
                    full-width>
                    <img src="~~/assets/images/link.svg" alt="Two paperclips, link icon">
                </IconTextField>

                <div class="actions">
                    <LoadingButton :loading="loading">
                        Export
                    </LoadingButton>

                    <button class="action-text" type="button" @click="emit('tab-switched', 2)">
                        Restore from JSON
                    </button>
                </div>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/soundcloud-export-large.svg" 
                alt="Cloud with sound waves (SoundCloud logo) and an arrow up above it"
                class="page-icon">
        </template>

        <OtherToolsSection platform-name="SoundCloud" :tools-pages="[
            {
                title: 'Download from Soundcloud',
                link: '/soundcloud/download',
                iconSrc: '/images/soundcloud-save-playlist-black.svg',
                darkThemeIconSrc: '/images/soundcloud-save-playlist-white.svg',
                iconAltText: 'Cloud with sound waves, SoundCloud logo'
            }
        ]"/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { SoundcloudApiPlaylist } from '~/types/soundcloud-api'
import JsFileDownloader from 'js-file-downloader'

const emit = defineEmits<{
    (event : 'tab-switched', tabNumber: number): void
}>()

const playlistLink = ref('')
const loading = ref(false)

const { errorText, errorTextVisible, showErrorText } = useErrorText()

async function exportPlaylist() {
    const playlistLinkValue = playlistLink.value

    if(playlistLinkValue.length < 1) {
        showErrorText('You should enter playlist link to download it')
    }

    else {
        try {
            loading.value = true
            const response = await useFetch<SoundcloudApiPlaylist>(
                `/api/media-info/soundcloud/playlist?url=${playlistLinkValue}`
            )

            if (response.error.value) {
                loading.value = false

                if(response.error.value.statusCode == 404) {
                    showErrorText('Playlist with entered link not found')
                }
                else if(response.error.value.statusCode == 429) {
                    showErrorText('Soundcloud servers request limit is reached for today')
                }
                else if(response.error.value.statusCode == 400) {
                    showErrorText('Provided link is not a playlist')
                }
                else {
                    showErrorText("Something went wrong while exporting")
                }

                return
            }

            if(!response.data.value) {
                showErrorText("Something went wrong while exporting")
                loading.value = false
                return
            }

            const playlistJsonUrl = URL.createObjectURL(new Blob([JSON.stringify(response.data.value)]))

            await new JsFileDownloader({
                url: playlistJsonUrl,
                filename: response.data.value.title + '.json'
            })

            loading.value = false
        }
        catch(error) {
            showErrorText("Something went wrong while exporting")
            loading.value = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>