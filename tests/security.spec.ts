import {expect, test} from '@playwright/test';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {SecurityPage} from './pages/security.page';
import {
    mockChangePasswordSuccess,
    mockChangePasswordFailed
} from './mocks/security.mock';
import {mockUserActivitySuccess} from './mocks/activity.mocks';
import {
    mockCurrentUserWithTwoFactorDisabled,
    mockCurrentUserWithTwoFactorEnabled,
    mockDisableTwoFactorSuccess,
    mockEnableTwoFactorSuccess
} from './mocks/two-factor.mocks';

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

    test('should open all recent activity', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUserActivitySuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.showMoreRecentActivity.click();

        await expect(page.getByText('Недавняя активность')).toBeVisible;
        await expect(securityPage.allActivitiesDialog).toBeVisible();
    });

    test('should enable two-factor authentication', async ({page}) => {
        await mockCurrentUserWithTwoFactorDisabled(page);
        await mockEnableTwoFactorSuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.twoFactorSwitch.click();

        await expect(
            page.getByText('Двухфакторная аутентификация включена')
        ).toBeVisible();
    });

    test('should disable two-factor authentication', async ({page}) => {
        await mockCurrentUserWithTwoFactorEnabled(page);
        await mockDisableTwoFactorSuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.twoFactorSwitch.click();

        await expect(
            page.getByText('Двухфакторная аутентификация выключена')
        ).toBeVisible();
    });
});
