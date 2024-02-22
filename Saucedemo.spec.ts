import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
test.slow();

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce2');
  await page.locator('[data-test="login-button"]').click();

  //Testar att man får fram rätt meddelande.
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();  

  // testar att man kan logga in
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click(); 

  //veriferar att sorteringsknappen fungerar

  await page.locator('[data-test="product_sort_container"]').selectOption('lohi');

  //Lägger 3 varor i varukorgen
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
  await page.locator('[id="add-to-cart-sauce-labs-onesie"]').click();

  // verifierar att man har rätt antal object och checkar ut
  await page.locator('a').filter({ hasText: '3' }).click();
  await page.locator('[data-test="checkout"]').click();

  //Fyller i namn och adress och går vidare
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Anders');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Johansson');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('65464');
  await page.locator('[data-test="continue"]').click();

  //Verifierar att summan av artiklarna är rätt 
  await expect(page.getByText('Total: $58.29')).toBeVisible();
  
  //Avslutar och går tillbaka
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
});