import {Page} from '@playwright/test';

export const mockUser = {
    id: 'test-user-id',
    login: 'test-user',
    email: 'test-user@example.com',
    firstName: null,
    lastName: null,
    avatarUrl: null,
    position: null,
    about: null,
    emailVerifiedAt: null,
    theme: 'LIGHT',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    emailTwoFactorEnabled: false
};

export async function mockCreateAccount(page: Page) {
    await page.route('**/auth/create-account', route => {
        if (route.request().method() !== 'POST') {
            return route.continue();
        }
        return route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify(mockUser)
        });
    });
}

export async function mockSuccessfulLogin(page: Page) {
    await page.route('**/auth/login', route => {
        if (route.request().method() !== 'POST') {
            return route.continue();
        }
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUser)
        });
    });
}

export async function mockCreateAccountError(page: Page) {
    await page.route('**/auth/create-account', route => {
        if (route.request().method() !== 'POST') {
            return route.continue();
        }
        return route.fulfill({
            status: 409,
            contentType: 'application/json',
            body: JSON.stringify({
                statusCode: 409,
                message:
                    'Пользователь с таким email или логином уже существует',
                error: 'Conflict'
            })
        });
    });
}

export async function mockLoginError(page: Page) {
    await page.route('**/auth/login', route => {
        if (route.request().method() !== 'POST') {
            return route.continue();
        }
        return route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                statusCode: 401,
                message: 'Неверный логин или пароль',
                error: 'Unauthorized'
            })
        });
    });
}

export async function mockCurrentUser(page: Page) {
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

export async function mockTwoFactorLogin(page: Page) {
    await page.route('**/auth/login', route => {
        if (route.request().method() !== 'POST') {
            return route.continue();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                twoFactorRequired: true,
                challengeId: 'test-challenge-id',
                email: 'test-user@example.com'
            })
        });
    });
}

export async function mockVerifyEmailTwoFactor(page: Page) {
    await page.route('**/auth/two-factor/email/verify', route => {
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUser)
        });
    });
}

export async function mockVerifyEmailTwoFactorError(page: Page) {
    await page.route('**/auth/two-factor/email/verify', route => {
        return route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                statusCode: 401,
                message: 'Неверный код подтверждения',
                error: 'Unauthorized'
            })
        });
    });
}

export async function mockForgotPasswordSuccess(page: Page) {
    await page.route('**/password-reset/request', route => {
        return route.fulfill({
            status: 204
        });
    });
}

export async function mockForgotPasswordError(page: Page) {
    await page.route('**/password-reset/request', route => {
        return route.fulfill({
            status: 500,
            body: ''
        });
    });
}

export async function mockResetPasswordSuccess(page: Page) {
    await page.route('**/password-reset/confirm', route => {
        return route.fulfill({
            status: 204
        });
    });
}

export async function mockResetPasswordError(page: Page) {
    await page.route('**/password-reset/confirm', route => {
        return route.fulfill({
            status: 400,
            body: ''
        });
    });
}
