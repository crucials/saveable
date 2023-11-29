<template>
    <label class="toggle-button-container">
        <input type="checkbox" :checked="modelValue" 
            @change="(event : Event) => $emit('update:modelValue', (event.target as HTMLInputElement).checked)"> 

        <div class="toggle-button" :class="{ 'toggled': modelValue }">
            <div class="circle"></div>
        </div>

        <span class="toggle-button-label">
            <slot></slot>
        </span> 
    </label>
</template>

<script lang="ts" setup>
    defineProps<{
        modelValue : boolean
    }>()
</script>

<style scoped lang="scss">
    .toggle-button-container {
        display: flex;
        row-gap: 6px;
        align-items: center;
        column-gap: 12px;
        /* flex-wrap: wrap-reverse; */

        &:hover {
            cursor: pointer;
        }

        input {
            display: none;
        }
    }

    .toggle-button-label {
        font-size: 1.125rem;
        color: white;

        @media (max-width: 1280px) {
            font-size: 1rem;
        }
    }

    .toggle-button {
        position: relative;
        flex-shrink: 0;
        width: 59px;
        height: 30px;
        display: flex;
        background-color: #E3E3E3;
        border-radius: 24px;
        align-items: center;
        overflow: hidden;

        &::before {
            content: '';
            background-color: $pastel-purple;
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 24px;
            transition: left 0.2s ease, top 0.2s ease;
            transition-delay: 0.23s;
            left: -100%;
            top: -100%;
        }

        &.toggled {
            &::before {
                left: 0px;
                top: 0px;
            }

            .circle {
                left: calc(100% - 22px - 5px);
            }
        }
    }

    .circle {
        position: absolute;
        background-color: white;
        left: 5px;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        transition: left 0.2s ease;
    }
</style>