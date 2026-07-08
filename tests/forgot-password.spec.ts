import {expect, test} from '@playwright/test';

import {
    mockForgotPasswordError,
    mockForgotPasswordSuccess
} from './mocks/auth.mocks';
import {ForgotPasswordPage} from './pages/forgot-password.page';

test.describe('Forgot password', () => {
    test('should open forgot password page', async ({page}) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();

        await forgotPasswordPage.expectOpened();
        await forgotPasswordPage.expectFormVisible();
    });

    test('should send reset password email successfully', async ({page}) => {
        await mockForgotPasswordSuccess(page);

        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();
        await forgotPasswordPage.fillValidForm();
        await forgotPasswordPage.submit();

        await forgotPasswordPage.expectEmailSent();
    });

    test('should show error when reset password email sending failed', async ({
        page
    }) => {
        await mockForgotPasswordError(page);

        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();
        await forgotPasswordPage.fillValidForm();
        await forgotPasswordPage.submit();

        await forgotPasswordPage.expectEmailSendError();
        await forgotPasswordPage.expectFormVisible();
    });

    test('should not submit empty form', async ({page}) => {
        let requestWasSent = false;

        await page.route('**/auth/forgot-password', route => {
            if (route.request().method() !== 'POST') {
                return route.continue();
            }

            requestWasSent = true;

            return route.fulfill({
                status: 500
            });
        });

        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();
        await forgotPasswordPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL('/auth/forgot-password');
        await forgotPasswordPage.expectFormVisible();
    });

    test('should navigate to login page', async ({page}) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();
        await forgotPasswordPage.goToLogin();

        await expect(page).toHaveURL('/auth/login');
    });

    test('should return to email form after clicking enter another email', async ({
        page
    }) => {
        await mockForgotPasswordSuccess(page);

        const forgotPasswordPage = new ForgotPasswordPage(page);

        await forgotPasswordPage.open();
        await forgotPasswordPage.fillValidForm();
        await forgotPasswordPage.submit();

        await forgotPasswordPage.expectEmailSent();

        await forgotPasswordPage.enterAnotherEmail();

        await forgotPasswordPage.expectOpened();
        await forgotPasswordPage.expectFormVisible();
    });
});
