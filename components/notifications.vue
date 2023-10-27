<template>
    <TransitionGroup 
        :class="{
            'notifications-container': true,
            'expanded': expanded,
        }" tag="ul" name="slide" @mouseleave="expanded = false" ref="notificationsContainer">
        <li class="notification" v-for="notification in notifications" 
            :key="notification.id" @mouseenter="expanded = true" @click="expanded = true">

            <img :src="`/images/${notification.type}-notification-icon.svg`" 
                :alt="`Icon for ${notification.type} notification`" class="notification-icon">

            {{ notification.message }}

            <button class="close-button" 
                @click.stop="notifications = notifications.filter(item => item.id !== notification.id)">
                <img src="~~/assets/images/cross.svg" alt="Cross, close icon">
            </button>
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '~~/stores/notifications'

const { notifications } = storeToRefs(useNotificationsStore())

const expanded = ref(false)

const notificationsContainer = ref<ComponentPublicInstance>()

onMounted(() => {
    onClickOutside(notificationsContainer.value?.$el, () => {
        expanded.value = false
    })
})
</script>

<style lang="scss">
.notifications-container {
    position: fixed;
    bottom: 24px;
    z-index: 10;
    right: 30px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    &:not(.expanded) {
        pointer-events: none;

        .notification:nth-last-child(2) {
            scale: 0.92;
            top: 87px;
        }

        .notification:nth-last-child(3) {
            scale: 0.82;
            top: 173px;
        }

        .notification:nth-last-child(4) {
            scale: 0.82;
            top: 312px;
        }
    }

    @media (max-width: 1050px) {
        bottom: 120px;
    }

    @media (max-width: 640px) {
        width: 90%;
        right: 15px;
        left: 50%;
        transform: translateX(-50%);
        &:not(.expanded) {
            .notification:nth-last-child(2) {
                scale: 0.92;
                top: 76px;
            }

            .notification:nth-last-child(3) {
                scale: 0.82;
                top: 153px;
            }

            .notification:nth-last-child(4) {
                scale: 0.82;
                top: 250px;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.notification {
    transition: all 0.45s ease;

    background-color: white;
    position: relative;
    top: 0px;
    padding: 14px 36px 14px 18px;
    border-radius: 12px;
    border: 2px solid #EBEBEB;
    box-shadow: 2px 4px 6px 0px rgba(0, 0, 0, 0.10);
    display: flex;
    align-items: center;
    column-gap: 26px;
    width: 400px;
    pointer-events: all !important;

    &-icon {
        transition: opacity 0.4s ease;
    }

    .dark & {
        color: white;
        background-color: $soft-black;
        border: 2px solid lighten($soft-black, 10);

        &-icon {
            opacity: 0.7;
        }

        &:hover .notification-icon {
            opacity: 1;
        }
    }

    @media (max-width: 640px) {
        min-width: 270px;
        width: 100%;
        padding: 12px 36px 12px 12px;
        font-size: 14px;
        column-gap: 16px;

        .notification-icon {
            width: 42px;
        }
    }
}

.close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    transition: opacity 0.4s ease;
    
    .dark & {
        opacity: 0.3;

        &:hover {
            opacity: 0.6;
        }
    }
}

.slide-move, .slide-enter-active, .slide-leave-active {
    transition: all 0.5s ease;
}

.slide-leave-active {
    position: absolute;
}

.slide-enter-from, .slide-leave-to {
    transform: translateX(25px);
    opacity: 0;
}
</style>