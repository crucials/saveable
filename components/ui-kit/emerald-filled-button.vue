<template>
    <component
        :is="link ? 'a' : 'button'"
        :class="`emerald-filled-button  emerald-filled-button-${size}`"
        :href="link"
        :target="link ? '_blank' : null"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
// defineProps({
//     size: {
//         type: String as PropType<'medium' | 'large'>,
//         default: 'medium',
//     },

//     link: {
//         type: String as PropType<string>,
//     },
// })
defineProps<{
    size?: 'medium' | 'large'
    link?: string
}>()
</script>

<style lang="scss" scoped>
.emerald-filled-button {
    background-color: $emerald;
    color: white;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 12px;

    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0px 0px 0px 4px rgb($emerald, 0.3);
    }

    &-medium {
        padding: 12px 26px;
        font-size: 1rem;
    }

    &-large {
        padding: 14px 30px;
        font-size: 1.25rem;
    }
}

@media (max-width: 785px) {
    .emerald-filled-button {
        font-size: 1.1rem;
    }
}
</style>
