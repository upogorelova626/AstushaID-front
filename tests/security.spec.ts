import {expect, test} from '@playwright/test';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {SecurityPage} from './pages/security.page';
import {
    mockChangePasswordSuccess,
    mockChangePasswordFailed
} from './mocks/security.mock';

test.describe('Security', () => {
    test('should change password successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockChangePasswordSuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.currentPasswordInput.fill('11111111');
        await securityPage.newPasswordInput.fill('33333333');
        await securityPage.confirmNewPasswordInput.fill('33333333');
        await securityPage.changePasswordButton.click();

        await expect(page.getByText('Пароль успешно изменён')).toBeVisible();
        await expect(page).toHaveURL('/auth/login');
    });

    test('should show error when password change fails', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockChangePasswordFailed(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.currentPasswordInput.fill('33333333');
        await securityPage.newPasswordInput.fill('11111111');
        await securityPage.confirmNewPasswordInput.fill('11111111');
        await securityPage.changePasswordButton.click();

        await expect(
            page.getByText('Не удалось изменить пароль')
        ).toBeVisible();
        await expect(page).toHaveURL('/account/security');
    });
});
