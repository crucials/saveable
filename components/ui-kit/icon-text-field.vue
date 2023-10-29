<template>
    <div class="text-field" :class="{ 
        'text-field-focused': focused,
        'full-width': fullWidth,
        'themeable': themeable
    }">
        <slot></slot>
        <input :type="type" :placeholder="placeholder" class="input" @focus="focused = true"
            :disabled="disabled" @blur="focused = false"
            :value="modelValue"
            @input="event => $emit('update:modelValue', (event.target as HTMLInputElement).value)">
    </div>
</template>

<script lang="ts" setup>
    withDefaults(defineProps<{
        placeholder? : string,
        type? : 'text' | 'email' | 'password' | 'number' | 'url',
        modelValue : string,
        disabled?: boolean,
        themeable?: boolean,
        fullWidth? : boolean
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
        transition: all 0.5s;

        &-focused {
            box-shadow: 0px 0px 0px 3px hsla(0, 0%, 100%, 0.3);
        }

        .dark &.themeable {
            background-color: $soft-black;
            border: 1px solid lighten($soft-black, 10);

            .input:not(:disabled) {
                color: white;

                &::placeholder {
                    color: lighten($soft-black, 20);
                }
            }

            .input:disabled {
                color: lighten($soft-black, 33);
            }

            &.text-field-focused {
                box-shadow: 0px 0px 0px 3px lighten($soft-black, 5);
            }
        }
    }

    .full-width {
        width: 100%;
    }

    .input {
        background-color: transparent;
        flex-grow: 1;
        font-size: 1.125rem;

        &::placeholder {
            color: #C7C7C7;
        }

        &:disabled {
            color: #a8a8a8;
        }
    }

    @media (max-width: 1050px) {
        .input {
            font-size: 1rem;
        }
    }
</style>