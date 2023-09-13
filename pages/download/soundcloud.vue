<template>
    <DownloadTrackTab v-if="currentTab == 1" @tab-switched="(tabNumber : number) => currentTab = tabNumber"/>
    <DownloadPlaylistTab v-else-if="currentTab == 2" @tab-switched="(tabNumber : number) => currentTab = tabNumber"/>
</template>

<script lang="ts" setup>
    useHead({
        title: 'Download tracks from SoundCloud | Saveable'
    })

    const currentTab = ref(1)
</script>

<style lang="scss" scoped>
    
</style>