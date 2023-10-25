import type { Notification, NotificationType } from '~/types/notification'

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([])

    function showNotification(type: NotificationType, message: string) {
        const lastNotification = notifications.value.at(-1)
        const newNotificationId = lastNotification ? lastNotification.id + 1 : 1

        if(notifications.value.length === 4) {
            notifications.value.splice(0, 1)
        }

        notifications.value.push({
            id: newNotificationId,
            type, message
        })

        setTimeout(() => {
            notifications.value = notifications.value
                .filter(someNotification => someNotification.id !== newNotificationId)
        }, 3500)
    }

    return { notifications, showNotification }
})