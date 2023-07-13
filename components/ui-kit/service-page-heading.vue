<template>
    <h1 class="service-page-heading" :class="{ 'smaller-margin-bottom': smallerMarginBottom }">
        <slot></slot>
    </h1>
</template>

<script lang="ts" setup>
    defineProps<{
        smallerMarginBottom? : boolean
    }>()
</script>

<style scoped lang="scss">
    .service-page-heading {
        color: white;
        font-weight: 700;
        font-size: 2rem;

        &:not(:last-child) {
            margin-bottom: 41px;
        }
    }

    .service-page-heading.smaller-margin-bottom:not(:last-child) {
        margin-bottom: 16px;
    }
</style>