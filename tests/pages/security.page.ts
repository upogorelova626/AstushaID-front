import {Page} from '@playwright/test';

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

    get showMoreRecentActivityButton() {
        return this.page.getByRole('button', {name: 'Показать больше'});
    }

    get allActivitiesDialog() {
        return this.page.getByRole('dialog', {name: 'Недавняя активность'});
    }

    get twoFactorSwitch() {
        return this.page.getByRole('switch');
    }

    get deleteAccountButton() {
        return this.page.getByRole('button', {name: 'Удалить аккаунт'});
    }

    get deleteConfirmationDialog() {
        return this.page
            .getByRole('dialog')
            .filter({hasText: 'Удалить аккаунт?'});
    }

    get confirmDeleteButton() {
        return this.deleteConfirmationDialog.getByRole('button', {
            name: 'Да, удалить'
        });
    }

    get cancelDeleteButton() {
        return this.deleteConfirmationDialog.getByRole('button', {
            name: 'Нет, оставить'
        });
    }

    get deleteAccountDialog() {
        return this.page
            .getByRole('dialog')
            .filter({hasText: 'Удаление аккаунта'});
    }

    get deleteAccountPasswordInput() {
        return this.deleteAccountDialog.getByPlaceholder('Введите пароль');
    }

    get cancelButton() {
        return this.deleteAccountDialog.getByRole('button', {name: 'Отмена'});
    }

    get deleteButton() {
        return this.deleteAccountDialog.getByRole('button', {
            name: 'Удалить аккаунт'
        });
    }

    async open() {
        await this.page.goto('/account/security');
    }
}
