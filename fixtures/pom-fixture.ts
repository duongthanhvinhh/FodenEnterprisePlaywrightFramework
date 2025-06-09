import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { LeftNavigationPage } from '../pages/LeftNavigationPage';
import { PimPage } from '../pages/PimPage';

type PomFixturesType = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userProfilePage: UserProfilePage;
    leftNavigationPage: LeftNavigationPage;
    pimPage: PimPage;
}
export const test = baseTest.extend<PomFixturesType>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },
    userProfilePage: async ({page}, use) => {
        await use(new UserProfilePage(page));
    },
    leftNavigationPage: async ({page}, use) => {
        await use(new LeftNavigationPage(page));
    },
    pimPage: async ({page}, use) => {
        await use(new PimPage(page));
    }
}) 