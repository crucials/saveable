<template>
    <ExportPlaylistTab
        v-if="currentTab == 1"
        @tab-switched="(tabNumber: number) => (currentTab = tabNumber)"
    />
    <ImportPlaylistTab
        v-else-if="currentTab == 2"
        @tab-switched="(tabNumber: number) => (currentTab = tabNumber)"
    />
</template>

<script setup lang="ts">
useHead({
    title: 'Import & Export playlist from SoundCloud | Saveable',
})

const currentTab = ref(1)
</script>

<style lang="scss" scoped></style>
