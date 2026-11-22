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
        this.starter=page.getByRole('heading',{name :'Starter'});
        this.basic=page.getByRole('heading', {name: 'Basic'});
        this.pro=page.getByRole('heading', {name: 'Pro'});
        this.business=page.getByRole('heading',{name: 'Business'});
        this.btnst=page.getByRole('button',{name: 'Choose Starter', exact: true});
        this.btnba=page.getByRole('button', {name:'Choose Basic', exact: true});
        this.btnpr=page.getByRole('button', {name: 'Choose Pro', exact: true});
        this.btnbu=page.getByRole('button', {name: 'Choose Business', exact:true});
    }
    async goto(){
        await this.page.goto('/plans');
    }
}