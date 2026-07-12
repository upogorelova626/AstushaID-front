import {test} from '@playwright/test';
import {
    mockCurrentUserAuthorized,
    mockUpdateProfileSuccess,
    mockUpdateProfileError
} from './mocks/user.mocks';
import {SettingsPage} from './pages/settings.page';

test.describe('settings', () => {
    test('should show current user settings', async ({page}) => {
        await mockCurrentUserAuthorized(page);

        const settingsPage = new SettingsPage(page);

        await settingsPage.open();

        await settingsPage.expectCurrentUserSettingsVisible();
    });
    test('should update profile successfully', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUpdateProfileSuccess(page);

        const settingsPage = new SettingsPage(page);

        await settingsPage.open();
        await settingsPage.startEditing();

        await settingsPage.fillValidProfileForm();
        await settingsPage.saveChanges();

        await settingsPage.expectUpdatedProfileValues();
        await settingsPage.expectProfileUpdateSuccess();
    });
    test('should restore original profile values after cancelling', async ({
        page
    }) => {
        await mockCurrentUserAuthorized(page);
        await mockUpdateProfileSuccess(page);

        const settingsPage = new SettingsPage(page);

        await settingsPage.open();
        await settingsPage.startEditing();
        await settingsPage.fillValidProfileForm();
        await settingsPage.cancelChanges();
        await settingsPage.expectOriginalProfileValues();
    });
    test('should show alert when profile update fails', async ({page}) => {
        await mockCurrentUserAuthorized(page);
        await mockUpdateProfileError(page);

        const settingsPage = new SettingsPage(page);

        await settingsPage.open();
        await settingsPage.editButton.click();
        await settingsPage.fillValidProfileForm();

        await settingsPage.saveChanges();
        await settingsPage.expectProfileUpdateError();
    });
});
