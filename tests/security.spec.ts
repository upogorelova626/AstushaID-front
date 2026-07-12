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
    mockEnableTwoFactorSuccess,
    mockUpdateTwoFactorError
} from './mocks/two-factor.mocks';
import {
    mockDeleteAccountSuccess,
    mockDeleteAccountFailed
} from './mocks/delete-account.mocks';
import {mockUserSessionsSuccess} from './mocks/active-sessions.mock';

test.describe('Security', () => {
    test('should change password successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
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
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
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
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
        await mockUserActivitySuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.showMoreRecentActivityButton.click();

        await expect(
            securityPage.allActivitiesDialog.getByText('Недавняя активность')
        ).toBeVisible();
    });

    test('should enable two-factor authentication', async ({page}) => {
        await mockCurrentUserWithTwoFactorDisabled(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
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
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
        await mockDisableTwoFactorSuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.twoFactorSwitch.click();

        await expect(
            page.getByText('Двухфакторная аутентификация выключена')
        ).toBeVisible();
    });

    test('should show error when two-factor update fails', async ({page}) => {
        await mockCurrentUserWithTwoFactorEnabled(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
        await mockUpdateTwoFactorError(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.twoFactorSwitch.click();
        await expect(
            page.getByText(
                'Не удалось изменить настройку двухфакторной аутентификации'
            )
        ).toBeVisible();
    });

    test('should open delete account dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.deleteAccountButton.click();
        await expect(page.getByText('Удалить аккаунт?')).toBeVisible();
    });

    test('should delete account successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
        await mockDeleteAccountSuccess(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.deleteAccountButton.click();
        await securityPage.confirmDeleteButton.click();
        await securityPage.deleteAccountPasswordInput.fill('33333333');
        await securityPage.deleteButton.click();

        await expect(page).toHaveURL('/auth/create-account');
    });

    test('should show error when account deletion fails', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUserSessionsSuccess(page);
        await mockUserActivitySuccess(page);
        await mockDeleteAccountFailed(page);

        const securityPage = new SecurityPage(page);

        await securityPage.open();
        await securityPage.deleteAccountButton.click();
        await securityPage.confirmDeleteButton.click();
        await securityPage.deleteAccountPasswordInput.fill('33333333');
        await securityPage.deleteButton.click();

        await expect(page).toHaveURL('/account/security');
        await expect(
            page.getByText('Не удалось удалить аккаунт')
        ).toBeVisible();
    });

    // test('should display active sessions', async ({page}) => {});

    // test('should terminate active session', async ({page}) => {});

    // test('should show error when session termination fails', async ({
    //     page
    // }) => {});
});
