import {Page} from '@playwright/test';

export const mockUserSessions = [
    {
        id: 'b8f6b9d5-0299-403c-8133-bb40f53a642c',
        device: 'Windows · Chrome',
        icon: '@tui.monitor',
        ipAddress: '::1',
        isCurrent: true,
        location: 'Неизвестно',
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/147.0.0.0 Safari/537.36',
        createdAt: '2026-07-12T05:11:28.417Z',
        lastActiveAt: '2026-07-12T05:11:28.414Z'
    },
    {
        id: '1d58367c-2587-4811-a984-a592692cf852',
        device: 'iPhone · Safari',
        icon: '@tui.smartphone',
        ipAddress: '192.168.1.15',
        isCurrent: false,
        location: 'Неизвестно',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) ' +
            'AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
        createdAt: '2026-07-11T18:30:00.000Z',
        lastActiveAt: '2026-07-12T04:45:00.000Z'
    }
];

export async function mockUserSessionsSuccess(page: Page) {
    await page.route('**/users/me/sessions', route => {
        if (route.request().method() !== 'GET') {
            return route.fallback();
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserSessions)
        });
    });
}

export async function mockTerminateSessionSuccess(page: Page) {
    await page.route(
        `**/users/me/sessions/${mockUserSessions[1].id}`,
        route => {
            if (route.request().method() !== 'DELETE') {
                return route.fallback();
            }

            return route.fulfill({
                status: 200
            });
        }
    );
}

export async function mockTerminateSessionError(page: Page) {
    await page.route(
        `**/users/me/sessions/${mockUserSessions[1].id}`,
        route => {
            if (route.request().method() !== 'DELETE') {
                return route.fallback();
            }

            return route.fulfill({
                status: 400
            });
        }
    );
}
