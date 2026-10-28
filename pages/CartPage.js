exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
};