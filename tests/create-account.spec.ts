import {expect, test} from '@playwright/test';
import {
    mockCreateAccount,
    mockCreateAccountError,
    mockCurrentUser
} from './mocks/auth.mocks';
import {CreateAccountPage} from './pages/create-account.page';

test.describe('Create account', () => {
    test('should open create account page', async ({page}) => {
        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();

        await createAccountPage.expectOpened();
    });

    test('should create account successfully', async ({page}) => {
        await mockCreateAccount(page);
        await mockCurrentUser(page);

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillValidForm();
        await createAccountPage.submit();

        await expect(page).toHaveURL('/account/profile');
    });

    test('should show alert when create account failed', async ({page}) => {
        await mockCreateAccountError(page);

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillValidForm();
        await createAccountPage.submit();

        await createAccountPage.expectCreateAccountError();

        await expect(page).toHaveURL('/auth/create-account');
    });

    test('should not submit empty form', async ({page}) => {
        let requestWasSent = false;

        await page.route('**/auth/create-account', route => {
            if (route.request().method() !== 'POST') {
                return route.continue();
            }

            requestWasSent = true;

            return route.fulfill({
                status: 500
            });
        });

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL('/auth/create-account');
    });

    test('should navigate to login page', async ({page}) => {
        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.goToLogin();

        await expect(page).toHaveURL('/auth/login');
    });

    test('should not submit form when passwords do not match', async ({
        page
    }) => {
        let requestWasSent = false;

        await page.route('**/auth/create-account', route => {
            if (route.request().method() !== 'POST') {
                return route.continue();
            }

            requestWasSent = true;

            return route.fulfill({
                status: 500
            });
        });

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillInvalidForm();
        await createAccountPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL('/auth/create-account');
    });

    test('should not submit form without agreement checkbox', async ({
        page
    }) => {
        let requestWasSent = false;

        await page.route('**/auth/create-account', route => {
            if (route.request().method() !== 'POST') {
                return route.continue();
            }

            requestWasSent = true;

            return route.fulfill({
                status: 500
            });
        });

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillFormWithoutCheckbox();
        await createAccountPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL('/auth/create-account');
    });
});
