import { test, expect } from '@playwright/test'

test.describe.only('New Payment', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click("text=Sign in")
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