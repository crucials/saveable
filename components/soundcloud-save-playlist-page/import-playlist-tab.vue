<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent="">
                <Heading smaller-margin-bottom>
                    Import playlist from JSON
                </Heading>

                <p class="white-text">
                    Creates new playlist on your account based on JSON data generated on export playlist 
                    page
                </p>

                <FileUploadArea @file-uploaded="(file : File) => uploadedFile = file" class="video-upload-area">
                    Upload playlist data
                    (<mark class="white-text">click</mark>
                    or
                    <mark class="white-text">drag and drop</mark>)
                </FileUploadArea>

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
const { errorText, errorTextVisible, showErrorText } = useErrorText()
const loading = ref(false)

const emit = defineEmits<{
    (event : 'tab-switched', tabNumber: number): void
}>()
</script>