import {expect, test} from '@playwright/test';
import {mockCurrentUser, mockCurrentUserUnauthorized} from './mocks/auth.mocks';

test.describe('Auth guards', () => {
    test('should redirect guest from profile page to login page', async ({
        page
    }) => {
        await mockCurrentUserUnauthorized(page);

        await page.goto('/account/profile');
        await expect(
            page.getByRole('heading', {name: 'Вход в аккаунт'})
        ).toBeVisible();
    });

    test('should allow authorized user to open profile page', async ({
        page
    }) => {
        await mockCurrentUser(page);

        await page.goto('/account/profile');
        await expect(page).toHaveURL('/account/profile');
        await expect(page.getByText('Основная информация')).toBeVisible();
    });
});
