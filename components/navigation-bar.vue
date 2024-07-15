<template>
    <nav
        ref="navigation"
        class="navigation-bar"
        :class="{ 'navigation-bar-expanded': expanded }"
    >
        <NuxtLink to="/" class="main-page-link">
            <img
                src="~~/assets/images/logo.svg"
                alt="Down arrow points to platform, Saveable logo"
                class="logo"
            />
        </NuxtLink>

        <ul class="navigation-menu">
            <li>
                <NuxtLink to="/soundcloud/download" class="navigation-link">
                    SoundCloud
                </NuxtLink>
            </li>

            <li>
                <NuxtLink to="/youtube/download" class="navigation-link">
                    YouTube
                </NuxtLink>
            </li>

            <li>
                <NuxtLink to="/samplefocus/download" class="navigation-link">
                    SampleFocus
                </NuxtLink>
            </li>

            <li>
                <NuxtLink to="/extract-audio" class="navigation-link">
                    Extract audio
                </NuxtLink>
            </li>
        </ul>

        <MobileNavigationMenu />

        <ThemeSwitcher class="theme-switcher" />

        <button
            v-if="expandButtonVisible"
            class="expand-mobile-navigation-button"
            title="Expand the navigation"
            @click="expanded = !expanded"
        >
            <img
                v-if="!expanded"
                src="~~/assets/images/expand.svg"
                alt="Two arrows pointing up, expand button"
            />
            <img
                v-if="expanded"
                src="~~/assets/images/close.svg"
                alt="Cross, close button"
            />
        </button>
    </nav>
</template>

<script lang="ts" setup>
const expanded = ref(false)
const expandButtonYPosition = ref('0px')
const expandButtonVisible = ref(false)

const navigation = ref<HTMLElement | undefined>()

onMounted(() => {
    const navigationElement = navigation.value
    if (navigationElement) {
        expandButtonYPosition.value = `${navigationElement.clientHeight + 6}px`
        displayExpandButtonIfNeeded()

        const resizeObserver = new ResizeObserver(() => {
            expandButtonYPosition.value = `${navigationElement.clientHeight + 6}px`
            displayExpandButtonIfNeeded()
        })

        resizeObserver.observe(navigationElement)
    }
})

function displayExpandButtonIfNeeded() {
    const navigationScrollHeight = navigation.value?.scrollHeight
    console.log(navigationScrollHeight)
    if (navigationScrollHeight && navigationScrollHeight >= 93) {
        expandButtonVisible.value = true
    } else {
        expandButtonVisible.value = false
    }
}
</script>

<style lang="scss" scoped>
.navigation-bar {
    display: flex;
    justify-content: center;
    row-gap: 5px;
    column-gap: 95px;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 2px solid hsla(0, 0%, 92%, 1);
    background-color: white;

    .dark & {
        border-bottom: 2px solid hsla(0, 0%, 14%, 1);
        background-color: $soft-black;
    }

    @extend %themeable;
}

.logo {
    width: 150px;
}

.navigation-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    flex-shrink: 0;
}

.navigation-link {
    padding: 6px 10px;
    border-radius: 8px;
    color: black;
    font-size: 1.15rem;
    @extend %themeable;

    &:hover {
        background-color: hsl(0, 0%, 93%);
    }

    &:active {
        transition: color 0.1s;
        color: $emerald;
    }
}

.dark .navigation-link {
    color: white;

    &:hover {
        background-color: hsl(0, 0%, 10%);
    }
}

.theme-switcher {
    margin-left: auto;
    flex-shrink: 0;
}

.expand-mobile-navigation-button {
    display: none;

    position: fixed;
    bottom: 99px;
    left: 10px;

    img {
        width: 48px;
        border-radius: 100%;
        box-shadow: 0px 0px 10px 1px #00000060;
    }
}

@media (max-width: $bottom-bar-breakpoint-width) {
    .navigation-bar {
        flex-wrap: wrap;
    }

    .theme-switcher {
        margin-left: 0px;
    }

    .main-page-link,
    .navigation-menu {
        display: none;
    }

    .navigation-bar {
        position: fixed;
        z-index: 3;
        column-gap: 67px;
        row-gap: 30px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        padding: 20px 25px;
        border-top: 2px solid hsl(0, 0%, 89%);
    }

    .dark .navigation-bar {
        border-top: 2px solid hsl(0, 0%, 17%);
    }
}

@media (max-width: 558px) {
    .navigation-bar {
        column-gap: 50px;
        max-height: 97px;
        transition: max-height 0.4s ease-in-out;

        &-expanded {
            max-height: 100vh;
        }
    }
}

@media (max-width: 559px) {
    .navigation-bar {
        .expand-mobile-navigation-button {
            display: block;
            transition: bottom 0.4s ease-in-out;
        }

        &-expanded .expand-mobile-navigation-button {
            bottom: v-bind('expandButtonYPosition');
        }
    }
}
</style>
