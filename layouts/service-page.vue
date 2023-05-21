<template>
    <main class="main-content-wrapper">
        <svg width="190" height="804" viewBox="0 0 190 804" fill="none" xmlns="http://www.w3.org/2000/svg" 
            class="background">
            <path d="M60.5936 0C60.2564 69.145 85.9837 219.548 191.59 268" stroke-width="14"
                class="background-lighter-colored-path"/>
            <path d="M190.59 317C68.09 323.5 -4.90972 218.5 6.09024 0" stroke-width="10"
                class="background-path"/>
            <path d="M19 804V616C19 607.163 26.1634 600 35 600H190" stroke-width="9"
                class="background-path"/>
            <path d="M91.5 804V704C91.5 695.163 98.6634 688 107.5 688H189.5" stroke-width="9"
                class="background-path"/>
        </svg>

        <div class="gradient-container">
            <slot name="form"></slot>
            <slot name="icon"></slot>
        </div>
    </main>
</template>

<script setup lang="ts">
    
</script>

<style scoped lang="scss">
    .main-content-wrapper {
        position: relative;
        flex-grow: 1;
        padding: 60px;
        overflow-x: hidden;
    }

    .background {
        position: absolute;
        right: -35px;
        height: 100%;
        width: 190px;
        top: 0px;
    }

    .background-path {
        stroke: #E0E0E0;
        @extend %themeable;

        .dark & {
            stroke: #1C1C1C;
        }
    }

    .background-lighter-colored-path {
        stroke: #F2F2F2;
        @extend %themeable;

        .dark & {
            stroke: #2E2E2E;
        }
    }

    .gradient-container {
        position: relative;
        width: 78%;
        padding: 33px 78px 33px 38px;
        background-image: linear-gradient(101.21deg, #FFFFFF 0%, #11998E 0.01%, #38EF7D 100%);
        border-radius: 12px;

        display: grid;
        column-gap: 40px;
        grid-template-columns: minmax(310px, 41%) minmax(270px, 35%);
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 1100px) {
        .gradient-container {
            width: 88%;
        }
    }

    @media (max-width: 911px) {
        .gradient-container {
            width: 97%;
            grid-template-columns: 1fr;
            justify-items: center;
            padding: 33px 40px;
            margin: 0 auto;
        }
    }

    @media (max-width: 600px) {
        .gradient-container {
            width: 100%;
            min-width: 300px;
            padding: 25px;
        }

        .main-content-wrapper {
            padding: 25px;
        }
    }

    @media (max-width: 340px) {
        .main-content-wrapper {
            padding: 15px;
        }


        .gradient-container {
            min-width: 270px;
        }
    }
</style>