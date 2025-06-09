import { test, expect } from '../fixtures/hooks-fixture'

/**
 * Visual testing
 */
test('Verify Orange HRM logo and the left hand navigation panel should be displayed correctly.',{
    tag: ['@VISUAL', '@DEV', '@UAT'],
    annotation: {
        type: 'Work Item Link',
        description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/14'
    }
} ,async ({ goToUrl, leftNavigationPage }) => {
    await test.step('Verify Orange HRM logo is displayed correctly.', async ()=> {
        await expect(leftNavigationPage.orangeHrmLogo).toHaveScreenshot('OrangeHrmLogo.png');
    })
    await test.step('Verify the Left hand navigation panel is displayed correctly.', async ()=> {
        await expect(leftNavigationPage.leftNavigationPanel).toHaveScreenshot('LeftNavPanel.png');
    })
})