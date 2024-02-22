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
  await page.getByLabel('Byt patient').hover();
  await expect(page.getByRole('tooltip', { name: 'Byt patient att skriva och söka intyg för.', exact: true },)).toBeVisible();

  // Verifiera exakt tooltip på skapa utkast knappen
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').hover();
  await expect(page.getByRole('tooltip', { name: 'Skapa ett intygsutkast.' })).toBeVisible();

  //Välj ett lisp 
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').click();

  //spara intygsid:et i en variabel, får bli en senare funktion


  //Fyll i intyget och signera/skicka
  await page.getByText('min undersökning av patienten').click();
  await page.getByText('Nuvarande arbete', { exact: true }).click();
  await page.getByTestId('textarea-29').click();
  await page.getByTestId('textarea-29').fill('Läkare');
  await page.getByTestId('diagnoser[0].row-code').click();
  await page.getByTestId('diagnoser[0].row-code').fill('J20');
  await page.getByTestId('diagnoser[0].row-code-list-option-0').click();
  await page.locator('textarea[name="funktionsnedsattning"]').click();
  await page.locator('textarea[name="funktionsnedsattning"]').fill('Funk');
  await page.locator('#aktivitetsbegransning').click();
  await page.locator('#aktivitetsbegransning').fill('Aktiv');
  await page.getByTestId('textarea-19').click();
  await page.getByTestId('textarea-19').fill('Medbeh');
  await page.getByTestId('textarea-20').click();
  await page.getByTestId('textarea-20').fill('Pla med');
  await page.getByText('25 procent').click();
  await page.getByTestId('tomEN_FJARDEDEL').click();
  await page.getByTestId('tomEN_FJARDEDEL').fill('m1');
  await page.getByTestId('tomEN_FJARDEDEL').press('Enter');
  await page.getByTestId('textarea-37').click();
  await page.getByTestId('textarea-37').fill('Pat arb');
  await page.getByText('Nej', { exact: true }).click();
  await page.getByText('Patienten förväntas kunna återgå helt i nuvarande sysselsättning inom').click();
  await page.getByLabel('', { exact: true }).selectOption('HUNDRAATTIO_DAGAR');
  await page.getByText('Arbetsträning').click();
  await page.getByTestId('textarea-44').click();
  await page.getByTestId('textarea-44').fill('Åtgärd');
  await page.getByTestId('textarea-25').click();
  await page.getByTestId('textarea-25').fill('Övriga upp');
  await page.getByText('Jag önskar att Försä').click();
  await page.getByTestId('textarea-26.2').click();
  await page.getByTestId('textarea-26.2').fill('Kontakt');
  await page.getByTestId('sign-certificate-button').click();

  //Verifiera att rätt knappar är synliga på ett signerat
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toBeVisible();

  await page.getByTestId('send-certificate-button').click();
  await page.getByTestId('modal-buttons').getByLabel('Skicka till Försäkringskassan').click();

  //Ärendekommunikation

  await page.getByLabel('Administrativa frågor').click();

  await page.getByLabel('', { exact: true }).selectOption('COORDINATION');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('AVS');
  await page.getByTestId('question-send-btn').click();

  await page.getByLabel('', { exact: true }).selectOption('CONTACT');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('Kon');
  await page.getByTestId('question-send-btn').click();

  await page.getByLabel('', { exact: true }).selectOption('OTHER');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('Övr');
  await page.getByTestId('question-send-btn').click();


  //Verifiera att rätt knappar är synliga på ett skickat
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toBeVisible();
  //Verifiera att rätt knappar inte är synliga
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toHaveCount(0);


  //makulera intyget
  await page.getByTestId('revoke-certificate-button').click();
  await page.getByText('Annat allvarligt fel').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').fill('Patienten har hicka');
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
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toHaveCount(0);



});

