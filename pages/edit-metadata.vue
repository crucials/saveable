<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent>
                <Heading> Edit tags/metadata of MP3 file </Heading>

                <p class="white-text">
                    Metadata editing happens in your browser, so your files
                    isn't uploaded to anywhere
                </p>

                <FileUploadArea
                    @update:model-value="openAudioMetadataEditor"
                    accept=".mp3"
                >
                    Upload an MP3 file (<mark class="white-text">click</mark>
                    or
                    <mark class="white-text">drag and drop</mark>)
                </FileUploadArea>
            </form>
        </template>

        <template #icon>
            <img
                src="~~/assets/images/tags.svg"
                alt="Tags"
                class="full-width-page-icon page-icon"
            />
        </template>
    </NuxtLayout>

    <MetadataEditorModal
        v-model:opened="metadataEditor.modalOpened"
        :file="metadataEditor.file"
    />
</template>

<script setup lang="ts">
import type { MetadataEditorData } from '~/types/metadata-editor'

useHead({
    title: 'Edit metadata of your media files | Saveable',
})

const metadataEditor = reactive<MetadataEditorData>({
    modalOpened: false,
    file: null,
})

function openAudioMetadataEditor(file: File) {
    metadataEditor.modalOpened = true
    metadataEditor.file = file
}
</script>

<style scoped lang="scss"></style>
