<script setup lang="ts">
const props = withDefaults(defineProps<{
    opened?: boolean
    dropdownListClass?: string
}>(), { opened: undefined })

const emit = defineEmits<{
    (event: 'update:opened', newValue: boolean): void
}>()

// if v-model:opened is not specified, uses local ref for the visibility state
const openedLocally = ref(false)

const opened = computed({
    get() {
        if (props.opened !== undefined) {
            return props.opened
        }

        return openedLocally.value
    },
    set(newValue) {
        if(props.opened !== undefined) {
            emit('update:opened', newValue)
        }

        openedLocally.value = newValue
    }
})
</script>

<template>
    <div
        ref="dropdownWrapper"
        class="dropdown-wrapper"
        @mouseenter="opened = true"
        @mouseleave="opened = false"
    >
        <Transition
            name="list-slide-down"
        >
            <ul
                v-show="opened"
                role="listbox"
                id="dropdownList"
                class="dropdown-list"
                :class="dropdownListClass"
                @click="opened = false"
            >
                <slot></slot>
            </ul>
        </Transition>

        <div
            :aria-expanded="opened"
            aria-controls="dropdownList"
            aria-haspopup="listbox"
            class="dropdown-label"
        >
            <slot name="label"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown-wrapper {
    position: relative;
}

.dropdown-list {
    transition: all 0.3s ease;

    z-index: 7;
    position: absolute;
    top: 100%;
    left: 0px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    min-width: 150px;

    padding: 16px;
    border-radius: 10px;
    background-color: white;

    box-shadow: 0px 3px 24px 1px rgb(black, 0.1);

    color: white;
}

.list-slide-down-enter-from,
.list-slide-down-leave-to {
    pointer-events: none;
    transform: translateY(-20px);
    opacity: 0;
}

.dropdown-label {
    position: relative;
}
</style>
