import {page,locator, Locator} from '@playwright/test'


export class QrCodePage{
    readonly genBtn: Locator;
    readonly headQr: Locator;
    readonly textQr:Locator; 
    readonly titleQr: Locator;
    readonly downQr:Locator;
    readonly tableQr:Locator;
    readonly backQr:Locator;

constructor(private page: Page){
    this.genBtn= page.getByRole('button', { name: 'Générer QR Code' }); 
    this.headQr= page.locator('.w-9.h-9.rounded-xl.bg-teal-500\\/10');
    this.textQr= page.getByRole('heading', { name: 'QR Code' });
    this.titleQr= page.getByRole('paragraph').filter({ hasText: 'VINITUS' });
    this.downQr= page.getByRole('button', { name: 'Télécharger QR' });
    this.tableQr=page.getByRole('button', { name: 'QR codes des tables Un code' });
    this.backQr=page.getByRole('button', { name: '← Retour au QR du menu' });
}


async goto(){
        await this.page.goto('/dashboard');
    };


};




//**test('test', async ({ page }) => {
 //await page.getByRole('button', { name: 'Passer la visite' }).click(); visible
  //await page.getByRole('button', { name: 'Générer QR Code' }).first().click(); btn
 //await page.locator('.w-9.h-9.rounded-xl.bg-teal-500\\/10').click(); visible
  //await page.getByRole('heading', { name: 'QR Code' }).click(); visible
 // await page.getByRole('paragraph').filter({ hasText: 'CERVECERÍA CATALANA' }).click(); visible
 // await page.getByRole('button', { name: 'Télécharger QR' }).click(); btn
 // await page.getByRole('button', { name: 'QR codes des tables Un code' }).click();
//  await page.getByRole('button', { name: '← Retour au QR du menu' }).click();
 // await page.locator('.w-8.h-8.rounded-full').click();