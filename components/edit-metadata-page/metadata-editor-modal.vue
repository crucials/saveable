<template>
    <ModalWindow :opened="opened" wide @closed="emit('update:opened', false)">
        <div v-if="metadata.loading" class="spinner" />

        <div v-else-if="file && metadata.data" class="metadata-editor-wrapper">
            <Heading
                color="black-and-white"
                text-align="center"
                class="metadata-editor-modal-heading"
                margin-bottom="40px"
            >
                {{ file.name }}
            </Heading>

            <form class="metadata-form" @submit.prevent="save">
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
                        v-model="metadata.data.album"
                        themeable
                        placeholder="Album"
                    />
                </div>

                <div class="metadata-image-wrapper">
                    <MetadataImage v-model="metadata.data.image" />
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
import { ID3Writer } from 'browser-id3-writer'
import parse from 'id3-parser'
import { convertFileToBuffer } from 'id3-parser/lib/util'
import JsFileDownloader from 'js-file-downloader'
import { ID3_ALBUM, ID3_ARTIST, ID3_COVERFRONT_IMAGE, ID3_IMAGE, ID3_TITLE } from '~/constants/id3-tags'
import { useNotificationsStore } from '~/stores/notifications'
import type {
    MetadataImageWithUrl,
    MediaMetadata,
} from '~/types/metadata-editor'

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
    data: (MediaMetadata & { image?: MetadataImageWithUrl }) | null
}>({
    loading: false,
    data: null,
})

watch(
    () => props.file,
    async () => {
        if (!props.file) {
            return
        }

        try {
            const fileMetadata = parse(await convertFileToBuffer(props.file))

            if (fileMetadata === false) {
                metadata.data = {}
                return
            }

            metadata.data = {
                ...fileMetadata,
                image: getImageFromMetadata(fileMetadata),
            }
        } catch (error) {
            showNotification(
                'error',
                'failed to load your file metadata, more info: ' + `'${error}'`,
            )
        }
    },
)

function getImageFromMetadata(
    metadata: MediaMetadata,
): MetadataImageWithUrl | undefined {
    if (!metadata.image?.data) {
        return undefined
    }

    return {
        ...metadata.image,
        url: URL.createObjectURL(
            new Blob([new Uint8Array(metadata.image.data)], {
                type: undefined,
            }),
        ),
    }
}

async function save() {
    if (!props.file) {
        return
    }

    const writer = new ID3Writer(await props.file.arrayBuffer())

    if (metadata.data?.title) {
        writer.setFrame(ID3_TITLE, metadata.data.title)
    }

    if (metadata.data?.artist) {
        writer.setFrame(ID3_ARTIST, [metadata.data.artist])
    }

    if (metadata.data?.album) {
        writer.setFrame(ID3_ALBUM, metadata.data.album)
    }

    if (metadata.data?.image?.data) {
        writer.setFrame(ID3_IMAGE, {
            type: ID3_COVERFRONT_IMAGE,
            data: new Uint8Array(metadata.data.image.data),
            description: metadata.data.title || ''
        })
    }

    writer.addTag()

    new JsFileDownloader({
        filename: props.file.name,
        url: writer.getURL(),
    })
}
</script>

<style lang="scss" scoped>
.metadata-form {
    display: grid;
    grid-template-columns: 5fr minmax(250px, 3fr);
    gap: 20px;

    &-inputs {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        max-width: 600px;
    }

    @media (max-width: 670px) {
        grid-template-columns: 1fr;
    }
}

.metadata-editor-wrapper {
    width: 100%;
}

.metadata-image-wrapper {
    @media (max-width: 670px) {
        grid-row-start: 1;
    }
}

.save-button-wrapper {
    grid-column: span 2;
    margin-top: 20px;

    button {
        margin: 0 auto;
        width: 240px;
    }

    @media (max-width: 670px) {
        grid-column: 1;
    }
}
</style>
