import {expect, Page} from '@playwright/test';

export class SettingsPage {
    constructor(private readonly page: Page) {}

    get firstNameInput() {
        return this.page.getByPlaceholder('Введите имя');
    }

    get lastNameInput() {
        return this.page.getByPlaceholder('Введите фамилию');
    }

    get positionInput() {
        return this.page.getByPlaceholder('Введите должность');
    }

    get aboutInput() {
        return this.page.getByPlaceholder('Расскажите немного о себе');
    }

    get avatarInput() {
        return this.page.locator('.profile-settings-card input[type="file"]');
    }

    get editButton() {
        return this.page.getByRole('button', {name: 'Редактировать'});
    }

    get saveButton() {
        return this.page.getByRole('button', {name: 'Сохранить изменения'});
    }

    get cancelButton() {
        return this.page.getByRole('button', {name: 'Отменить'});
    }

    get deletePhotoButton() {
        return this.page.getByRole('button', {name: 'Удалить фото'});
    }

    get lightThemeButton() {
        return this.page.getByRole('button', {name: 'Светлая'});
    }

    get darkThemeButton() {
        return this.page.getByRole('button', {name: 'Тёмная'});
    }

    async open() {
        await this.page.goto('/account/settings');
    }

    async startEditing() {
        await this.editButton.click();
    }

    async saveChanges() {
        await this.saveButton.click();
    }

    async cancelChanges() {
        await this.cancelButton.click();
    }

    async deletePhoto() {
        await this.deletePhotoButton.click();
    }

    async fillAvatarInput() {
        await this.avatarInput.setInputFiles('tests/fixtures/avatar.png');
    }

    async fillValidProfileForm() {
        await this.firstNameInput.fill('Тайпскрипт');
        await this.lastNameInput.fill('Ангуляров');
        await this.positionInput.fill('Frontend-разработчик');
        await this.aboutInput.fill(
            'Создаю приложения на Angular и грею обсерваблы'
        );
    }
    async selectLightTheme() {
        await this.lightThemeButton.click();
    }

    async selectDarkTheme() {
        await this.darkThemeButton.click();
    }

    async expectCurrentUserSettingsVisible() {
        await expect(this.firstNameInput).toHaveValue('Ангуляр');
        await expect(this.lastNameInput).toHaveValue('Плейврайтов');
        await expect(this.positionInput).toHaveValue('Реактор');
        await expect(this.aboutInput).toHaveValue('Грею обсерваблы');
    }

    async expectUpdatedProfileValues() {
        await expect(this.firstNameInput).toHaveValue('Тайпскрипт');
        await expect(this.lastNameInput).toHaveValue('Ангуляров');
        await expect(this.positionInput).toHaveValue('Frontend-разработчик');
        await expect(this.aboutInput).toHaveValue(
            'Создаю приложения на Angular и грею обсерваблы'
        );
    }

    async expectOriginalProfileValues() {
        await this.expectCurrentUserSettingsVisible();
    }

    async expectProfileUpdateSuccess() {
        await expect(this.page.getByText('успешно сохранены')).toBeVisible();
    }

    async expectProfileUpdateError() {
        await expect(
            this.page.getByText('Не удалось сохранить изменения профиля')
        ).toBeVisible();
    }
}
