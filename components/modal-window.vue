<template>
    <Teleport to=".root-wrapper">
        <div :class="{ 'backdrop': true, 'backdrop-visible': opened }" @click="emit('closed')"></div>
        <dialog class="modal-window" :open="opened">
            <slot></slot>
        </dialog>
    </Teleport>
</template>

<script lang="ts" setup>
    defineProps<{
        opened : boolean
    }>()

    const emit = defineEmits<{
        (event : 'closed') : void
    }>()

    onMounted(() => {
        document.addEventListener('keyup', closeIfPressedEscape)
    })

    onUnmounted(() => {
        document.removeEventListener('keyup', closeIfPressedEscape)
    })

    function closeIfPressedEscape(event : KeyboardEvent) {
        if(event.key === 'Escape') {
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
        box-shadow: 0px 0px 30px 0px #0000004D;
        width: 30%;
        min-width: 400px;

        transition: transform 0.3s ease;

        &[open] {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateX(-50%) translateY(-50%) scale(1);
        }

        .dark & {
            background-color: lighten($soft-black, 2);
        }

        @media (max-width: 1000px) {
            padding: 26px 20px;
        }

        @media (max-width: 450px) {
            min-width: 320px;
        }

        @media (max-width: 350px) {
            min-width: 280px;
        }
    }
</style>