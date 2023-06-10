<template>
    <WhiteFilledButton class="loading-button" :class="{ 'loading': loading }" :disabled="loading">
        <span class="loading-button-text">
            <slot></slot>
        </span>

        <div class="spinner"></div>
    </WhiteFilledButton>
</template>

<script lang="ts" setup>
    defineProps<{
        loading : boolean
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

    .loading {
        .loading-button-text {
            display: none;
        }

        .spinner {
            display: block;
        }
    }
</style>