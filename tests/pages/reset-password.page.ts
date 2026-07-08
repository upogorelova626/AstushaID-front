import {expect, Page} from '@playwright/test';

export class ResetPasswordPage {
    constructor(private readonly page: Page) {}

    private get newPasswordInput() {
        return this.page.getByPlaceholder('Введите новый пароль');
    }

    private get newPasswordConfirmInput() {
        return this.page.getByPlaceholder('Подтвердите пароль');
    }

    private get saveNewPasswordButton() {
        return this.page.getByRole('button', {
            name: 'Сохранить новый пароль',
            exact: true
        });
    }

    private get loginLink() {
        return this.page.getByRole('link', {name: 'Войти'});
    }

    async open(token = 'test-reset-token') {
        await this.page.goto(`/auth/reset-password?token=${token}`);
    }

    async fillValidForm() {
        await this.newPasswordInput.fill('12345678');
        await this.newPasswordConfirmInput.fill('12345678');
    }

    async submit() {
        await this.saveNewPasswordButton.click();
    }

    async goToLogin() {
        await this.loginLink.click();
    }

    async expectOpened(token = 'test-reset-token') {
        await expect(this.page).toHaveURL(
            `/auth/reset-password?token=${token}`
        );

        await expect(
            this.page.getByText('Установите новый пароль')
        ).toBeVisible();
    }

    async expectResetPasswordError() {
        await expect(
            this.page.getByText(
                'Ссылка для сброса пароля недействительна или устарела.'
            )
        ).toBeVisible();
    }

    async expectResetPasswordSuccess() {
        await expect(
            this.page.getByText('Пароль успешно изменён')
        ).toBeVisible();
    }
}
