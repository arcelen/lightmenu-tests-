import { Page } from '@playwright/test';

export class SauceInventoryPage {
    constructor(private page: Page) {}

    async addItemToCart(itemDataTest: String) {
        await this.page.locator(`[data-test="${itemDataTest}"]`).click();
    }

    async goToCart(){
        await this.page.locator('.shopping_cart_link').click();
    }

    async getCartCount() {
        return this.page.locator('.shopping_cart_badge').textContent();
    }
}