import {expect, Page} from '@playwright/test';

export class ProfilePage {
    constructor(private readonly page: Page) {}

    private get title() {
        return this.page.getByText('Единый аккаунт для сервисов Astusha');
    }

    private get avatarFallback() {
        return this.page.locator('.profile-overview__avatar');
    }

    private get avatarImage() {
        return this.page.getByAltText('Аватар');
    }

    private get changePasswordButton() {
        return this.page.getByRole('button', {name: 'Изменить пароль'});
    }

    private get twoFactorButton() {
        return this.page.getByRole('button', {name: 'Безопасность'});
    }

    private get sessionsButton() {
        return this.page.getByRole('button', {name: 'Сессии'});
    }

    private get deleteAccountButton() {
        return this.page.getByRole('button', {name: 'Удалить аккаунт'});
    }

    async open() {
        await this.page.goto('/account/profile');
    }

    async expectOpened() {
        await expect(this.page).toHaveURL('/account/profile');
        await expect(this.title).toBeVisible();
    }

    async expectUserInfoVisible() {
        await expect(this.page.getByText('test-user').first()).toBeVisible();

        await expect(
            this.page.getByText('test-user@example.com').first()
        ).toBeVisible();

        await expect(this.page.getByText('Ангуляр').first()).toBeVisible();

        await expect(this.page.getByText('Плейврайтов').first()).toBeVisible();

        await expect(this.page.getByText('Реактор').first()).toBeVisible();

        await expect(
            this.page.getByText('Грею обсерваблы').first()
        ).toBeVisible();
    }

    async expectAvatarFallbackVisible() {
        await expect(this.avatarFallback).toBeVisible();
    }

    async expectAvatarVisible() {
        await expect(this.avatarImage).toBeVisible();
    }

    async openChangePasswordDialog() {
        await this.changePasswordButton.click();
    }

    async expectChangePasswordDialogVisible() {
        await expect(
            this.page.getByRole('heading', {name: 'Смена пароля'})
        ).toBeVisible();
    }

    async openTwoFactorDialog() {
        await this.twoFactorButton.click();
    }

    async expectTwoFactorDialogVisible() {
        await expect(
            this.page.getByRole('heading', {
                name: 'Двухфакторная аутентификация'
            })
        ).toBeVisible();
    }

    async openSessionsDialog() {
        await this.sessionsButton.click();
    }

    async expectSessionsDialogVisible() {
        await expect(
            this.page.getByRole('heading', {
                name: 'Активные сессии'
            })
        ).toBeVisible();
    }

    async openDeleteAccountDialog() {
        await this.deleteAccountButton.click();
    }

    async expectDeleteAccountDialogVisible() {
        await expect(
            this.page.getByRole('heading', {
                name: 'Удалить аккаунт?'
            })
        ).toBeVisible();
    }
}
