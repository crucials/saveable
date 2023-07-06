<template>
    <h1 :class="`service-page-heading margin-bottom-${marginBottomSize}`">
        <slot></slot>
    </h1>
</template>

<script lang="ts" setup>
    defineProps({
        marginBottomSize: {
            type: String as PropType<'normal' | 'smaller'>,
            default: 'normal'
        }
    })
</script>

<style scoped lang="scss">
    .service-page-heading {
        color: white;
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 39px;
    }

    .margin-bottom-smaller {
        margin-bottom: 16px;
    }
</style>