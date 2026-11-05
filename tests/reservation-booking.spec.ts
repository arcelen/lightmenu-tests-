import {test, expect} from '@playwright/test';
import {ReservationPage } from '../pages/ReservationPage';

const SLUG = '365-cafe';

test.describe('reservation booking',() => {
    let reservation: ReservationPage;

    test.beforeEach(async({page}) => {
        reservation = new ReservationPage(page);
        await reservation.goto(SLUG);
    });

    test('a customer can book a table', async({page}) => {
        const Surname = `QA-${Date.now()}`;
        const d = new Date();
        d.setDate(d.getDate()+ 7);
        const date = d.toISOString().slice(0,10);
        await reservation.firstNameInput.fill('Arcelen');
        await reservation.surnameInput.fill(Surname);
        await reservation.emailInput.fill('arcelen.apk@gmail.com');
        await reservation.guestsInput.fill('3');
        await reservation.dateInput.fill(date);
        await reservation.timeInput.fill('19:45');
        await reservation.confirmButton.click();
        await expect(page.getByText('Your table at 365 Cafe is reserved for')).toBeVisible();


    });


});

