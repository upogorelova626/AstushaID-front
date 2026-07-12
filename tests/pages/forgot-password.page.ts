import {expect, Page} from '@playwright/test';

export class ForgotPasswordPage {
    constructor(private readonly page: Page) {}

    private get emailInput() {
        return this.page.getByPlaceholder('Введите email');
    }

    private get sendLinkButton() {
        return this.page.getByRole('button', {name: 'Отправить ссылку'});
    }

    private get loginLink() {
        return this.page.getByRole('link', {name: 'Войти'});
    }

    private get enterAnotherEmailButton() {
        return this.page.getByRole('button', {name: 'Ввести другую почту'});
    }

    private get successText() {
        return this.page.locator('.success-text');
    }

    async open() {
        await this.page.goto('/auth/forgot-password');
    }

    async fillValidForm() {
        await this.emailInput.fill('test-user@example.com');
    }

    async submit() {
        await this.sendLinkButton.click();
    }

    async goToLogin() {
        await this.loginLink.click();
    }

    async enterAnotherEmail() {
        await this.enterAnotherEmailButton.click();
    }

    async expectOpened() {
        await expect(this.page).toHaveURL('/auth/forgot-password');

        await expect(
            this.page.getByText('Восстановление пароля')
        ).toBeVisible();
    }

    async expectEmailSent() {
        await expect(this.page.getByText('Проверьте почту')).toBeVisible();

        await expect(this.successText).toContainText(
            'Если аккаунт с такой почтой существует, мы отправили письмо со ссылкой для сброса пароля.'
        );

        await expect(this.enterAnotherEmailButton).toBeVisible();
    }

    async expectEmailSendError() {
        await expect(
            this.page.getByText('Не удалось отправить письмо')
        ).toBeVisible();
    }

    async expectFormVisible() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.sendLinkButton).toBeVisible();
        await expect(this.loginLink).toBeVisible();
    }
}
