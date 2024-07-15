<template>
    <label
        class="upload-area"
        @drop.prevent="addDroppedFile"
        @dragover.prevent=""
    >
        <input
            type="file"
            class="actual-file-input"
            ref="fileInput"
            @change="uploadFile"
            :accept="accept"
        />

        <img
            src="~~/assets/images/add-file.svg"
            alt="File with plus sign in rounded rectangle, add file icon"
            class="add-file-icon"
        />

        <p v-if="!modelValue" class="tip">
            <slot></slot>
        </p>

        <p v-else class="filename">
            {{ modelValue?.name }}
        </p>
    </label>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        accept: string
        modelValue?: File | null
    }>(),
    {
        modelValue: null,
    },
)

const emit = defineEmits<{
    (event: 'update:modelValue', file: File): void
}>()

const fileInput = ref<HTMLInputElement>()

function uploadFile() {
    const files = fileInput.value?.files

    if (files && files[0]) {
        emit('update:modelValue', files[0])
    }
}

function addDroppedFile(event: DragEvent) {
    const droppedFile = event.dataTransfer?.files[0]

    if (droppedFile) {
        emit('update:modelValue', droppedFile)
    }
}
</script>

<style scoped lang="scss">
.actual-file-input {
    display: none;
}

.add-file-icon {
    transition: scale 0.3s ease-in-out;
}

.upload-area {
    min-width: 300px;
    padding: 16px;
    border: 2px dashed hsla(0, 0%, 100%, 0.28);
    border-radius: 8px;

    display: flex;
    column-gap: 20px;
    align-items: center;

    &:hover {
        cursor: pointer;

        .add-file-icon {
            scale: 1.06;
        }
    }
}

.tip {
    font-size: 1.15rem;
    color: rgb(white, 0.7);
}

.filename {
    font-size: 1.15rem;
    color: white;
}

@media (max-width: 670px) {
    .upload-area {
        min-width: 230px;
    }
}

@media (max-width: 400px) {
    .tip,
    .filename {
        font-size: 0.9rem;
    }
}
</style>
