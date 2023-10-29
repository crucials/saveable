<template>
    <label class="upload-area" @drop.prevent="addDroppedFile" @dragover.prevent="">
        <input type="file" class="actual-file-input" ref="fileInput" @change="uploadFile"
            :accept="accept">
        
        <img src="~~/assets/images/add-file.svg" alt="File with plus sign in rounded rectangle, add file icon" 
            class="add-file-icon">

        <p class="tip" v-if="!filename">
            <slot></slot>
        </p>

        <p class="filename">
            {{ filename }}
        </p>
    </label>
</template>

<script setup lang="ts">
    defineProps<{
        accept: string
    }>()

    const emit = defineEmits<{
        (event : 'file-uploaded', file : File) : void
    }>()

    const fileInput = ref<HTMLInputElement>()
    const filename = ref<string>()

    function uploadFile() {
        const files = fileInput.value?.files

        if(files && files[0]) {
            filename.value = files[0].name

            emit('file-uploaded', files[0])
        }
    }

    function addDroppedFile(event : DragEvent) {
        const droppedFIle = event.dataTransfer?.files[0]

        if(droppedFIle) {
            filename.value = droppedFIle.name
            emit('file-uploaded', droppedFIle)
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

    @media (max-width: 400px) {
        .tip, .filename {
            font-size: 0.9rem;
        }
    }
</style>