<template>
    <main class="main-content-wrapper">
        <!-- <svg width="190" height="804" viewBox="0 0 190 804" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="background">
            <path d="M60.5936 0C60.2564 69.145 85.9837 219.548 191.59 268" stroke-width="14"
                class="background-lighter-colored-path" />
            <path d="M190.59 317C68.09 323.5 -4.90972 218.5 6.09024 0" stroke-width="10" class="background-path" />
            <path d="M19 804V616C19 607.163 26.1634 600 35 600H190" stroke-width="9" class="background-path" />
            <path d="M91.5 804V704C91.5 695.163 98.6634 688 107.5 688H189.5" stroke-width="9" class="background-path" />
        </svg> -->

        <svg
            width="188"
            height="980"
            viewBox="0 0 188 980"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="background"
        >
            <path
                d="M60.5935 0C60.2563 69.145 85.9836 219.548 191.59 268"
                stroke-width="14"
                class="background-lighter-colored-path"
            />
            <path
                d="M190.59 317C68.09 323.5 -4.90972 218.5 6.09024 0"
                stroke-width="10"
                class="background-path"
            />
            <mask id="path-3-inside-1_41_60" fill="white">
                <path
                    d="M14 614C14 605.163 21.1634 598 30 598H190V805H14V614Z"
                />
            </mask>
            <path
                d="M5 614C5 600.193 16.1929 589 30 589H190V607H30C26.134 607 23 610.134 23 614H5ZM190 805H14H190ZM5 805V614C5 600.193 16.1929 589 30 589V607C26.134 607 23 610.134 23 614V805H5ZM190 598V805V598Z"
                mask="url(#path-3-inside-1_41_60)"
                class="background-lighter-filled-path"
            />
            <mask id="path-5-inside-2_41_60" fill="white">
                <path
                    d="M87 699C87 690.163 94.1634 683 103 683H190V805H87V699Z"
                />
            </mask>
            <path
                d="M78 699C78 685.193 89.1929 674 103 674H190V692H103C99.134 692 96 695.134 96 699H78ZM190 805H87H190ZM78 805V699C78 685.193 89.1929 674 103 674V692C99.134 692 96 695.134 96 699V805H78ZM190 683V805V683Z"
                mask="url(#path-5-inside-2_41_60)"
                class="background-path-filled"
            />
            <mask id="path-7-inside-3_41_60" fill="white">
                <path
                    d="M30 980C21.1634 980 14 972.837 14 964L14 804H221V980H30Z"
                />
            </mask>
            <path
                d="M30 989C16.1929 989 5 977.807 5 964L5 804H23L23 964C23 967.866 26.134 971 30 971V989ZM221 804V980V804ZM221 989H30C16.1929 989 5 977.807 5 964H23C23 967.866 26.134 971 30 971H221V989ZM14 804H221H14Z"
                mask="url(#path-7-inside-3_41_60)"
                class="background-lighter-filled-path"
            />
            <mask id="path-9-inside-4_41_60" fill="white">
                <path
                    d="M103 908C94.1634 908 87 900.837 87 892L87 804H209V908H103Z"
                />
            </mask>
            <path
                d="M103 917C89.1929 917 78 905.807 78 892V804H96V892C96 895.866 99.134 899 103 899V917ZM209 804V908V804ZM209 917H103C89.1929 917 78 905.807 78 892H96C96 895.866 99.134 899 103 899H209V917ZM87 804H209H87Z"
                mask="url(#path-9-inside-4_41_60)"
                class="background-path-filled"
            />
        </svg>

        <section class="gradient-container">
            <slot name="form"></slot>
            <slot name="icon"></slot>
        </section>

        <slot></slot>
    </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main-content-wrapper {
    position: relative;
    flex-grow: 1;
    padding: 60px;
    overflow: hidden;
}

.background {
    position: absolute;
    right: -35px;
    height: 780px;
    width: 190px;
    top: 0px;
}

.background-path {
    stroke: #e0e0e0;
    @extend %themeable;

    .dark & {
        stroke: #1c1c1c;
    }
}

.background-path-filled {
    fill: #e0e0e0;
    @extend %themeable;

    .dark & {
        fill: #1c1c1c;
    }
}

.background-lighter-colored-path {
    stroke: #f2f2f2;
    @extend %themeable;

    .dark & {
        stroke: #2e2e2e;
    }
}

.background-lighter-filled-path {
    fill: #f2f2f2;
    @extend %themeable;

    .dark & {
        fill: #2e2e2e;
    }
}

.gradient-container {
    position: relative;
    width: 78%;
    min-height: 400px;
    padding: 33px 78px 33px 38px;
    background-image: linear-gradient(
        101.21deg,
        #ffffff 0%,
        #11998e 0.01%,
        #38ef7d 100%
    );
    border-radius: 12px;

    display: grid;
    column-gap: 40px;
    row-gap: 30px;
    grid-template-columns: minmax(310px, 41%) minmax(270px, 35%);
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 1100px) {
    .gradient-container {
        width: 88%;
    }
}

@media (max-width: 1000px) {
    .gradient-container {
        width: 80%;
        grid-template-columns: 1fr;
        justify-items: center;
        padding: 33px 40px;
    }
}

@media (max-width: 800px) {
    .gradient-container {
        width: 100%;
    }
}

@media (max-width: 600px) {
    .gradient-container {
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
