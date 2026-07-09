import {expect, Page} from '@playwright/test';

export class ProfilePage {
    constructor(private readonly page: Page) {}

    private get title() {
        return this.page.getByText('Единый аккаунт для сервисов Astusha');
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
    }
}
