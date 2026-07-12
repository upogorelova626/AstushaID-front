import {expect, Page} from '@playwright/test';

export class ApplicationsPage {
    constructor(private readonly page: Page) {}

    get title() {
        return this.page.getByText('Приложения Astusha');
    }

    get servicesCount() {
        return this.page.getByText('5 сервисов');
    }
}
