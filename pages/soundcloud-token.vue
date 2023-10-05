<template>
    <header class="article-banner">
        <NuxtPicture format="png,webp" src="/images/key.webp" class="banner-image" width="305"/>

        <div class="banner-image-overlay"></div>

        <Heading class="article-heading">
            What’s a “SoundCloud account token” and why this app needs it
        </Heading>
    </header>
</template>

<script setup lang="ts">
    useHead({
        title: 'What’s a “SoundCloud account token” and why this app needs it | Saveable'
    })
</script>

<style lang="scss">
    .article-banner {
        overflow: hidden;
        position: relative;
        padding: 30px;
        height: 164px;
        background: linear-gradient(101deg, #FFF 0%, #11998E 0.01%, #A58DE9 0.02%, #38EF7D 100%);
        
        @media (max-width: 500px) {
            padding: 15px 20px;
            height: auto;
        }
    }

    .article-heading {
        position: relative;
    }

    .banner-image {
        position: absolute;
        right: 120px;
        top: -70px;

        &-overlay {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
        }

        @media (max-width: 1300px) {
            right: 20px;
        }

        @media (max-width: 1200px) {

            &-overlay {
                background-color: #00000030;
            }
        }

        @media (max-width: 670px) {
            top: 50%;
            translate: 0 -50%;
            right: -30px;

            &, img {
                width: 200px;
            }
        }
    }
</style>