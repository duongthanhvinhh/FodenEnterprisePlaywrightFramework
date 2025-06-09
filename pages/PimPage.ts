import { Page, Locator, expect } from '@playwright/test'

export class PimPage{
    readonly page: Page;
    readonly addPimButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly employeeIdTextBox: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.addPimButton = page.getByRole('button', { name: ' Add' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
        this.employeeIdTextBox = page.getByRole('textbox').nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.newEmployeeNameHeading = page.locator('.orangehrm-edit-employee-name').getByRole('heading');
    }

    async addNewPimEmployee(firstName: string, middleName: string, lastName: string, employeeId: string){
        await this.addPimButton.click();
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);
        await this.employeeIdTextBox.clear();
        await this.employeeIdTextBox.fill(employeeId);
        await this.saveButton.click();
    }

    async isNewEmployeeAdded(firstName: string, lastName: string): Promise<boolean>{
        const headingText = await this.newEmployeeNameHeading.textContent();
        return headingText?.replace(/ /g, '') === (firstName + ' ' + lastName);
    }
}