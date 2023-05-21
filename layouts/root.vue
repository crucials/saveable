<template>
    <div class="root-wrapper">
        <NavigationBar/>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .root-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        @extend %themeable;
    }

    .dark .root-wrapper {
        background-color: $soft-black;
    }
</style>