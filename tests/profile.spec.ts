import {test} from '@playwright/test';
import {mockCurrentUserAuthorized} from './mocks/user.mocks';
import {ProfilePage} from './pages/profile.page';

test.describe('Profile', () => {
    test('should open profile page', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();

        await profilePage.expectOpened();
    });

    test('should show current user information', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();

        await profilePage.expectUserInfoVisible();
    });

    test('should show avatar fallback when user has no avatar', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();

        await profilePage.expectAvatarFallbackVisible();
    });

    // test('should show user avatar when avatarUrl is provided', async ({
    //     page
    // }) => {
    //     await mockCurrentUserAuthorized(page);

    //     const profilePage = new ProfilePage(page);

    //     await profilePage.open();
    //     await profilePage.expectAvatarVisible();
    // });

    test('should open change password dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();
        await profilePage.openChangePasswordDialog();
        await profilePage.expectChangePasswordDialogVisible();
    });

    test('should open two factor dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();
        await profilePage.openTwoFactorDialog();

        await profilePage.expectTwoFactorDialogVisible();
    });

    test('should open sessions dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();
        await profilePage.openSessionsDialog();
        await profilePage.expectSessionsDialogVisible();
    });

    test('should open delete account dialog', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();
        await profilePage.openDeleteAccountDialog();
        await profilePage.expectDeleteAccountDialogVisible();
    });
});
