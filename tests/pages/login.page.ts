import {expect, Page} from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {}

    private get loginOrEmailInput() {
        return this.page.getByPlaceholder('Введите email или логин');
    }

    private get passwordInput() {
        return this.page.getByPlaceholder('Введите пароль');
    }

    private get rememberMeCheckbox() {
        return this.page.getByRole('checkbox', {name: 'Запомнить меня'});
    }

    private get forgotPasswordLink() {
        return this.page.getByRole('link', {name: 'Забыли пароль?'});
    }

    private get loginButton() {
        return this.page.getByRole('button', {
            name: 'Войти',
            exact: true
        });
    }

    private get createAccountLink() {
        return this.page.getByRole('link', {name: 'Создать аккаунт'});
    }

    async open() {
        await this.page.goto('/auth/login');
    }

    async fillValidForm() {
        await this.loginOrEmailInput.fill('test-user');
        await this.passwordInput.fill('password123');
    }

    async checkRememberMe() {
        await this.rememberMeCheckbox.check();
    }

    async submit() {
        await this.loginButton.click();
    }

    async expectOpened() {
        await expect(this.page).toHaveURL(/\/auth\/login/);

        await expect(
            this.page.getByRole('heading', {
                name: 'Вход в аккаунт'
            })
        ).toBeVisible();
    }

    async expectLoginError() {
        await expect(this.page.getByText('Не удалось войти')).toBeVisible();
    }

    async goToForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async goToCreateAccount() {
        await this.createAccountLink.click();
    }
}
