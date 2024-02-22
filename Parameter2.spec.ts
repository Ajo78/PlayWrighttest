import { test, expect } from '@playwright/test';

const computerData =
[
	{
	name: "Comp A",
	Manu: "Tandy Corporation"
	},
	{
	name: "Comp B",
	Manu: "Nokia"
	},
	{
	name: "Comp C",
	Manu: "Sony"
	},
	{
	name: "Comp D",
	Manu: "IBM"
	},
	{
	name: "Comp E",
	Manu: "Lincoln Labratory"
	},
]

test('test', async ({ page }) => {

await page.goto('https://computer-database.gatling.io/computers');
await page.getByRole('link', { name: 'Add a new computer' }).click();
await page.getByLabel('Computer name').click();
await page.getByLabel('Computer name').fill('ABBA');
//await page.getByLabel('Company').selectOption('17');
await page.selectOption("#company", {
    label: "Apple Inc."
} );

await page.getByRole('button', { name: 'Create this computer' }).click();

await expect(page.locator('div.alert-message.warning')).toContainText('Done');

});