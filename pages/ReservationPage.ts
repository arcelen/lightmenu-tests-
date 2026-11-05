import { Page, Locator} from '@playwright/test';

export class ReservationPage {
    readonly heading: Locator;
    readonly firstNameInput: Locator;
    readonly surnameInput: Locator;
    readonly emailInput: Locator;
    readonly guestsInput: Locator;
    readonly confirmButton: Locator;
    readonly marketingCheckbox: Locator;
    readonly phoneInput: Locator;
    readonly dateInput: Locator;
    readonly timeInput: Locator;
    readonly notesInput: Locator;
    
    constructor(private page: Page){
        this.heading = page.getByRole('heading', { level: 1});
        this.firstNameInput = page.getByRole('textbox', { name: 'First name'});
        this.surnameInput = page.getByRole('textbox', {name: 'Surname'});
        this.emailInput = page.getByRole('textbox', {name:'Email'});
        this.guestsInput = page.getByRole('spinbutton', {name: 'Guests'});
        this.confirmButton = page.getByRole('button', {name: 'Confirm booking'});
        this.marketingCheckbox = page.getByRole('checkbox', {name: 'offers and news'});
        this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
        this.notesInput = page.getByRole('textbox', { name: 'Notes (optional)' });
        this.dateInput = page.getByRole('textbox', { name: 'Date' });
        this.timeInput = page.getByRole('textbox', { name: 'Time' });
    }

    async goto(slug: string){
        await this.page.goto(`/reservation/${slug}`);
    }
}
