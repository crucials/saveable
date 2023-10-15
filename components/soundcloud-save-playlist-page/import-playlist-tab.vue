<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="importPlaylist">
                <Heading smaller-margin-bottom>
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
const emit = defineEmits<{
    (event : 'tab-switched', tabNumber: number): void
}>()

const { errorText, errorTextVisible, showErrorText } = useErrorText()
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

            
        }
        catch(error) {
            showErrorText('Something went wrong while importing')
        }
    }
    else {
        showErrorText('You need to upload a JSON file to restore playlist from it')
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
</style>