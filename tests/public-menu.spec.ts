import { test, expect } from '@playwright/test';
import { PublicMenuPage } from '../pages/PublicMenuPage';

// Both restaurants belong to the test account. Reservations are a per-restaurant
// setting: El Sueño offers them, Vinitus is walk-in only.
const restaurants = [
  { slug: 'vinitus', name: 'VINITUS', takesReservations: false },
  { slug: 'restaurante-el-sueno', name: 'Restaurante El Sueño', takesReservations: true },
];

for (const { slug, name, takesReservations } of restaurants) {
  test.describe(`public page: ${slug}`, () => {
    let menu: PublicMenuPage;

    test.beforeEach(async ({ page }) => {
      menu = new PublicMenuPage(page);
      await menu.goto(slug);
    });

    test('shows the restaurant name', async () => {
      await expect(menu.restaurantName).toHaveText(name);
    });

    test('has an Our Menu section', async () => {
      await expect(menu.menuSection).toBeVisible();
    });

    test(takesReservations ? 'offers table reservations' : 'does not offer table reservations', async () => {
      // Wait for the page to render first: "not there" would otherwise pass
      // while the page is still loading.
      await expect(menu.menuSection).toBeVisible();
      if (takesReservations) {
        await expect(menu.reserveLink).toHaveAttribute('href', new RegExp(`/reservation/${slug}$`));
      } else {
        await expect(menu.reserveLink).toHaveCount(0);
      }
    });
  });
}

test('credits LightMenu with a tracked link', async ({ page }) => {
  const menu = new PublicMenuPage(page);
  await menu.goto('vinitus');
  await expect(menu.attributionLink).toHaveAttribute('href', /utm_campaign=menu_attribution/);
});

test('an unknown restaurant shows a not-found message', async ({ page }) => {
  const menu = new PublicMenuPage(page);
  await menu.goto('qa-no-such-restaurant-xyz');
  await expect(menu.notFoundMessage).toBeVisible();
});
