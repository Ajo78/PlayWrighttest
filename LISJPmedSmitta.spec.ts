import { test, expect } from '@playwright/test';
//export let Var1 = '191212121212';
import { P12 } from "./helper.ts";

//const people = ['19121212-1212', '19580805-2384'];

test('test', async ({ page, }) => {

  //Logga in med personnummer
  await page.goto('https://wc2.webcert-devtest.intyg.nordicmedtest.se/welcome');
  await page.getByText('Logga in som fristående').click();
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByPlaceholder('ååååmmdd-nnnn').click();
  await page.getByPlaceholder('ååååmmdd-nnnn').fill(P12);
  await page.getByLabel('Fortsätt').click();

  // Verifiera exakt tooltip på byta patientknappen
  //await page.getByLabel('Byt patient').hover();
  //await expect(page.getByRole('tooltip', { name: 'Byt patient att skriva och söka intyg för.' },)).toBeVisible();

  // Verifiera exakt tooltip på skapa utkast knappen
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').hover();
  await expect(page.getByRole('tooltip', { name: 'Skapa ett intygsutkast.' })).toBeVisible();

  //Välj ett lisp 
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').click();

  //spara intygsid:et i en variabel

  //Fyll i intyget och signera/skicka
  await page.getByText('Avstängning enligt smittskyddslagen på grund av smitta. (Fortsätt till frågorna').click();
  await page.getByText('ICD-10-SE').click();
  await page.getByTestId('diagnoser[0].row-code').click();
  await page.getByTestId('diagnoser[0].row-code').fill('j22');
  await page.getByTestId('diagnoser[0].row-code-list-option-0').click();
  await page.getByText('25 procent').click();
  await page.locator('div').filter({ hasText: /^25 procentFr\.o\.mt\.o\.m$/ }).getByLabel('Öppna kalendern').nth(1).click();
  await page.getByTestId('tomEN_FJARDEDEL').click();
  await page.getByTestId('tomEN_FJARDEDEL').fill('m3');
  await page.getByTestId('tomEN_FJARDEDEL').press('Enter');
  await page.getByTestId('sign-certificate-button').click();
  await page.getByTestId('send-certificate-button').click();
  await page.getByTestId('modal-buttons').getByLabel('Skicka till Försäkringskassan').click();

  //Verifiera att rätt knappar är synliga på ett skickat
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toBeVisible();

  //makulera intyget
  await page.getByTestId('revoke-certificate-button').click();

  await page.getByText('Intyget har utfärdats').click();
  //await page.getByText('Annat allvarligt fel').click();
  //await page.getByRole('textbox').click();
  //await page.getByRole('textbox').fill('Patienten har hicka');
  await page.getByTestId('modal-buttons').getByLabel('Makulera').click();

  //Verifiera att rätt knappar är synliga på ett makulerat intyg
  await expect(page.getByRole('button', { name: 'Intyget är makulerat', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();

  //Verifiera att rätt knappar inte är synliga
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toHaveCount(0);
});