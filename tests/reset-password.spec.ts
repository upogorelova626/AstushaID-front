import {expect, test} from '@playwright/test';
import {
    mockResetPasswordError,
    mockResetPasswordSuccess
} from './mocks/auth.mocks';
import {ResetPasswordPage} from './pages/reset-password.page';

const resetPasswordUrl = '**/password-reset/confirm';

test.describe('Reset password', () => {
    test('should open reset password page', async ({page}) => {
        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open();

        await resetPasswordPage.expectOpened();
        await resetPasswordPage.expectFormVisible();
    });

    test('should reset password successfully', async ({page}) => {
        await mockResetPasswordSuccess(page);

        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open();
        await resetPasswordPage.fillValidForm();
        await resetPasswordPage.submit();

        await resetPasswordPage.expectResetPasswordSuccess();
    });

    test('should show error when reset token is invalid', async ({page}) => {
        await mockResetPasswordError(page);

        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open('invalid-reset-token');
        await resetPasswordPage.fillValidForm();
        await resetPasswordPage.submit();

        await resetPasswordPage.expectResetPasswordError();
        await resetPasswordPage.expectFormVisible();
    });

    test('should not submit empty form', async ({page}) => {
        let requestWasSent = false;

        await page.route(resetPasswordUrl, route => {
            requestWasSent = true;

            return route.fulfill({
                status: 500,
                body: ''
            });
        });

        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open();
        await resetPasswordPage.submit();

        expect(requestWasSent).toBe(false);

        await resetPasswordPage.expectFormVisible();
        await expect(page).toHaveURL(
            '/auth/reset-password?token=test-reset-token'
        );
    });

    test('should not submit form when passwords do not match', async ({
        page
    }) => {
        let requestWasSent = false;

        await page.route(resetPasswordUrl, route => {
            requestWasSent = true;

            return route.fulfill({
                status: 500,
                body: ''
            });
        });

        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open();
        await resetPasswordPage.fillDifferentPasswords();
        await resetPasswordPage.submit();

        expect(requestWasSent).toBe(false);

        await resetPasswordPage.expectFormVisible();
        await expect(page).toHaveURL(
            '/auth/reset-password?token=test-reset-token'
        );
    });

    test('should navigate to login page after password reset', async ({
        page
    }) => {
        await mockResetPasswordSuccess(page);

        const resetPasswordPage = new ResetPasswordPage(page);

        await resetPasswordPage.open();
        await resetPasswordPage.fillValidForm();
        await resetPasswordPage.submit();

        await resetPasswordPage.expectResetPasswordSuccess();

        await resetPasswordPage.goToLogin();

        await expect(page).toHaveURL('/auth/login');
    });
});
