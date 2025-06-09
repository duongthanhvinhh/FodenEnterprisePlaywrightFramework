import { test as baseTest } from './common-fixture'

type hooksFixtureType = {
    goToUrl: any;
    logOut: any;
}

export const test = baseTest.extend<hooksFixtureType>({
    goToUrl: async ({ loginPage }, use) => {
        await loginPage.goToOrangeHrm();
        await use();
    },
    logOut: async ({ userProfilePage }, use) => {
        await use(); //Passing use before logout here because we are using this for afterEach hook which should be run after each test
        await userProfilePage.logOut();
    }
})