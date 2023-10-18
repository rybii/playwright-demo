import { test, expect } from '@playwright/test'

test.describe('Filter Transactions', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click("text=Sign in")
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