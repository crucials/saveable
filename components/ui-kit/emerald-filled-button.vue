<template>
    <button class="emerald-filled-button">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
    .emerald-filled-button {
        background-color: $emerald;
        color: white;
        padding: 14px 30px;
        border-radius: 8px;
        font-size: 1.25rem;

        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 12px;

        transition: box-shadow 0.3s;

        &:hover {
            box-shadow: 0px 0px 0px 4px rgb($emerald, 0.3);
        }
    }

    @media (max-width: 785px) {
        .emerald-filled-button {
            font-size: 1.1rem;
        }
    }
</style>