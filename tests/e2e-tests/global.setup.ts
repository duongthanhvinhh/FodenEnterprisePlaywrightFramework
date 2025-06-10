import { expect } from '@playwright/test';
import { test } from '../../fixtures/common-fixture'
import { TIMEOUT } from 'dns';

test("Global setup for saving login authentication state", async ({page, commonUtils, loginPage, dashboardPage}) => {
    await loginPage.goToOrangeHrm();
    await loginPage.loginOrangeHrm(commonUtils.decryptData(commonUtils.getDataFromEnvFile('USER_NAME')), commonUtils.decryptData(commonUtils.getDataFromEnvFile('PASSWORD')));
    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await page.waitForSelector('h6', { timeout: 10000 });
    expect(dashboardPage.dashboardTitleText).toBeVisible();

    await page.context().storageState({
        path: './playwright/.auth/auth.json'
    })
})