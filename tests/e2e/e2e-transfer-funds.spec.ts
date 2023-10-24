import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Transfer funds and Make Payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
    })

    test('Transfer Funds', async ({page}) =>{
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.type('#tf_amount', '500')
        await page.type('#tf_description', 'test funds transfer')
        await page.click("#btn_submit")

        const verifyPageHeader = await page.locator('h2.board-header')

        await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds-verify.html')
        await expect(verifyPageHeader).toContainText('Verify')

        await page.click("#btn_submit")

        const successMessage = await page.locator('.alert-success')
        await expect(successMessage).toContainText('You successfully submitted your transaction.')
    })
})