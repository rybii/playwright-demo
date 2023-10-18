import { test, expect } from '@playwright/test'

test.describe.only('Transfer funds and Make Payments', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click("text=Sign in")
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