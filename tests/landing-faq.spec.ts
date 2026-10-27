import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://www.lightmenu.app/');
});

test('FAQ answers are visible', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Questions' }).click();
  await expect(page.getByRole('heading', { name: 'Les questions que les' }).first()).toBeVisible();
  await expect(page.getByText('Des réponses directes. Si la').first()).toBeVisible();
  await expect(page.getByText('avant que vous demandiez').first()).toBeVisible();

  await expect(page.getByText('Dois-je remplacer ce que j\'utilise aujourd\'hui ?Non. Commencez par la carte num').first()).toBeVisible();
  await expect(page.getByText('Que se passe-t-il vraiment quand internet tombe ?Le service continue. LightMenu').first()).toBeVisible();
  await expect(page.getByText('Est-ce que ça marchera avec mon imprimante ?Si c\'est une imprimante thermique').first()).toBeVisible();
  await expect(page.getByText('Mon équipe doit-elle installer quelque chose ?Non. Chacun reçoit son propre').first()).toBeVisible();
  await expect(page.getByText('Combien ça coûte une fois tout en place ?Le prix de l\'abonnement, rien d\'autre').first()).toBeVisible();
  await expect(page.getByText('Et si je veux partir ?Vous ré').first()).toBeVisible();
  await expect(page.getByText('Qui l\'installe, et combien de temps ça prend vraiment ?Vous, en une vingtaine').first()).toBeVisible();

});