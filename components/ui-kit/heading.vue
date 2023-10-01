<template>
    <Component :is="type" class="service-page-heading" 
        :class="{ 
            'smaller-margin-bottom': smallerMarginBottom,
            'pastel-purple-text': color === 'pastel-purple'
        }">
        <slot></slot>
    </Component>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        smallerMarginBottom? : boolean,
        type? : 'h1' | 'h2' | 'h3',
        color? : 'white' | 'pastel-purple'
    }>(), {
        type: 'h1',
        color: 'white'
    })
</script>

<style scoped lang="scss">
    .service-page-heading {
        color: white;
        font-weight: 700;
        font-size: 2rem;

        &:not(:last-child) {
            margin-bottom: 41px;
        }

        @media (max-width: 600px) {
            font-size: 1.7rem;
        }
    }

    .pastel-purple-text {
        color: $pastel-purple;
    }

    .service-page-heading.smaller-margin-bottom:not(:last-child) {
        margin-bottom: 16px;
    }
</style>