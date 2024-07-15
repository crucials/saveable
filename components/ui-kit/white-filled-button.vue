<template>
    <button class="white-filled-button">
        <slot/>
    </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.white-filled-button {
    background-color: white;
    color: $emerald;
    padding: 13px 32px;
    border-radius: 8px;
    font-size: 1.125rem;
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 0px 0px 0px 3px hsla(0, 0%, 100%, 0.3);
    }
}

@media (max-width: 1050px) {
    .white-filled-button {
        font-size: 1rem;
    }
}
</style>
