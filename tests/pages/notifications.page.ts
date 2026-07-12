import {Page} from '@playwright/test';

export class NotificationsPage {
    constructor(private readonly page: Page) {}

    get emailNotificationsSwitch() {
        return this.page.getByTestId('email-notifications');
    }

    get pushNotificationsSwitch() {
        return this.page.getByTestId('push-notifications');
    }

    get telegramNotificationsSwitch() {
        return this.page.getByTestId('telegram-notifications');
    }

    get loginNotificationsSwitch() {
        return this.page.getByTestId('login-notifications');
    }

    get changePasswordNotificationsSwitch() {
        return this.page.getByTestId('change-password-notifications');
    }

    get sessionsFinishedNotificationsSwitch() {
        return this.page.getByTestId('sessions-finished-notifications');
    }

    get twoFactorNotificationsSwitch() {
        return this.page.getByTestId('two-factor-notifications');
    }

    get marketingNotificationsSwitch() {
        return this.page.getByTestId('marketing-notifications');
    }

    async open() {
        return this.page.goto('/account/notifications');
    }
}
