import {Page} from '@playwright/test';

import {mockUser} from './user.mocks';

export const mockUserWithTwoFactorDisabled = {
    ...mockUser,
    emailTwoFactorEnabled: false
};

export const mockUserWithTwoFactorEnabled = {
    ...mockUser,
    emailTwoFactorEnabled: true
};

export async function mockCurrentUserWithTwoFactorDisabled(page: Page) {
    await page.route('**/users/me', route => {
        if (route.request().method() !== 'GET') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserWithTwoFactorDisabled)
        });
    });
}

export async function mockCurrentUserWithTwoFactorEnabled(page: Page) {
    await page.route('**/users/me', route => {
        if (route.request().method() !== 'GET') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserWithTwoFactorEnabled)
        });
    });
}

export async function mockEnableTwoFactorSuccess(page: Page) {
    await page.route('**/users/me/two-factor/email', route => {
        if (route.request().method() !== 'PATCH') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserWithTwoFactorEnabled)
        });
    });
}

export async function mockDisableTwoFactorSuccess(page: Page) {
    await page.route('**/users/me/two-factor/email', route => {
        if (route.request().method() !== 'PATCH') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserWithTwoFactorDisabled)
        });
    });
}

export async function mockUpdateTwoFactorError(page: Page) {
    await page.route('**/users/me/two-factor/email', route => {
        if (route.request().method() !== 'PATCH') {
            return route.fallback();
        }

        return route.fulfill({status: 400});
    });
}
