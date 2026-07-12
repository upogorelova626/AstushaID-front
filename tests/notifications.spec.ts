import {expect, test} from '@playwright/test';

import {
    mockNotificationSettings,
    mockUpdateNotificationSettingsFailed,
    mockUpdateNotificationSettingsSuccess
} from './mocks/notifications-settings.mocks';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {NotificationsPage} from './pages/notifications.page';

test.describe('Notifications', () => {
    test('should show current notification settings', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(notificationsPage.emailNotificationsSwitch).toBeChecked();
        await expect(notificationsPage.loginNotificationsSwitch).toBeChecked();
        await expect(
            notificationsPage.changePasswordNotificationsSwitch
        ).toBeChecked();
        await expect(
            notificationsPage.sessionsFinishedNotificationsSwitch
        ).toBeChecked();
        await expect(
            notificationsPage.twoFactorNotificationsSwitch
        ).toBeChecked();
        await expect(
            notificationsPage.marketingNotificationsSwitch
        ).toBeChecked();

        await expect(
            notificationsPage.pushNotificationsSwitch
        ).not.toBeChecked();
        await expect(
            notificationsPage.telegramNotificationsSwitch
        ).not.toBeChecked();
    });

    test('should update email notifications successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            emailNotificationsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(notificationsPage.emailNotificationsSwitch).toBeChecked();

        await notificationsPage.emailNotificationsSwitch.click();

        await expect(
            notificationsPage.emailNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should update login notifications successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            loginNotificationsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(notificationsPage.loginNotificationsSwitch).toBeChecked();

        await notificationsPage.loginNotificationsSwitch.click();

        await expect(
            notificationsPage.loginNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should update password change notifications successfully', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            passwordChangedNotificationsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(
            notificationsPage.changePasswordNotificationsSwitch
        ).toBeChecked();

        await notificationsPage.changePasswordNotificationsSwitch.click();

        await expect(
            notificationsPage.changePasswordNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should update session termination notifications successfully', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            sessionsFinishedNotificationsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(
            notificationsPage.sessionsFinishedNotificationsSwitch
        ).toBeChecked();

        await notificationsPage.sessionsFinishedNotificationsSwitch.click();

        await expect(
            notificationsPage.sessionsFinishedNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should update two-factor notifications successfully', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            twoFactorNotificationsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(
            notificationsPage.twoFactorNotificationsSwitch
        ).toBeChecked();

        await notificationsPage.twoFactorNotificationsSwitch.click();

        await expect(
            notificationsPage.twoFactorNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should update marketing emails successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsSuccess(page, {
            marketingEmailsEnabled: false
        });

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(
            notificationsPage.marketingNotificationsSwitch
        ).toBeChecked();

        await notificationsPage.marketingNotificationsSwitch.click();

        await expect(
            notificationsPage.marketingNotificationsSwitch
        ).not.toBeChecked();

        await expect(
            page.getByText('Настройки успешно обновлены')
        ).toBeVisible();
    });

    test('should show error when notification settings update fails', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);
        await mockUpdateNotificationSettingsFailed(page);

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();
        await notificationsPage.emailNotificationsSwitch.click();

        await expect(
            page.getByText('Не удалось обновить настройки')
        ).toBeVisible();
    });

    test('should disable unavailable notification settings', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockNotificationSettings(page);

        const notificationsPage = new NotificationsPage(page);

        await notificationsPage.open();

        await expect(notificationsPage.pushNotificationsSwitch).toBeDisabled();
        await expect(
            notificationsPage.telegramNotificationsSwitch
        ).toBeDisabled();
    });

    // test('should update push notifications successfully', async ({
    //     page
    // }) => {});

    // test('should update telegram notifications successfully', async ({
    //     page
    // }) => {});

    // test('should update Astusha App notifications successfully', async ({
    //     page
    // }) => {});

    // test('should update Astusha Messenger notifications successfully', async ({
    //     page
    // }) => {});

    // test('should update integration notifications successfully', async ({
    //     page
    // }) => {});
});
