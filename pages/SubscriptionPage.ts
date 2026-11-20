import { Page, Locator} from '@playwright/test';

export class SubscriptionPage {
    readonly starter: Locator; 
    readonly basic: Locator;
    readonly pro: Locator;
    readonly business: Locator;
    readonly btnst: Locator;
    readonly btnba: Locator;
    readonly btnpr: Locator;
    readonly btnbu: Locator;

    constructor(private page: Page){
        this.starter=page.getByRole('textbox',{name :'Starter'});
        this.basic=page.getByRole('textbox', {name: 'Basic'});
        this.pro=page.getByRole('textbox', {name: 'Pro'});
        this.business=page.getByRole('textbox',{name: 'Business'});
        this.btnst=page.getByRole('button',{name: 'Choose Starter'});
        this.btnba=page.getByRole('button', {name:'Choose Basic'});
        this.btnpr=page.getByRole('button', {name: 'Choose aPro'});
        this.btnbu=page.getByRole('button', {name: 'Choose Business'});
    }
    async goto(){
        await this.page.goto('/plans');
    }
}