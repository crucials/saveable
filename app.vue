<template>
    <NuxtLayout name="root">
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup>

</script>

<style lang="scss">
    @use '~/assets/styles/normalize';

    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

    * {
        font-family: 'Lato';
        
        &::selection {
            background-color: $pastel-purple;
            color: white;
        }
    }
</style>