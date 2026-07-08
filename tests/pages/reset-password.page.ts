import {expect, Page} from '@playwright/test';

export class ResetPasswordPage {
    constructor(private readonly page: Page) {}

    private get newPasswordInput() {
        return this.page.getByPlaceholder('Введите новый пароль');
    }

    private get newPasswordConfirmInput() {
        return this.page.getByPlaceholder('Повторите новый пароль');
    }

    private get saveNewPasswordButton() {
        return this.page.getByRole('button', {
            name: 'Сохранить новый пароль',
            exact: true
        });
    }

    private get loginLink() {
        return this.page.getByRole('button', {name: 'Войти', exact: true});
    }

    async open(token = 'test-reset-token') {
        await this.page.goto(`/auth/reset-password?token=${token}`);
    }

    async fillForm(password: string, confirmPassword = password) {
        await this.newPasswordInput.fill(password);
        await this.newPasswordConfirmInput.fill(confirmPassword);
    }

    async fillValidForm() {
        await this.fillForm('12345678');
    }

    async fillDifferentPasswords() {
        await this.fillForm('12345678', '87654321');
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

    async expectFormVisible() {
        await expect(this.newPasswordInput).toBeVisible();
        await expect(this.newPasswordConfirmInput).toBeVisible();
        await expect(this.saveNewPasswordButton).toBeVisible();
    }

    async expectResetPasswordSuccess() {
        await expect(
            this.page.getByText('Пароль успешно изменён').first()
        ).toBeVisible();
    }

    async expectResetPasswordError() {
        await expect(
            this.page
                .getByText(
                    'Ссылка для сброса пароля недействительна или устарела.'
                )
                .first()
        ).toBeVisible();
    }
}
