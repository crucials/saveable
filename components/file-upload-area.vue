<template>
    <label
        class="upload-area"
        :class="{ 'upload-area-themeable': themeable }"
        @drop.prevent="addDroppedFile"
        @dragover.prevent=""
    >
        <input
            ref="fileInput"
            type="file"
            class="actual-file-input"
            :accept="accept"
            @change="uploadFile"
        />

        <svg
            class="add-file-icon"
            width="39"
            height="43"
            viewBox="0 0 39 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="39"
                height="43"
                rx="8"
                class="add-file-icon-background"
            />
            <path
                opacity="0.1"
                d="M27.41 14.8919C28.1945 15.6305 28.5867 15.9998 28.7934 16.4695C29 16.9391 29 17.4614 29 18.506V27.8889C29 30.2983 29 31.503 28.205 32.2515C27.41 33 26.1305 33 23.5714 33H15.4286C12.8695 33 11.59 33 10.795 32.2515C10 31.503 10 30.2983 10 27.8889V15.1111C10 12.7017 10 11.497 10.795 10.7485C11.59 10 12.8695 10 15.4286 10H19.9656C21.0751 10 21.6299 10 22.1286 10.1945C22.6275 10.3891 23.0197 10.7584 23.8043 11.497L27.41 14.8919Z"
                fill="#5DC080"
            />
            <path
                d="M27.41 14.8919C28.1945 15.6305 28.5867 15.9998 28.7934 16.4695C29 16.9391 29 17.4614 29 18.506V27.8889C29 30.2983 29 31.503 28.205 32.2515C27.41 33 26.1305 33 23.5714 33H15.4286C12.8695 33 11.59 33 10.795 32.2515C10 31.503 10 30.2983 10 27.8889V15.1111C10 12.7017 10 11.497 10.795 10.7485C11.59 10 12.8695 10 15.4286 10H19.9656C21.0751 10 21.6299 10 22.1286 10.1945C22.6275 10.3891 23.0197 10.7584 23.8043 11.497L27.41 14.8919Z"
                stroke="#5DC080"
                stroke-width="2"
                stroke-linejoin="round"
            />
            <path
                d="M19.5 20.2222V26.6111"
                stroke="#5DC080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M22.8926 23.4166H16.1069"
                stroke="#5DC080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>

        <p v-if="!modelValue" class="tip">
            <slot />
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
        themeable?: boolean
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

    &-background {
        @extend %themeable;
        fill: white;
    }
}

.upload-area {
    @extend %themeable;

    min-width: 260px;
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

html:not(.dark) .upload-area-themeable {
    border-color: hsla(0, 0%, 0%, 0.28);

    .tip {
        color: rgb($soft-black, 0.7);
    }

    .filename {
        color: $soft-black;
    }

    .add-file-icon-background {
        fill: darken(#ffffff, 5);
    }
}

.tip {
    @extend %themeable;
    font-size: 1.15rem;
    color: rgb(white, 0.7);
}

.filename {
    @extend %themeable;
    font-size: 1.15rem;
    color: white;
}

@media (max-width: 1280px) {
    .tip,
    .filename {
        font-size: 1rem;
    }
}

@media (max-width: 670px) {
    .upload-area {
        min-width: 230px;
        padding: 10px;
    }
}

@media (max-width: 400px) {
    .tip,
    .filename {
        font-size: 0.9rem;
    }
}
</style>
