import {Page} from '@playwright/test';

export async function mockDeleteAccountSuccess(page: Page) {
    await page.route('**/users/me', route => {
        if (route.request().method() !== 'DELETE') {
            return route.fallback();
        }

        return route.fulfill({status: 200});
    });
}

export async function mockDeleteAccountFailed(page: Page) {
    await page.route('**/users/me', route => {
        if (route.request().method() !== 'DELETE') {
            return route.fallback();
        }

        return route.fulfill({status: 400});
    });
}
