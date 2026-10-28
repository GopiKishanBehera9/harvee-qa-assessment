const{test, expect} = require('@playwright/test');
const{LoginPage} = require('../pages/LoginPage');
const{ProductsPage} = require('../pages/ProductsPage');
const{CartPage} = require('../pages/CartPage');
const{CheckoutPage} = require('../pages/CheckoutPage');

test.describe('SauceDemo E2E & Business Rules Automation Suite', () => {

    test('TC01_Login_Validation', async({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC02_Sort_Products_Price_Low_High', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getProductPrices();
    
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

    test('TC03_Cart_Badge_And_Item_Removal', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstTwoItemsToCart();
    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.removeFirstItemFromCart();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('TC04_Full_Checkout_Flow_Calculations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstTwoItemsToCart();
    await productsPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingDetails('Gopi', 'Behera', '751024');
    await checkoutPage.finishCheckout();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  const missingFieldsData = [
    { firstName: '', lastName: 'Behera', postal: '751024', error: 'First Name is required' },
    { firstName: 'Gopi', lastName: '', postal: '751024', error: 'Last Name is required' },
    { firstName: 'Gopi', lastName: 'Behera', postal: '', error: 'Postal Code is required' },
  ];

  for (const data of missingFieldsData) {
    test(`TC05_Missing_Field_Validation: ${data.error}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await productsPage.addFirstTwoItemsToCart();
      await productsPage.openCart();
      await cartPage.proceedToCheckout();

      await checkoutPage.fillShippingDetails(data.firstName, data.lastName, data.postal);
      await expect(checkoutPage.errorMessage).toContainText(data.error);
    });
  }

  test('TC06_Direct_URL_Access_After_Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await productsPage.logout();
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    await expect(loginPage.errorMessage).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });


});