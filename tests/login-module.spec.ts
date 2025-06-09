import { test, expect } from '../fixtures/hooks-fixture'
import loginModuleData from '../data/login-module-data.json'

/**
 * Override the global setup auth to test login tests
 */
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test.describe('Invalid login tests', async ()=>{
    test("[LOGIN] - Verify user can not login with valid username but invalid password.", {
        tag: ['@UI', '@LOGIN', '@DEV', '@UAT'],
        annotation: {
            type: 'Work Item Link',
            description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/11'
        }
    }, async ({ commonUtils, goToUrl, loginPage }) => {
        const decryptedUserName = commonUtils.decryptData(commonUtils.getDataFromEnvFile('USER_NAME'));
        await test.step('Login with valid username and invalid password', async () => {
            await loginPage.loginOrangeHrm(decryptedUserName, loginModuleData.wrong_password);
        })
        await test.step('Verify login failed', async () => {
            await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
            await expect(loginPage.userNameInput).toBeVisible();
        })
    })

    test("[LOGIN] - Verify user can not login with invalid username and valid password.", {
        tag: ['@UI', '@LOGIN', '@DEV', '@UAT'],
        annotation: {
            type: 'Work Item Link',
            description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/10'
        }
    }, async ({ commonUtils, goToUrl, loginPage }) => {
        const decryptedPassword = commonUtils.decryptData(commonUtils.getDataFromEnvFile('PASSWORD'));
        await test.step('Login with invalid username and valid password', async () => {
            await loginPage.loginOrangeHrm(loginModuleData.wrong_user_name, decryptedPassword);
        })
        await test.step('Verify login failed', async () => {
            await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
            await expect(loginPage.userNameInput).toBeVisible();
        })
    
    })

    test("[LOGIN] - Verify that user can not login with both an invalid username and an invalid password.", {
        tag: ['@UI', '@LOGIN', '@DEV', '@UAT'],
        annotation: {
            type: 'Work Item Link',
            description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/9'
        }
    }, async ({ goToUrl, loginPage }) => {
        await test.step('Login with invalid username and invalid password', async () => {
            await loginPage.loginOrangeHrm(loginModuleData.wrong_user_name, loginModuleData.wrong_password);
        })
        await test.step('Verify login failed', async () => {
            await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
            await expect(loginPage.userNameInput).toBeVisible();
        })
    })
})

test("[LOGIN] - Verify that user can login with valid username and password.", {
    tag: ['@UI', '@LOGIN', '@DEV', '@UAT'],
    annotation: {
        type: 'Work Item Link',
        description: 'https://dev.azure.com/duongvinh1706/EnterprisePlaywrightTypescriptFramework/_workitems/edit/8'
    }
}, async ({ commonUtils, goToUrl, loginPage, dashboardPage }) => {
    const decryptedUserName = commonUtils.decryptData(commonUtils.getDataFromEnvFile('USER_NAME'));
    const decryptedPassword = commonUtils.decryptData(commonUtils.getDataFromEnvFile('PASSWORD'));
    await test.step('Login with valid username and password', async () => {
        await loginPage.loginOrangeHrm(decryptedUserName, decryptedPassword);
    })
    await test.step('Verify login successfully', async () => {
        await expect(dashboardPage.dashboardTitleText).toBeVisible();
    })
})