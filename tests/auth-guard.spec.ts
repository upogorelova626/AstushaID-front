import {expect, test} from '@playwright/test';
import {mockCurrentUser} from './mocks/auth.mocks';

test.describe('Auth guards', () => {
    test('should allow authorized user to open profile page', async ({
        page
    }) => {
        await mockCurrentUser(page);

        await page.goto('/account/profile');
        await expect(page).toHaveURL('/account/profile');
        await expect(page.getByText('Основная информация')).toBeVisible();
    });
});
