<template>
    <section class="other-tools-section">
        <Heading color="pastel-purple" type="h2" margin-bottom="41px">
            Other {{ platformName }} tools
        </Heading>

        <div class="other-tools-links">
            <NuxtLink
                v-for="page in toolsPages"
                :key="page.link"
                :to="page.link"
                class="page-card"
            >
                <div class="lightning" />

                <img
                    :src="page.iconSrc"
                    :alt="page.iconAltText"
                    class="page-icon light-theme-page-icon"
                />
                <img
                    :src="page.darkThemeIconSrc"
                    :alt="page.iconAltText"
                    class="page-icon dark-theme-page-icon"
                />

                <h3 class="page-title">
                    {{ page.title }}
                </h3>
            </NuxtLink>
        </div>
    </section>
</template>

<script lang="ts" setup>
interface PageCard {
    title: string
    link: string
    iconSrc: string
    darkThemeIconSrc: string
    iconAltText: string
}

withDefaults(
    defineProps<{
        platformName?: string
        toolsPages: PageCard[]
    }>(),
    {
        platformName: '',
    },
)
</script>

<style lang="scss" scoped>
.other-tools-section {
    margin-top: 60px;
}

.other-tools-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;

    @media (max-width: 500px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

.page-card {
    @extend %themeable;
    position: relative;
    background-color: #00000008;
    backdrop-filter: blur(3px);
    padding: 35px 30px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    overflow: hidden;
    column-gap: 45px;
}

.lightning {
    position: absolute;
    top: -15px;
    left: -20px;
    background-color: rgb($emerald, 0.4);
    filter: blur(40px);
    border-radius: 50%;
    width: 180px;
    z-index: -1;
    height: 100px;
    transition: all 0.3s ease-in;

    .page-card:hover & {
        left: 10px;
        top: 50px;
        height: 120px;
        width: 180px;
    }
}

.page-title {
    @extend %themeable;
    color: black;
    font-weight: normal;
    font-size: 24px;
}

.dark-theme-page-icon {
    display: none;
    filter: drop-shadow(0px 4px 32px rgba(255, 255, 255, 0.8));
    transition: filter 0.3s ease;

    .page-card:hover & {
        filter: drop-shadow(0px 4px 26px rgba(255, 255, 255, 0.6));
    }
}

@media (max-width: 1050px) {
    .page-card {
        padding: 25px 20px;
    }

    .page-title {
        font-size: 20px;
    }

    .page-icon {
        width: 45px;
    }
}

.dark {
    .page-card {
        background-color: #ffffff07;
    }

    .lightning {
        display: none;
    }

    .dark-theme-page-icon {
        display: block;
    }

    .light-theme-page-icon {
        display: none;
    }

    .page-title {
        color: white;
    }
}
</style>
