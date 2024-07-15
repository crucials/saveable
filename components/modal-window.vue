<template>
    <div
        :class="{ backdrop: true, 'backdrop-visible': opened }"
        @click="emit('closed')"
    />
    <dialog
        class="modal-window"
        :class="{ wide: wide }"
        :open="opened"
        v-bind="$attrs"
    >
        <slot/>
    </dialog>
</template>

<script lang="ts" setup>
defineProps<{
    opened: boolean
    wide?: boolean
}>()

const emit = defineEmits<{
    (event: 'closed'): void
}>()

onMounted(() => {
    document.addEventListener('keyup', closeIfPressedEscape)
})

onUnmounted(() => {
    document.removeEventListener('keyup', closeIfPressedEscape)
})

function closeIfPressedEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        emit('closed')
    }
}
</script>

<style lang="scss" scoped>
.backdrop {
    display: none;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    backdrop-filter: blur(3px);
    background-color: #ffffff1a;

    &-visible {
        display: block;
    }

    .dark & {
        background-color: rgb(0, 0, 0, 0.1);
    }
}

.modal-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0);
    padding: 40px;
    border-radius: 16px;
    background-color: white;
    transform-origin: center;
    box-shadow: 0px 0px 30px 0px #0000004d;
    width: 30%;
    min-width: 400px;

    transition: transform 0.3s ease;

    &.wide {
        width: 60%;
    }

    &[open] {
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform: translateX(-50%) translateY(-50%) scale(1);
    }

    @media (max-width: 1000px) {
        padding: 26px 20px;

        &.wide {
            width: 90%;
        }
    }

    @media (max-width: 450px) {
        min-width: 320px;
    }

    @media (max-width: 350px) {
        min-width: 280px;
    }
}

.dark .modal-window {
    background-color: lighten($soft-black, 2);
}
</style>
