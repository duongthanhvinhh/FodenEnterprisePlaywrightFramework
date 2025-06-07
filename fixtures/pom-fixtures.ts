import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type PomFixturesType = {
    loginPage: LoginPage;
}
export const test = baseTest.extend<PomFixturesType>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    }
}) 