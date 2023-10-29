<template>
    <NuxtLayout name="root">
        <main class="main-content-wrapper">
            <h1 class="error-heading">
                {{ errorHeadingText }}
            </h1>

            <img src="~~/assets/images/not-found.svg" alt="Pages, documents contain question marks" 
                class="error-illustration">

            <div class="links">
                <NuxtLink to="/soundcloud/download" class="page-link">
                    <EmeraldFilledButton size="large">
                        <img src="~~/assets/images/download.svg" alt="Download icon">
                        SoundCloud
                    </EmeraldFilledButton>
                </NuxtLink>

                <NuxtLink to="/youtube/download" class="page-link">
                    <EmeraldFilledButton size="large">
                        <img src="~~/assets/images/download.svg" alt="Download icon">
                        YouTube
                    </EmeraldFilledButton>
                </NuxtLink>
            </div>
        </main>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    const props = defineProps({
        error: {
            type: Object,
            required: true
        }
    })

    const errorHeadingText = props.error.statusCode == 404 ? 'Page not found' : 'Something went wrong'
    
    useHead({
        title: `${errorHeadingText} | Saveable`
    })
</script>

<style lang="scss" scoped>
    .main-content-wrapper {
        flex-grow: 1;
        padding: 20px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        flex-direction: column;
        row-gap: 60px;
    }

    .error-heading {
        text-align: center;
        font-weight: bold;
        font-size: 3.2rem;
        color: black;
        @extend %themeable;

        .dark & {
            color: white;
        }
    }
    
    .error-illustration {
        width: 25%;
        min-width: 300px;
    }

    .links {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 25px;
        flex-wrap: wrap;
        row-gap: 20px;
    }

    @media (max-width: 785px) {

        .error-heading {
            font-size: 2.3rem;
        }
        .main-content-wrapper {
            padding-bottom: 160px;
        }
    }

    @media (max-width: 500px) {
        .page-link, .page-link button {
            width: 100%;
        }
    }

    @media (max-width: 400px) {
        .main-content-wrapper {
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 30px;
            justify-content: start;
        }

        .error-illustration {
            min-width: 200px;
        }
    }
</style>