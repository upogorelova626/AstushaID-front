import {Page} from '@playwright/test';

export async function mockChangePasswordSuccess(page: Page) {
    await page.route('**/users/me/password', route => {
        return route.fulfill({status: 200});
    });
}

export async function mockChangePasswordFailed(page: Page) {
    await page.route('**/users/me/password', route => {
        return route.fulfill({status: 400});
    });
}
