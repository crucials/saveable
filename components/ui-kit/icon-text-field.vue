<template>
    <div class="text-field" :class="{ 'text-field-focused': focused }">
        <slot></slot>
        <input :type="type" :placeholder="placeholder" class="input" @focus="focused = true" @blur="focused = false"
            @input="event => $emit('update:modelValue', (event.target as HTMLInputElement).value)">
    </div>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        placeholder? : string,
        type? : 'text' | 'email' | 'password' | 'number' | 'url',
        modelValue : string,
    }>(), {
        type: 'text'
    })

    const focused = ref(false)
</script>

<style lang="scss" scoped>
    .text-field {
        border: 1px solid hsl(0, 0%, 80%);
        display: flex;
        column-gap: 10px;
        padding: 10px;
        background-color: white;
        border-radius: 8px;
        transition: box-shadow 0.5s;

        &-focused {
            box-shadow: 0px 0px 0px 3px hsla(0, 0%, 100%, 0.3);
        }
    }

    .input {
        background-color: transparent;
        flex-grow: 1;
        font-size: 1.125rem;

        &::placeholder {
            color: #C7C7C7;
        }
    }

    @media (max-width: 1050px) {
        .input {
            font-size: 1rem;
        }
    }
</style>