import { expect, test } from '../../fixtures/hooks-fixture'
import { MenuItem } from '../../pages/LeftNavigationPage'
import pimModuleData from '../../data/e2e-data/pim-module-data.json'

test('[PIM] - Verify new employee is added successfully under the PIM module', {
    tag: ['@UI', '@PIM', '@DEV', '@UAT'],
    annotation: {
        type: 'Work Item Link',
        description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/13'
    }
}, async ({ commonUtils, goToUrl, leftNavigationPage, pimPage }) => {
    test.slow();//Use this to triple the value of wait timeout and expect assertion timeout
    await test.step('Navigate to PIM page', async () => {
        await leftNavigationPage.clickMenuItem(MenuItem.PIM);
    })
    await test.step('Add a new PIM employee with first name, middle name, last name and employee Id', async () => {
        await pimPage.addNewPimEmployee(pimModuleData.first_name, pimModuleData.middle_name, pimModuleData.last_Name, commonUtils.generateRandomFourDigitNumber());
    })
    await test.step('Verify new employee is added successfully', async () => {
        await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimModuleData.first_name} ${pimModuleData.last_Name}`);
    })
})