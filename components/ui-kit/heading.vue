<template>
    <Component :is="type" class="service-page-heading" 
        :class="{ 
            'smaller-margin-bottom': smallerMarginBottom,
            [color]: true
        }">
        <slot></slot>
    </Component>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        smallerMarginBottom? : boolean,
        type? : 'h1' | 'h2' | 'h3',
        color? : 'white' | 'pastel-purple' | 'black-and-white'
    }>(), {
        type: 'h1',
        color: 'white'
    })
</script>

<style scoped lang="scss">
    .service-page-heading {
        @extend %themeable;
        font-weight: 700;

        &:not(:last-child) {
            margin-bottom: 41px;
        }
    }

    h1.service-page-heading {
        font-size: 2rem;

        @media (max-width: 1200px) {
            font-size: 1.6rem;
        }

        @media (max-width: 600px) {
            font-size: 1.4rem;
        }
    }

    h2.service-page-heading {
        font-size: 1.72rem;

        @media (max-width: 1200px) {
            font-size: 1.4rem;
        }

        @media (max-width: 600px) {
            font-size: 1.22rem;
        }
    }

    .pastel-purple {
        color: $pastel-purple;
    }

    .white {
        color: white;
    }

    .black-and-white {
        color: black;

        .dark & {
            color: white;
        }
    }

    .service-page-heading.smaller-margin-bottom:not(:last-child) {
        margin-bottom: 16px;
    }
</style>