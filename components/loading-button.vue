<template>
    <WhiteFilledButton class="loading-button" :class="{ 'loading': loading }" :disabled="loading">
        <span class="loading-button-text">
            <slot></slot>
        </span>

        <div class="spinner spinner-full-border"></div>
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