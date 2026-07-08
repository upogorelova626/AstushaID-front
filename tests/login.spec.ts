import {test, expect} from '@playwright/test';
import {
    mockCurrentUser,
    mockLoginError,
    mockSuccessfulLogin,
    mockTwoFactorLogin
} from './mocks/auth.mocks';
import {LoginPage} from './pages/login.page';

test.describe('Login', () => {
    test('opens login page', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.expectOpened();
    });

    test('logs in successfully', async ({page}) => {
        await mockSuccessfulLogin(page);
        await mockCurrentUser(page);

        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.fillValidForm();
        await loginPage.submit();

        await expect(page).toHaveURL('/account/profile');
    });

    test('shows alert when login failed', async ({page}) => {
        await mockLoginError(page);

        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.fillValidForm();
        await loginPage.submit();

        await loginPage.expectLoginError();

        await expect(page).toHaveURL('/auth/login');
    });

    test('does not submit empty form', async ({page}) => {
        let requestWasSent = false;

        await page.route('**/auth/login', route => {
            if (route.request().method() !== 'POST') {
                return route.continue();
            }
            requestWasSent = true;

            return route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL('/auth/login');
    });

    test('redirect to two-factor page when 2Fa is required', async ({page}) => {
        await mockTwoFactorLogin(page);

        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.fillValidForm();
        await loginPage.submit();

        await expect(page).toHaveURL('auth/two-factor');

        const challengeId = await page.evaluate(() =>
            sessionStorage.getItem('emailTwoFactorChallengeId')
        );

        const email = await page.evaluate(() =>
            sessionStorage.getItem('emailTwoFactorEmail')
        );

        expect(challengeId).toBe('test-challenge-id');
        expect(email).toBe('test-user@example.com');
    });

    test('should navigate to forgot password page', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.goToForgotPassword();

        await expect(page).toHaveURL('/auth/forgot-password');
    });

    test('should navigate to create account page', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.goToCreateAccount();

        await expect(page).toHaveURL('/auth/create-account');
    });
});
