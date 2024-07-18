<template>
    <figure class="image-frame" :class="{ 'scroll-image': scrollIfTooSmall }">
        <NuxtPicture
            format="png,webp"
            :src="src"
            :alt="alt"
            :img-attrs="{ class: 'image' }"
        />
    </figure>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        src: string
        alt: string
        marginBottom?: string
        scrollIfTooSmall?: boolean
    }>(),
    {
        marginBottom: '0px',
    },
)
</script>

<style lang="scss">
.image-frame {
    border-radius: 8px;
    padding: 4px 4px 8px 4px;
    background-color: $pastel-purple;

    margin-bottom: v-bind(marginBottom);

    &.scroll-image {
        overflow-x: auto;

        & .image {
            min-width: 900px;
        }
    }
}

.image {
    display: block;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
}
</style>
