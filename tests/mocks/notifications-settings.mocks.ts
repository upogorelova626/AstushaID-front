import {Page} from '@playwright/test';

import {NotificationSettings} from '../../src/app/shared/interfaces';

const notificationSettingsUrl = '**/users/me/notification-settings';

const defaultNotificationSettings: NotificationSettings = {
    emailNotificationsEnabled: true,
    pushNotificationsEnabled: false,
    telegramNotificationsEnabled: false,
    loginNotificationsEnabled: true,
    passwordChangedNotificationsEnabled: true,
    sessionsFinishedNotificationsEnabled: true,
    twoFactorNotificationsEnabled: true,
    marketingEmailsEnabled: true
};

export function buildNotificationSettings(
    overrides: Partial<NotificationSettings> = {}
): NotificationSettings {
    return {
        ...defaultNotificationSettings,
        ...overrides
    };
}

export async function mockNotificationSettings(
    page: Page,
    overrides: Partial<NotificationSettings> = {}
) {
    await page.route(notificationSettingsUrl, route => {
        if (route.request().method() !== 'GET') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(buildNotificationSettings(overrides))
        });
    });
}

export async function mockUpdateNotificationSettingsSuccess(
    page: Page,
    overrides: Partial<NotificationSettings> = {}
) {
    await page.route(notificationSettingsUrl, route => {
        if (route.request().method() !== 'PATCH') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(buildNotificationSettings(overrides))
        });
    });
}

export async function mockUpdateNotificationSettingsFailed(page: Page) {
    await page.route(notificationSettingsUrl, route => {
        if (route.request().method() !== 'PATCH') {
            return route.fallback();
        }

        return route.fulfill({
            status: 500
        });
    });
}
