import { test, expect } from '../fixtures/hooks-fixture'
import loginModuleData from '../data/login-module-data.json'

/**
 * Override the global setup auth to test login tests
 */
test.use({ storageState: {
        cookies: [],
        origins: []
    }
})

test("[Login] - Verify user can not login with valid username but invalid password.", async ({commonUtils, goToUrl, loginPage})=> {
    const decryptedUserName = commonUtils.decryptData(commonUtils.getDataFromEnvFile('USER_NAME'));
    await loginPage.loginOrangeHrm(decryptedUserName, loginModuleData.wrong_password);
    await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
    await expect(loginPage.userNameInput).toBeVisible();
})

test("[Login] - Verify user can not login with invalid username and valid password.", async ({commonUtils, goToUrl, loginPage})=> {
    const decryptedPassword = commonUtils.decryptData(commonUtils.getDataFromEnvFile('PASSWORD'));
    await loginPage.loginOrangeHrm(loginModuleData.wrong_user_name, decryptedPassword);
    await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
    await expect(loginPage.userNameInput).toBeVisible();
})

test("[Login] - Verify that user can not login with both an invalid username and an invalid password.", async ({ goToUrl, loginPage})=> {
    await loginPage.loginOrangeHrm(loginModuleData.wrong_user_name, loginModuleData.wrong_password);
    await expect(loginPage.loginFailedBanner).toHaveText(loginModuleData.invalid_login_error_message);
    await expect(loginPage.userNameInput).toBeVisible();
})

test("[Login] - Verify that user can login with valid username and password.", async ({commonUtils, goToUrl, loginPage, dashboardPage})=> {
    const decryptedUserName = commonUtils.decryptData(commonUtils.getDataFromEnvFile('USER_NAME'));
    const decryptedPassword = commonUtils.decryptData(commonUtils.getDataFromEnvFile('PASSWORD'));
    await loginPage.loginOrangeHrm(decryptedUserName, decryptedPassword);
    await expect(dashboardPage.dashboardTitleText).toBeVisible();
})