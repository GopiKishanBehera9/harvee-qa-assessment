exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('.product_sort_container');
    this.inventoryPrices = page.locator('.inventory_item_price');
    this.addBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
    this.addBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.removeBackpack = page.locator('#remove-sauce-labs-backpack');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices() {
    const priceTexts = await this.inventoryPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async addFirstTwoItemsToCart() {
    await this.addBackpack.click();
    await this.addBikeLight.click();
  }

  async removeFirstItemFromCart() {
    await this.removeBackpack.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
};