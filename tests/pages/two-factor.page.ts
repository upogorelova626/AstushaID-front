import {expect, Page} from '@playwright/test';

export class TwoFactorPage {
    constructor(private readonly page: Page) {}

    private get codeInput() {
        return this.page.getByPlaceholder('••••••');
    }

    private get submitButton() {
        return this.page.getByRole('button', {
            name: 'Подтвердить'
        });
    }

    private get backToLoginLink() {
        return this.page.getByRole('button', {name: 'Вернуться ко входу'});
    }

    async openWithChallenge() {
        await this.page.addInitScript(() => {
            sessionStorage.setItem(
                'emailTwoFactorChallengeId',
                'test-challenge-id'
            );
            sessionStorage.setItem(
                'emailTwoFactorEmail',
                'test-user@example.com'
            );
        });

        await this.page.goto('/auth/two-factor');
    }

    async fillValidCode() {
        await this.codeInput.fill('123456');
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectOpened() {
        await expect(this.page).toHaveURL('/auth/two-factor');

        await expect(this.page.getByText('Подтверждение входа')).toBeVisible();
    }

    async goBackToLogin() {
        await this.backToLoginLink.click();
    }

    async expectVerifyError() {
        await expect(
            this.page.getByText('Не удалось подтвердить вход')
        ).toBeVisible();
    }

    async expectVerifySuccess() {
        await expect(
            this.page.getByText('Вход успешно подтверждён')
        ).toBeVisible();
    }
}
