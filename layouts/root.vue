<template>
    <div class="root-wrapper">
        <NavigationBar />
        <slot/>

        <NotificationsList />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.root-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    @extend %themeable;

    @media (max-width: $bottom-bar-breakpoint-width) {
        padding-bottom: 97px;
    }
}

.dark .root-wrapper {
    background-color: $soft-black;
}
</style>
