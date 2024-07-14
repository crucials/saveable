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
                @submit.prevent="save"
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

                    <!-- <IconTextField
                        v-model="metadata.data.year"
                        themeable
                        placeholder="Year"
                    />

                    <IconTextField
                        v-model="metadata.data.album"
                        themeable
                        placeholder="Album"
                    /> -->
                </div>

                <div>
                    <!-- <img
                        v-if="metadata.data.images && metadata.data.images.length > 0"
                        :src="metadata.data.images[0].url"
                    /> -->
                </div>

                <div class="save-button-wrapper">
                    <EmeraldFilledButton type="submit">
                        Save
                    </EmeraldFilledButton>
                </div>
            </form>
        </div>
    </ModalWindow>
</template>

<script setup lang="ts">
import { ID3Writer } from 'browser-id3-writer';
import { fromFile } from 'id3js'
import JsFileDownloader from 'js-file-downloader'
import { ID3_ARTIST, ID3_TITLE } from '~/constants/id3-tags';
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
            metadata.data = {
                album: null,
                artist: null,
                title: null,
                year: null,
            }
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

async function save() {
    if(!props.file) {
        return
    }

    const writer = new ID3Writer(await props.file.arrayBuffer())

    if(metadata.data?.title) {
        writer.setFrame(ID3_TITLE, metadata.data.title)
    }

    if(metadata.data?.artist) {
        writer.setFrame(ID3_ARTIST, [metadata.data.artist])
    }

    writer.addTag()

    new JsFileDownloader({
        filename: props.file.name,
        url: writer.getURL()
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

.save-button-wrapper {
    grid-column: span 2;
    margin-top: 20px;

    button {
        margin: 0 auto;
        width: 240px;
    }
}
</style>
