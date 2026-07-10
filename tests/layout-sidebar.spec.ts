import {expect, test} from '@playwright/test';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {LayoutSidebar} from './pages/layout-sidebar.page';

test.describe('Layout sidebar', () => {
    test('should navigate to profile page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/settings');
        const sidebar = new LayoutSidebar(page);

        await sidebar.goToProfile();
        await expect(page).toHaveURL('/account/profile');
    });

    test('should navigate to settings page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.goToSettings();
        await expect(page).toHaveURL('/account/settings');
    });

    test('should navigate to security page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.goToSecurity();
        await expect(page).toHaveURL('/account/security');
    });

    test('should navigate to applications page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.goToApplications();
        await expect(page).toHaveURL('/account/applications');
    });

    test('should navigate to notifications page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.goToNotifications();
        await expect(page).toHaveURL('/account/notifications');
    });

    test('should open help dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.openHelpDialog();
        await sidebar.expectHelpDialogVisible();
    });

    test('should logout and navigate to login page', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await page.goto('/account/profile');
        const sidebar = new LayoutSidebar(page);

        await sidebar.logout();
        await expect(page).toHaveURL('/auth/login');
    });
});
