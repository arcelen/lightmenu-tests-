import {test, expect} from '@playwright/test';

test ('create and delete a menu item' ,async ({page}) => {
    await page.goto('/dashboard');
    await page.getByRole('button', {name : 'System', exact: true}).first().click();
    await page.getByText('ManagerFull access — staff, menu, orders, analytics and settingsTap to manage →').click();
    await page.getByRole('button', { name: "Skip — I'll explore on my own" }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await page.getByRole('button', {name : 'Menu management'}).click();
    await page.getByRole('button', {name : 'Add Item'}).first().click();
    await page.getByRole('textbox', {name:'Item name'}).click();
    await page.getByRole('textbox', {name:'Item name'}).fill('burger');
    await page.getByPlaceholder('0.00').fill('4.50');
    await page.getByRole('button', { name: 'Add Item' }).last().click();

    await page.getByRole('button', { name: 'Uncategorized' }).click();
    await expect(page.getByText('burger').first()).toBeVisible();

    const deleteButtons = page.getByRole('button', { name: 'Delete item' });
    const countBefore = await deleteButtons.count();
    page.once('dialog', (dialog) => dialog.accept());
    await deleteButtons.last().click();
    await expect(deleteButtons).toHaveCount(countBefore - 1);
});