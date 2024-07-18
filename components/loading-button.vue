<template>
    <WhiteFilledButton
        class="loading-button"
        :class="{ loading: loading }"
        :disabled="loading"
    >
        <span class="loading-button-text">
            <slot />
        </span>

        <div class="spinner spinner-full-border" />
    </WhiteFilledButton>
</template>

<script lang="ts" setup>
defineProps<{
    loading: boolean
}>()
</script>

<style scoped lang="scss">
.spinner {
    display: none;
}

.loading {
    &:hover {
        box-shadow: none;
        cursor: not-allowed;
    }

    .loading-button-text {
        display: none;
    }

    .spinner {
        display: block;
    }
}
</style>
