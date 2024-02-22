import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByLabel('Search Wikipedia').click();
  //await page.getByLabel('Search Wikipedia').fill('Manchester United');
  await page.getByLabel('Search Wikipedia').click();
  await page.getByLabel('Search Wikipedia').fill('Manchetster ');
  await page.getByRole('link', { name: 'Manchester United F.C.' }).click();

  //await page.getByLabel('Search Wikipedia').click();

  //await page.getByLabel('Search Wikipedia').click();
  //await page.getByLabel('Search Wikipedia').fill('man');
  //await page.getByRole('button', { name: 'Search' }).click();



});