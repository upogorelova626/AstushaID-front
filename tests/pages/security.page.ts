import {expect, Page} from '@playwright/test';

export class SecurityPage {
    constructor(private readonly page: Page) {}

    get changePasswordTitle() {
        return this.page.getByText('Смена пароля');
    }
    get activeSessionsTitle() {
        return this.page.getByText('Активные сессии');
    }
    get twoFactorTitle() {
        return this.page.getByText('Двухфакторная аутентификация');
    }
    get recentActivityTitle() {
        return this.page.getByText('Недавняя активность');
    }
    get deleteAccountTitle() {
        return this.page.getByText('Удаление аккаунта');
    }

    get currentPasswordInput() {
        return this.page.getByPlaceholder('Введите текущий пароль');
    }

    get newPasswordInput() {
        return this.page.getByPlaceholder('Введите новый пароль');
    }

    get confirmNewPasswordInput() {
        return this.page.getByPlaceholder('Повторите новый пароль');
    }

    get changePasswordButton() {
        return this.page.getByRole('button', {name: 'Изменить пароль'});
    }

    async open() {
        await this.page.goto('/account/security');
    }
}
