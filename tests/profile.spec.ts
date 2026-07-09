import {test} from '@playwright/test';

import {mockCurrentUser} from './mocks/auth.mocks';
import {ProfilePage} from './pages/profile.page';

test.describe('Profile', () => {
    test('should open profile page', async ({page}) => {
        await mockCurrentUser(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();

        await profilePage.expectOpened();
    });

    test('should show current user information', async ({page}) => {
        await mockCurrentUser(page);

        const profilePage = new ProfilePage(page);

        await profilePage.open();

        await profilePage.expectUserInfoVisible();
    });
});
