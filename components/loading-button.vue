<template>
    <WhiteFilledButton class="download-button" :class="{ 'downloading': downloading }">
        <span class="download-button-text">
            <slot></slot>
        </span>

        <div class="spinner"></div>
    </WhiteFilledButton>
</template>

<script lang="ts" setup>
    defineProps<{
        downloading : boolean
    }>()
</script>

<style scoped lang="scss">
    .spinner {
        display: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid lighten($emerald, 15);
        border-right: 2px solid $emerald;
        animation: spinning 1s linear infinite;

        @keyframes spinning {
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .downloading {
        .download-button-text {
            display: none;
        }

        .spinner {
            display: block;
        }
    }
</style>