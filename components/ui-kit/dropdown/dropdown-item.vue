<template>
    <li role="option" tabindex="1">
        <component
            :is="link === undefined ? 'button' : NuxtLink"
            :to="link"
            class="dropdown-item"
            type="button"
        >
            <slot></slot>
        </component>
    </li>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        link?: string
    }>(),
    { link: undefined },
)

const NuxtLink = resolveComponent('NuxtLink')
</script>

<style scoped lang="scss">
.dropdown-item {
    @extend %themeable;

    font-size: 16px;

    display: flex;
    align-items: center;
    column-gap: 12px;
    text-align: center;

    padding: 5px 12px;
    min-width: 100%;
    border-radius: 8px;
    text-wrap: nowrap;

    color: $soft-black;

    &:hover {
        background-color: #f7f7f7;
    }
}

.dark .dropdown-item {
    color: white;

    &:hover {
        background-color: #242424;
    }
}
</style>
