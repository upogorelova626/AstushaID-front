import {expect, test} from '@playwright/test';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {NotFoundPage} from './pages/not-found.page';

test.describe('Not found page', () => {
    test('should show not found page for unknown route', async ({page}) => {
        const notFoundPage = new NotFoundPage(page);

        await page.goto('/unknown-route');

        await expect(page.getByText('Страница не найдена')).toBeVisible();
        await expect(notFoundPage.goBackButton).toBeVisible();
        await expect(notFoundPage.goToMainButton).toBeVisible();
        await expect(page).toHaveURL('/unknown-route');
    });

    test('should show not found page for authorized user', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const notFoundPage = new NotFoundPage(page);
        await page.goto('/unknown-route');

        await expect(page.getByText('Страница не найдена')).toBeVisible();
        await expect(notFoundPage.goBackButton).toBeVisible();
        await expect(notFoundPage.goToMainButton).toBeVisible();
        await expect(page).toHaveURL('/unknown-route');
    });

    test('should show not found page for unauthorized user', async ({page}) => {
        const notFoundPage = new NotFoundPage(page);
        await page.goto('/unknown-route');

        await expect(page.getByText('Страница не найдена')).toBeVisible();
        await expect(notFoundPage.goBackButton).toBeVisible();
        await expect(notFoundPage.goToMainButton).toBeVisible();
        await expect(page).toHaveURL('/unknown-route');
    });

    test('should navigate from not found page to profile page', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);

        const notFoundPage = new NotFoundPage(page);

        await page.goto('/unknown-route');
        await notFoundPage.goToMainButton.click();
        await expect(page).toHaveURL('/account/profile');
    });

    test('should navigate authorized user back to previous page', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);

        const notFoundPage = new NotFoundPage(page);

        await page.goto('/account/profile');
        await page.goto('/unknown-route');
        await notFoundPage.goBackButton.click();
        await expect(page).toHaveURL('/account/profile');
    });

    test('should navigate unauthorized user back to previous page', async ({
        page
    }) => {
        const notFoundPage = new NotFoundPage(page);

        await page.goto('/auth/login');
        await page.goto('/unknown-route');
        await notFoundPage.goBackButton.click();
        await expect(page).toHaveURL('/auth/login');
    });
});