test('test2', async ({ page, }) => {
  
  //Logga in med personnummer
  await page.goto('https://wc2.webcert-devtest.intyg.nordicmedtest.se/welcome');
  await page.getByText('Logga in som fristående').click();
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByPlaceholder('ååååmmdd-nnnn').click();
  await page.getByPlaceholder('ååååmmdd-nnnn').fill(P12);
  await page.getByLabel('Fortsätt').click();

  // Verifiera exakt tooltip på byta patientknappen
  await page.getByLabel('Byt patient').hover();
  await expect(page.getByRole('tooltip', { name: 'Byt patient att skriva och söka intyg för.', exact: true },)).toBeVisible();

  // Verifiera exakt tooltip på skapa utkast knappen
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').hover();
  await expect(page.getByRole('tooltip', { name: 'Skapa ett intygsutkast.' })).toBeVisible();

  //Välj ett lisp 
  await page.locator('div:nth-child(4) > div > .sc-gEvEer > .sc-eqUAAy').click();

  //spara intygsid:et i en variabel, får bli en senare funktion


  //Fyll i intyget och signera/skicka
  await page.getByText('min undersökning av patienten').click();
  await page.getByText('Nuvarande arbete', { exact: true }).click();
  await page.getByTestId('textarea-29').click();
  await page.getByTestId('textarea-29').fill('Läkare');
  await page.getByTestId('diagnoser[0].row-code').click();
  await page.getByTestId('diagnoser[0].row-code').fill('J20');
  await page.getByTestId('diagnoser[0].row-code-list-option-0').click();
  await page.locator('textarea[name="funktionsnedsattning"]').click();
  await page.locator('textarea[name="funktionsnedsattning"]').fill('Funk');
  await page.locator('#aktivitetsbegransning').click();
  await page.locator('#aktivitetsbegransning').fill('Aktiv');
  await page.getByTestId('textarea-19').click();
  await page.getByTestId('textarea-19').fill('Medbeh');
  await page.getByTestId('textarea-20').click();
  await page.getByTestId('textarea-20').fill('Pla med');
  await page.getByText('25 procent').click();
  await page.getByTestId('tomEN_FJARDEDEL').click();
  await page.getByTestId('tomEN_FJARDEDEL').fill('m1');
  await page.getByTestId('tomEN_FJARDEDEL').press('Enter');
  await page.getByTestId('textarea-37').click();
  await page.getByTestId('textarea-37').fill('Pat arb');
  await page.getByText('Nej', { exact: true }).click();
  await page.getByText('Patienten förväntas kunna återgå helt i nuvarande sysselsättning inom').click();
  await page.getByLabel('', { exact: true }).selectOption('HUNDRAATTIO_DAGAR');
  await page.getByText('Arbetsträning').click();
  await page.getByTestId('textarea-44').click();
  await page.getByTestId('textarea-44').fill('Åtgärd');
  await page.getByTestId('textarea-25').click();
  await page.getByTestId('textarea-25').fill('Övriga upp');
  await page.getByText('Jag önskar att Försä').click();
  await page.getByTestId('textarea-26.2').click();
  await page.getByTestId('textarea-26.2').fill('Kontakt');
  await page.getByTestId('sign-certificate-button').click();

  //Verifiera att rätt knappar är synliga på ett signerat
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toBeVisible();

  await page.getByTestId('send-certificate-button').click();
  await page.getByTestId('modal-buttons').getByLabel('Skicka till Försäkringskassan').click();

  //Ärendekommunikation

  await page.getByLabel('Administrativa frågor').click();

  await page.getByLabel('', { exact: true }).selectOption('COORDINATION');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('AVS');
  await page.getByTestId('question-send-btn').click();

  await page.getByLabel('', { exact: true }).selectOption('CONTACT');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('Kon');
  await page.getByTestId('question-send-btn').click();

  await page.getByLabel('', { exact: true }).selectOption('OTHER');
  await page.getByTestId('question-textarea').click();
  await page.getByTestId('question-textarea').fill('Övr');
  await page.getByTestId('question-send-btn').click();


  //Verifiera att rätt knappar är synliga på ett skickat
  await expect(page.getByRole('button', { name: 'Tillbaka', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skapa AG7804', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skriv ut', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Förnya', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ersätt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Makulera', exact: true })).toBeVisible();
  //Verifiera att rätt knappar inte är synliga
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toHaveCount(0);


  //makulera intyget
  await page.getByTestId('revoke-certificate-button').click();
  await page.getByText('Annat allvarligt fel').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').click();
  await page.getByTestId('modal-backdrop').getByRole('textbox').fill('Patienten har hicka');
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
  await expect(page.getByRole('button', { name: 'Skicka till Försäkringskassan', exact: true })).toHaveCount(0);



});