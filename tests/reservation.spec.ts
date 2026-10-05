import { test, expect} from '@playwright/test';
import { ReservationPage } from '../pages/ReservationPage';

const SLUG = 'restaurante-el-sueno';

test.describe('reservation page',() => { let reservation: ReservationPage;
    test.beforeEach(async ({ page }) => {
        reservation = new ReservationPage(page);
        await reservation.goto(SLUG);
    });
    test ('shows the restaurant name', async() => {
        await expect(reservation.heading).toHaveText('Restaurante El Sueño');
    });

    test('has the booking form fields', async() => {
        await expect(reservation.firstNameInput).toBeVisible();
        await expect(reservation.surnameInput).toBeVisible();
        await expect(reservation.emailInput).toBeVisible();
        await expect(reservation.guestsInput).toBeVisible();
        

    });

    test('cannot confirm an empty form', async () => {
        await expect(reservation.confirmButton).toBeDisabled();
    });
});