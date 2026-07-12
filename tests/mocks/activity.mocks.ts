import {Page} from '@playwright/test';

export const mockUserActivity = [
    {
        id: '0cc2720a-11e6-4f2c-ba60-2e0cff919616',
        time: '2026-07-12T01:48:50.415Z',
        device: 'Windows · Chrome',
        action: 'LOGIN',
        actionLabel: 'Вход в аккаунт',
        location: 'Неизвестно',
        ipAddress: '::1'
    },
    {
        id: 'e756aef5-2794-436a-a390-f7524ff91d2f',
        time: '2026-07-12T01:48:20.879Z',
        device: 'Неизвестное устройство',
        action: 'SESSION_TERMINATED',
        actionLabel: 'Завершение сессии',
        location: 'Неизвестно',
        ipAddress: null
    },
    {
        id: '465ae794-2d01-475b-952c-14cf81a7823c',
        time: '2026-07-12T01:48:18.764Z',
        device: 'Windows · Chrome',
        action: 'PASSWORD_CHANGED',
        actionLabel: 'Изменение пароля',
        location: 'Неизвестно',
        ipAddress: '::1'
    },
    {
        id: '825213ad-d539-4cef-8b90-dd2a678b7979',
        time: '2026-07-12T00:53:41.010Z',
        device: 'Windows · Chrome',
        action: 'TWO_FACTOR_DISABLED',
        actionLabel: 'Отключение двухфакторной аутентификации',
        location: 'Неизвестно',
        ipAddress: '::1'
    },
    {
        id: '93011bf8-596b-4ccd-a832-b8ab0d4ecbc9',
        time: '2026-07-11T07:46:22.724Z',
        device: 'Windows · Chrome',
        action: 'TWO_FACTOR_ENABLED',
        actionLabel: 'Включение двухфакторной аутентификации',
        location: 'Неизвестно',
        ipAddress: '::1'
    }
];

export async function mockUserActivitySuccess(page: Page) {
    await page.route('**/users/me/activity', route => {
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockUserActivity)
        });
    });
}
