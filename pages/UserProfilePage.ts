import { Locator, Page } from '@playwright/test'

export class UserProfilePage{
    readonly page: Page;
    readonly userMenuButton: Locator;
    readonly logOutButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userMenuButton = page.locator('.oxd-userdropdown-name');
        this.logOutButton = page.getByRole('menuitem', { name: 'Logout' })
    }

    async logOut(){
        await this.userMenuButton.click();
        await this.logOutButton.click();
    }
}