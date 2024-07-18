<template>
    <svg viewBox="0 0 304 279" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M196.758 21H256.35C274.707 21 289.589 35.8812 289.589 54.2381V113.83C289.589 118.238 287.838 122.465 284.721 125.582L171.83 238.473C158.849 251.454 137.804 251.454 124.824 238.473L72.1152 185.765C59.1349 172.784 59.1349 151.739 72.1152 138.759L185.007 25.8676C188.123 22.7509 192.35 21 196.758 21Z"
            :stroke="color"
            stroke-width="15"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M123.398 237.048L89.9445 253.774C73.5256 261.984 53.5604 255.329 45.3509 238.91C44.8312 237.87 44.3663 236.804 43.9582 235.716L17.1211 164.15C11.3416 148.738 17.7125 131.418 32.101 123.424L156.636 54.2381"
            :stroke="color"
            stroke-width="15"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M264.66 62.5476C264.66 53.3692 257.219 45.9286 248.041 45.9286C238.862 45.9286 231.422 53.3692 231.422 62.5476C231.422 71.7261 238.862 79.1667 248.041 79.1667C257.219 79.1667 264.66 71.7261 264.66 62.5476Z"
            :fill="color"
        />
    </svg>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        color?: string
    }>(),
    { color: 'white' },
)
</script>
