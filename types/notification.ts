export interface Notification {
    id: number,
    type : NotificationType,
    message : string
}

export type NotificationType = 'error' | 'success'