<template>
    <li role="option">
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
withDefaults(defineProps<{
    link?: string
}>(), { link: undefined })

const NuxtLink = resolveComponent('NuxtLink')
</script>

<style scoped lang="scss">
.dropdown-item {
    font-size: 16px;

    display: flex;
    align-items: center;
    column-gap: 12px;
    text-align: center;

    padding: 5px 12px;
    min-width: 100%;
    border-radius: 8px;
    
    color: $soft-black;
}

.dropdown-item:hover {
    background-color: #f7f7f7;
}
</style>