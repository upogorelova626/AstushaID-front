import {Page} from '@playwright/test';

export class NotFoundPage {
    constructor(private readonly page: Page) {}

    get goBackButton() {
        return this.page.getByRole('button', {name: 'Вернуться назад'});
    }

    get goToMainButton() {
        return this.page.getByRole('button', {name: 'На главную'});
    }
}
