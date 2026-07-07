import test, {expect} from '@playwright/test';
import {mockCreateAccount, mockCreateAccountError} from './mocks/auth.mocks';
import {CreateAccountPage} from './pages/create-account.page';

test.describe('Create account', () => {
    test('opens create account page', async ({page}) => {
        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();

        await createAccountPage.expectOpened();
    });

    test('creates account successfully', async ({page}) => {
        await mockCreateAccount(page);

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillValidForm();
        await createAccountPage.submit();

        await expect(page).toHaveURL(/\/account\/profile/);
    });

    test('show alert when create account failed', async ({page}) => {
        await mockCreateAccountError(page);

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.fillValidForm();
        await createAccountPage.submit();

        await createAccountPage.expectCreateAccountError();

        await expect(page).toHaveURL(/\/auth\/create-account/);
    });

    test('does not submit empty form', async ({page}) => {
        let requestWasSent = false;

        await page.route('http://localhost:3002/auth/create-account', route => {
            requestWasSent = true;

            return route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({})
            });
        });

        const createAccountPage = new CreateAccountPage(page);

        await createAccountPage.open();
        await createAccountPage.submit();

        expect(requestWasSent).toBe(false);

        await expect(page).toHaveURL(/\/auth\/create-account/);
    });
});
