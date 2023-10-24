import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('New Payment', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html")
    })

    test('Create a new payment', async ({page}) =>{
        await page.selectOption('#sp_payee', 'apple')
        await page.click("#sp_get_payee_details")
        await page.waitForSelector('#sp_payee_details')
        await page.selectOption('#sp_account', '6')
        await page.type('#sp_amount', '100')
        await page.type('#sp_date', '2023-10-24')
        await page.type('#sp_description', 'payment description')
        await page.click('#pay_saved_payees')

        const successPaymentMessage = await page.locator('#alert_content > span')

        await expect(successPaymentMessage).toBeVisible()
        await expect(successPaymentMessage).toContainText('The payment was successfully submitted.')
    })
})