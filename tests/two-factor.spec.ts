import {expect, test} from '@playwright/test';
import {
    mockCurrentUser,
    mockVerifyEmailTwoFactor,
    mockVerifyEmailTwoFactorError
} from './mocks/auth.mocks';
import {TwoFactorPage} from './pages/two-factor.page';

test.describe('Two-factor authentication', () => {
    test('opens two-factor page', async ({page}) => {
        const twoFactorPage = new TwoFactorPage(page);

        await twoFactorPage.openWithChallenge();

        await twoFactorPage.expectOpened();
    });

    test('verifies email two-factor code successfully', async ({page}) => {
        await mockVerifyEmailTwoFactor(page);
        await mockCurrentUser(page);

        const twoFactorPage = new TwoFactorPage(page);

        await twoFactorPage.openWithChallenge();
        await twoFactorPage.fillValidCode();
        await twoFactorPage.submit();

        await expect(page).toHaveURL('/account/profile');
    });

    test('shows alert when two-factor verification failed', async ({page}) => {
        await mockVerifyEmailTwoFactorError(page);

        const twoFactorPage = new TwoFactorPage(page);

        await twoFactorPage.openWithChallenge();
        await twoFactorPage.fillValidCode();
        await twoFactorPage.submit();

        await twoFactorPage.expectVerifyError();

        await expect(page).toHaveURL('/auth/two-factor');
    });

    test('navigates back to login page', async ({page}) => {
        const twoFactorPage = new TwoFactorPage(page);

        await twoFactorPage.openWithChallenge();
        await twoFactorPage.goBackToLogin();

        await expect(page).toHaveURL('/auth/login');
    });
});
