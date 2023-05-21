<template>
    <button class="switch-theme-button" @click="switchTheme">
        <div class="current-theme-indicator">
            <img src="~~/assets/images/sun.svg" alt="Sun icon" class="sun-icon">
            <img src="~~/assets/images/moon.svg" alt="Moon icon" class="moon-icon">
        </div>
    </button>
</template>

<script setup lang="ts">
    function switchTheme() {
        document.documentElement.classList.toggle('dark')

        if(document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark')
        }
        else {
            localStorage.setItem('theme', 'light')
        }
    }
</script>

<style lang="scss" scoped>
    .switch-theme-button {
        position: relative;
        width: 123px;
        height: 62px;
        border-radius: 100px;
        border: 2px solid $emerald;
    }

    .current-theme-indicator {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 8px;

        width: 44px;
        height: 44px;
        background-color: $emerald;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 16px -1px hsla(141, 44%, 56%, 1);

        transition: left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .sun-icon, .moon-icon {
        width: 22px;
    }

    .dark {
        .current-theme-indicator {
            left: 65px;
        }

        .sun-icon {
            display: none;
        }

        .moon-icon {
            display: inline;
        }
    }

    .moon-icon {
        display: none;
    }

    @media (max-width: 785px) {
        .switch-theme-button {
            width: 70px;
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center; 
        }

        .current-theme-indicator {
            transform: none;
            box-shadow: 0px 0px 16px -2px hsla(141, 44%, 56%, 1);
            position: static;
        }
    }
</style>