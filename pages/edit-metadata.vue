<template>
    <NuxtLayout name="service-page">
        <template #form>
            <form class="service-form" @submit.prevent>
                <Heading> Edit metadata (ID3 tags) of your media files</Heading>

                <p class="white-text">
                    Metadata editing happens in your browser, so your files
                    isn't uploaded to anywhere
                </p>

                <FileUploadArea
                    accept=".mp3"
                    @update:model-value="openAudioMetadataEditor"
                >
                    Upload an MP3 file (<mark class="white-text">click</mark>
                    or
                    <mark class="white-text">drag and drop</mark>)
                </FileUploadArea>
            </form>

            <MetadataEditorModal
                v-model:opened="metadataEditor.modalOpened"
                :file="metadataEditor.file"
            />
        </template>

        <template #icon>
            <TagsIcon color="white" class="full-width-page-icon page-icon" />
        </template>
    </NuxtLayout>
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
