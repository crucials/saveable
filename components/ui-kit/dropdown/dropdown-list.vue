<template>
    <div
        ref="dropdownWrapper"
        class="dropdown-wrapper"
        @mouseenter="opened = true"
        @mouseleave="opened = false"
    >
        <button
            :aria-expanded="opened"
            aria-controls="dropdownList"
            aria-haspopup="listbox"
            class="dropdown-button"
            @click="opened = !opened"
        >
            <slot name="button"></slot>
        </button>

        <Transition name="list-slide-down">
            <ul
                v-show="opened"
                id="dropdownList"
                role="listbox"
                class="dropdown-list"
                :class="dropdownListClass"
                @click="opened = false"
            >
                <slot></slot>
            </ul>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        opened?: boolean
        dropdownListClass?: string
    }>(),
    { opened: undefined, dropdownListClass: undefined },
)

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
        if (props.opened !== undefined) {
            emit('update:opened', newValue)
        }

        openedLocally.value = newValue
    },
})
</script>


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

    box-shadow: 0px 3px 24px 1px #00000010;
    border: 1px solid transparent;
}

.dark .dropdown-list {
    background-color: $soft-black;
    border-color: #4e4e4e;
}

.list-slide-down-enter-from,
.list-slide-down-leave-to {
    pointer-events: none;
    transform: translateY(-20px);
    opacity: 0;
}

.dropdown-button {
    position: relative;
}
</style>
