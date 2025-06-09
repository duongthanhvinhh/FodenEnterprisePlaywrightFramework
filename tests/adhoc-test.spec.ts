import { test } from '../fixtures/hooks-fixture'



test.describe('Login Tests', () => {    
    test('Test 1 - Login with valid credentials',async ({page, goToUrl}) => {        
        console.log(await page.title());
    })

    test('Test 2 - Login with valid credentials',async ({page, goToUrl}) => {        
        console.log(await page.title());
    })

    test('Test 3 - Login with valid credentials',async ({page, goToUrl}) => {        
        console.log(await page.title());
    })

    test('Test 4 - Login with valid credentials',async ({page, goToUrl, logOut}) => {        
        console.log(await page.title());
    })
})