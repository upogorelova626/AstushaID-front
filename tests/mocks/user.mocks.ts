import {Page} from '@playwright/test';

export const mockUser = {
    id: 'test-user-id',
    login: 'test-user',
    email: 'test-user@example.com',
    firstName: 'Ангуляр',
    lastName: 'Плейврайтов',
    avatarUrl: null,
    position: 'Реактор',
    about: 'Грею обсерваблы',
    emailVerifiedAt: null,
    theme: 'LIGHT',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    emailTwoFactorEnabled: false
};

export async function mockCurrentUserAuthorized(page: Page) {
    await page.route('**/users/me', route => {
        if (route.request().method() !== 'GET') {
            return route.continue();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUser)
        });
    });
}
