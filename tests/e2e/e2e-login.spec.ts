import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel.only("Login/Logout Flows", () =>{
    let loginPage: LoginPage

    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    test("Negative scenario for login", async ({page}) =>{
        await page.click("#signin_button")
        await loginPage.login('un','up')
        await loginPage.assertErrorMessage()
        
        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })

    test("Positive scenario for login + logout", async ({page}) =>{
        await page.click("#signin_button")
        await loginPage.login('username','password')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})