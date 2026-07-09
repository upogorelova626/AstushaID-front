export interface NotificationSettings {
    emailNotificationsEnabled: boolean;
    loginNotificationsEnabled: boolean;
    pushNotificationsEnabled: boolean;
    telegramNotificationsEnabled: boolean;
    passwordChangedNotificationsEnabled: boolean;
    sessionsFinishedNotificationsEnabled: boolean;
    twoFactorNotificationsEnabled: boolean;
    marketingEmailsEnabled: boolean;
}

export type UpdateNotificationSettingsRequest = Partial<NotificationSettings>;
