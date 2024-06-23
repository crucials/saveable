<template>
    <ModalWindow :opened="resultPlaylist.windowOpened" @closed="resultPlaylist.windowOpened = false">
        <img src="~~/assets/images/checkmark.svg" alt="Checkmark in green circle">

        <Heading color="black-and-white" type="h2" margin-bottom="0">
            Imported successfully
        </Heading>

        <IconTextField type="url" disabled v-model="resultPlaylist.url" full-width themeable>
            <button class="copy-button" @click="copyPlaylistLink">
                <img src="~~/assets/images/clipboard.svg" alt="Clipboard, 'copy' button icon">
            </button>
        </IconTextField>

         <EmeraldFilledButton :link="resultPlaylist.url">
            Open in new tab
         </EmeraldFilledButton>
    </ModalWindow>

    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="importPlaylist">
                <Heading>
                    Import playlist from JSON
                </Heading>

                <p class="white-text">
                    Creates new playlist on your account identical to playlist from JSON data 
                    generated on export playlist page
                </p>

                <FileUploadArea @file-uploaded="(file : File) => uploadedFile = file" 
                    accept="application/json">
                    Upload JSON file
                    (<mark class="white-text">click</mark>
                    or
                    <mark class="white-text">drag and drop</mark>)
                </FileUploadArea>

                <IconTextField placeholder="Account token" v-model.trim="accountToken" 
                    full-width>
                    <NuxtLink to="/soundcloud-token" title="Learn about SoundCloud token">
                        <img src="~~/assets/images/info.svg" class="token-field-info-icon" 
                            alt="Letter 'i' placed in a rounded square, information icon">
                    </NuxtLink>
                </IconTextField>

                <div class="actions">
                    <LoadingButton :loading="loading">
                        Import
                    </LoadingButton>

                    <button class="action-text" type="button" @click="emit('tab-switched', 1)">
                        Export as JSON
                    </button>
                </div>

                <ErrorText :visible="errorTextVisible">
                    {{ errorText }}
                </ErrorText>

                <ErrorText :visible="noTokenErrorVisible">
                    You need to enter your account token so app can create playlist on your account.
                    <NuxtLink to="/soundcloud-token" class="action-text">
                        Click here to learn more
                    </NuxtLink>
                </ErrorText>
            </form>
        </template>

        <template #icon>
            <img src="~~/assets/images/soundcloud-import-large.svg" 
                alt="Cloud with sound waves (SoundCloud logo) and the arrow above pointing on it"
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
import { clientId } from '~/client-id'
import { useNotificationsStore } from '~/stores/notifications'
import type { SoundcloudApiPlaylist } from '~/types/soundcloud-api'

const emit = defineEmits<{
    (event : 'tab-switched', tabNumber: number): void
}>()

const DEFAULT_IMPORTING_ERROR_MESSAGE = 'Something went wrong while importing. Make sure that ' +
    'your JSON file is valid'

const { errorText, errorTextVisible, showErrorText } = useErrorText()
const { showNotification } = useNotificationsStore()
const resultPlaylist = reactive({
    windowOpened: false,
    url: ''
})
const { 
    errorTextVisible: noTokenErrorVisible, 
    showErrorText: showNoTokenError 
} = useErrorText()
const loading = ref(false)

const accountToken = ref('')
let uploadedFile : File | undefined = undefined

async function importPlaylist() {
    if(uploadedFile) {
        if(uploadedFile.type !== 'application/json') {
            showErrorText('File must be a JSON format')
            return
        }

        if(!accountToken.value) {
            showNoTokenError()
            return
        }

        try {
            loading.value = true

            const response = await fetch(
                `/api/import-soundcloud-playlist?client_id=${clientId}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        token: accountToken.value,
                        playlistData: JSON.parse(await uploadedFile.text())
                    })
                }
            )

            if(!response.ok) {
                showErrorText(DEFAULT_IMPORTING_ERROR_MESSAGE)
                loading.value = false

                return
            }

            resultPlaylist.url = (await response.json() as SoundcloudApiPlaylist).permalink_url
            resultPlaylist.windowOpened = true
            loading.value = false
        }
        catch(error) {
            showErrorText(DEFAULT_IMPORTING_ERROR_MESSAGE)
            loading.value = false
        }
    }
    else {
        showErrorText('You need to upload a JSON file to restore playlist from it')
        loading.value = false
    }
}

async function copyPlaylistLink() {
    try {
        await navigator.clipboard.writeText(resultPlaylist.url)
        showNotification('success', 'Link copied to clipboard')
    }
    catch(error) {
        showNotification('error', 'Link copied to clipboard')
    }
}
</script>

<style lang="scss" scoped>
.token-field-info-icon {
    display: block;
    transition: scale 0.3s ease;

    &:hover {
        scale: 1.15;
    }
}

.copy-button {
    transition: scale 0.18s ease;

    &:hover {
        scale: 1.1;
    }

    &:active {
        scale: 0.9;
    }
}

.open-playlist-link {
    display: block;
}
</style>