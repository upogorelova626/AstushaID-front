import {expect, Page} from '@playwright/test';

export class CreateAccountPage {
    constructor(private readonly page: Page) {}

    private get loginInput() {
        return this.page.getByPlaceholder('Введите логин');
    }

    private get emailInput() {
        return this.page.getByPlaceholder('Введите email');
    }

    private get passwordInput() {
        return this.page.getByPlaceholder('Введите пароль');
    }

    private get confirmPasswordInput() {
        return this.page.getByPlaceholder('Повторите пароль');
    }

    private get agreementCheckbox() {
        return this.page.getByRole('checkbox', {
            name: /Я принимаю условия использования и политику конфиденциальности/i
        });
    }

    private get submitButton() {
        return this.page.getByRole('button', {
            name: 'Создать аккаунт',
            exact: true
        });
    }

    async open() {
        await this.page.goto('/auth/create-account');
    }

    async fillValidForm() {
        await this.loginInput.fill('test-user');
        await this.emailInput.fill('test-user@example.com');
        await this.passwordInput.fill('password123');
        await this.confirmPasswordInput.fill('password123');
        await this.agreementCheckbox.check();
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectOpened() {
        await expect(this.page).toHaveURL(/\/auth\/create-account/);

        await expect(
            this.page.getByRole('heading', {
                name: 'Создайте аккаунт'
            })
        ).toBeVisible();
    }

    async expectCreateAccountError() {
        await expect(
            this.page.getByText('Не удалось создать аккаунт')
        ).toBeVisible();
    }
}
