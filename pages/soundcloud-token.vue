<template>
    <main>
        <header class="article-banner">
            <NuxtPicture format="png,webp" src="/images/key.png" class="banner-image" width="305"
                alt="Golden key" />

            <div class="banner-image-overlay"></div>

            <Heading class="article-heading" margin-bottom="41px">
                What’s a “SoundCloud account token” and why this app needs it
            </Heading>
        </header>

        <div class="article-content">
            <p class="article-paragraph">
                Account token is a secret key that make possible for SoundCloud to identify 
                current account and check if you own it. It’s like username and password, 
                but for internal SoundCloud servers. So why you can’t just enter you username 
                and password? Because Saveable isn’t actually registered in SoundCloud 
                applications (registration is closed for years now) and it doesn’t have enough 
                control to get token from your credentials.
            </p>

            <Heading class="article-heading" color="black-and-white" type="h2">
                Where can I find my token?
            </Heading>

            <p class="article-paragraph">
                You need go to desktop SoundCloud homepage, right-click on anything and choose “Inspect“ 
                in the appeared menu. A lot of things will open, navigate to “Application“ tab (or “Store” 
                on Firefox) and open cookies. Copy value in the row with the name “oauth_token”, that’s your 
                account token.
            </p>

            <ImageFrame src="/images/token-location-screenshot.png"
                alt="Cookies table with 'oauth_token' row in Chrome developer tools ui"
                margin-bottom="56px" scroll-if-too-small/>

            <Heading class="article-heading" color="black-and-white" type="h2">
                Why this website needs your token?
            </Heading>

            <p class="article-paragraph">
                There are a few tools that need a token to work. For example, playlist import creates a new 
                playlist on your account with tracks and info from uploaded JSON file. It needs your account 
                access so token is necessary here.
            </p>
        </div>
    </main>
</template>

<script setup lang="ts">
    useHead({
        title: 'What’s a “SoundCloud account token” and why this app needs it | Saveable'
    })
</script>

<style lang="scss" >
    .article-banner {
        overflow: hidden;
        position: relative;
        padding: 30px;
        height: 164px;
        background-image: $amethyst-gradient;
        
        @media (max-width: 500px) {
            padding: 15px 20px;
            height: auto;
            min-height: 120px;
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
            top: 60%;
            translate: 0 -50%;
            right: -40px;

            &, img {
                width: 200px;
            }
        }
    }

    .article-content {
        @extend %themeable;
        width: 92%;
        max-width: 1232px;
        padding: 43px 78px;
        margin: 0 auto;

        background-color: white;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.10);
        border-radius: 12px;
        position: relative;
        top: -18px;
        border: 4px solid transparent;

        .dark & {
            background-color: rgb(22, 22, 22);
        }
    }

    .article-paragraph {
        @extend %themeable;
        font-size: 20px;
        color: black;
        line-height: 34px;

        &:not(:last-child) {
            margin-bottom: 46px;
        }

        .dark & {
            color: white;
        }

        @media (max-width: 850px) {
            font-size: 18px;
        }
    }

    @media (max-width: 850px) {
        .article-paragraph {
            font-size: 18px;
        }

        .article-content {
            padding: 20px;
        }
    }
</style>