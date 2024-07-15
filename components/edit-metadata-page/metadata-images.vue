<template>
    <div>
        <img
            v-if="modelValue && modelValue.length > 0"
            :src="modelValue[0].url"
            class="metadata-image"
        />

        <div v-else class="metadata-image music-note-icon-container" title="No image">
            <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_703_159)">
                    <path d="M41.9166 0.528632C42.5969 1.03254 43 1.83879 43 2.68703V30.9058C43 34.6179 39.3887 37.6245 34.9375 37.6245C30.4863 37.6245 26.875 34.6179 26.875 30.9058C26.875 27.1937 30.4863 24.187 34.9375 24.187C35.8781 24.187 36.7852 24.3214 37.625 24.5734V12.3452L16.125 18.7952V36.2808C16.125 39.9929 12.5137 42.9995 8.0625 42.9995C3.61133 42.9995 0 39.9929 0 36.2808C0 32.5687 3.61133 29.562 8.0625 29.562C9.00312 29.562 9.91016 29.6964 10.75 29.9484V10.7495C10.75 9.56535 11.5311 8.51555 12.6648 8.17121L39.5398 0.10871C40.3545 -0.134844 41.2363 0.0163275 41.9166 0.528632Z" fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_703_159">
                        <rect width="43" height="43" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>

        <FileUploadArea
            accept="image/*"
            @update:model-value="uploadImage"
        >
            Upload an image 
            (<mark class="white-text">click</mark>
            or
            <mark class="white-text">drag and drop</mark>)
        </FileUploadArea>
    </div>
</template>

<script setup lang="ts">
import type { MetadataImageWithUrl } from '~/types/metadata-editor'

const props = defineProps<{
    modelValue: MetadataImageWithUrl[] | undefined
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', newValue: MetadataImageWithUrl[]): void
}>()

async function uploadImage(file: File) {
    const uploadImageBuffer = await file.arrayBuffer()

    emit('update:modelValue', [
        {
            data: uploadImageBuffer,
            mime: file.type,
            type: '',
            url: URL.createObjectURL(new Blob([uploadImageBuffer]))
        }
    ])
}
</script>

<style scoped lang="scss">
.metadata-image {
    max-width: 280px;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    object-fit: cover;

    margin-bottom: 30px;
}

.music-note-icon-container {
    background-color: #f3f3f3;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 30%;
        height: 30%;
    }

    path {
        fill: #D8D8D8;
    }
}

.dark .music-note-icon-container {
    background-color: #242424;

    path {
        fill: #383838;
    }
}
</style>