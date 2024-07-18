<template>
    <svg
        class="arrow-down-icon"
        width="16"
        height="16"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.59998 7.79999L12.5531 17.7531L22.5062 7.79999"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<style scoped lang="scss">
.arrow-down-icon path {
    @extend %themeable;
    stroke: #393939;
}

.dark .arrow-down-icon path {
    stroke: white;
}
</style>
