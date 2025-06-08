import { test } from '../fixtures/common-fixtures'

test.describe('Login Tests', () => {
    
    test("Login with valid credentials",async ({loginPage, commonUtils}) => {
        const userName: string = commonUtils.decryptData(process.env.USER_NAME!);
        const password: string = commonUtils.decryptData(process.env.PASSWORD!);
        
        await loginPage.goToOrangeHrm();
        await loginPage.loginOrangeHrm(userName, password);
    })
})