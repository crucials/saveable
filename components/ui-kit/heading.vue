<template>
    <Component
        :is="type"
        class="heading custom-margin"
        :class="{
            [color]: true,
        }"
    >
        <slot />
    </Component>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        marginBottom?: string
        type?: 'h1' | 'h2' | 'h3'
        color?: 'white' | 'pastel-purple' | 'black-and-white'
        textAlign?: 'start' | 'end' | 'center'
    }>(),
    {
        type: 'h1',
        color: 'white',
        marginBottom: '16px',
        textAlign: 'start',
    },
)
</script>

<style scoped lang="scss">
.heading {
    @extend %themeable;
    font-weight: 700;
    text-align: v-bind('props.textAlign');

    &:not(:last-child) {
        margin-bottom: v-bind(marginBottom);
    }
}

h1.heading {
    font-size: 2rem;

    @media (max-width: 1200px) {
        font-size: 1.6rem;
    }

    @media (max-width: 600px) {
        font-size: 1.4rem;
    }
}

h2.heading {
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
</style>
