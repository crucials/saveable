<template>
    <Transition name="error-text">
        <p v-if="visible" class="error-text">
            <slot/>
        </p>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    visible: boolean
}>()
</script>

<style scoped lang="scss">
.error-text {
    color: white;
    transition:
        opacity 0.4s linear,
        transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.error-text-enter-from,
.error-text-leave-to {
    opacity: 0;
    transform: translateY(-15px);
}
</style>
