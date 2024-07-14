<template>
    <ModalWindow
        :opened="opened"
        wide
        @closed="emit('update:opened', false)"
    >
        <div v-if="metadata.loading" class="spinner"></div>

        <div
            v-else-if="file && metadata.data"
            class="metadata-editor-wrapper"
        >
            <Heading
                color="black-and-white"
                text-align="center"
                class="metadata-editor-modal-heading"
                margin-bottom="40px"
            >
                {{ file.name }}
            </Heading>

            <form
                class="metadata-form"
                @submit.prevent=""
            >
                <div class="metadata-form-inputs">
                    <IconTextField
                        v-model="metadata.data.title"
                        themeable
                        placeholder="Title"
                    />

                    <IconTextField
                        v-model="metadata.data.artist"
                        themeable
                        placeholder="Artist"
                    />

                    <IconTextField
                        v-model="metadata.data.year"
                        themeable
                        placeholder="Year"
                    />

                    <IconTextField
                        v-model="metadata.data.album"
                        themeable
                        placeholder="Album"
                    />
                </div>

                <div>
                    <img
                        v-if="metadata.data.images && metadata.data.images.length > 0"
                        :src="metadata.data.images[0].url"
                    />
                </div>
            </form>
        </div>
    </ModalWindow>
</template>

<script setup lang="ts">
import { fromFile } from 'id3js'
import JsFileDownloader from 'js-file-downloader';
import { useNotificationsStore } from '~/stores/notifications'
import type { MetadataImageWithUrl, MediaMetadata } from '~/types/metadata-editor'

const props = defineProps<{
    opened: boolean
    file: File | null
}>()


const emit = defineEmits<{
    (event: 'update:opened', newValue: boolean): void
}>()

const { showNotification } = useNotificationsStore()

const metadata = reactive<{
    loading: boolean
    data: MediaMetadata & { images?: MetadataImageWithUrl[] } | null
}>({
    loading: false,
    data: null,
})

watch(() => props.file, async () => {
    if(!props.file) {
        return
    }

    try {
        const fileMetadata = await fromFile(props.file)

        if(!fileMetadata) {
            showNotification('error', 'failed to load your file metadata')
            return    
        }

        metadata.data = {
            ...fileMetadata,
            images: getImagesFromMetadata(fileMetadata)
        }
    }
    catch(error) {
        showNotification('error', 'failed to load your file metadata, more info: '
            + `'${error}'`)
    }
})

function getImagesFromMetadata(
    metadata: MediaMetadata
): MetadataImageWithUrl[] | undefined {
    if (!metadata.images) {
        return undefined
    }

    return metadata.images.map(image => {
        return {
            ...image,
            url: URL.createObjectURL(new Blob([new Uint8Array(image.data)], { type: undefined }))
        }
    })
}
</script>

<style lang="scss" scoped>
.metadata-form {
    display: grid;
    grid-template-columns: 4fr 3fr;
    gap: 20px;

    &-inputs {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
}

.metadata-editor-wrapper {
    width: 100%;
}
</style>
