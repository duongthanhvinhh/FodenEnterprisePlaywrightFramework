import { test } from '../fixtures/pom-fixtures'

test.describe('Login Tests', () => {
    
    test("Login with valid credentials",async ({loginPage}) => {
        await loginPage.goToOrangeHrm();
        await loginPage.loginOrangeHrm('Admin', "admin123");
    })
})