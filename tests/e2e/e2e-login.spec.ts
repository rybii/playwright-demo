import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only("Login/Logout Flows", () =>{
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test("Negative scenario for login", async ({page}) =>{
        await homePage.clickOnSignIn()
        await loginPage.login('un','up')
        await loginPage.wait(1000) // wait example from AbstractPage
        await loginPage.assertErrorMessage()
    })

    test("Positive scenario for login + logout", async ({page}) =>{
        await homePage.clickOnSignIn()
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})