import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Filter Transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto("http://zero.webappsecurity.com/bank/account-activity.html")
    })

    test('Verify the results for each account', async ({page}) =>{
        await page.selectOption('#aa_accountId', '2')
        const numberOfRecords =await page.locator('#all_transactions_for_account tbody tr')
        await expect(numberOfRecords).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        await expect(numberOfRecords).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
        await expect(noResults).toContainText('No results.')
    })
})