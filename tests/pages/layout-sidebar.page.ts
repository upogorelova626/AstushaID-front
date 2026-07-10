import {expect, Page} from '@playwright/test';

export class LayoutSidebar {
    constructor(private readonly page: Page) {}

    private get profileLink() {
        return this.page.getByRole('link', {name: 'Профиль'});
    }

    private get settingsLink() {
        return this.page.getByRole('link', {name: 'Настройки'});
    }

    private get securityLink() {
        return this.page.getByRole('link', {name: 'Безопасность'});
    }

    private get applicationsLink() {
        return this.page.getByRole('link', {name: 'Приложения'});
    }

    private get notificationsLink() {
        return this.page.getByRole('link', {name: 'Уведомления'});
    }

    private get logoutButton() {
        return this.page.getByRole('button', {name: 'Выйти'});
    }

    private get helpButton() {
        return this.page.getByRole('button', {name: 'Открыть помощь'});
    }

    async goToProfile() {
        await this.profileLink.click();
    }

    async goToSettings() {
        await this.settingsLink.click();
    }

    async goToSecurity() {
        await this.securityLink.click();
    }

    async goToApplications() {
        await this.applicationsLink.click();
    }

    async goToNotifications() {
        await this.notificationsLink.click();
    }

    async openHelpDialog() {
        await this.helpButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async expectHelpDialogVisible() {
        await expect(
            this.page.getByText('Связаться с поддержкой')
        ).toBeVisible();
    }

    async expectLoginPageOpened() {
        await expect(this.page).toHaveURL('/auth/login');
        await expect(this.page.getByText('Вход в аккаунт')).toBeVisible();
    }
}
