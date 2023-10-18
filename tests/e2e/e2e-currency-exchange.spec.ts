import { test, expect } from '@playwright/test'

test.describe.only('Currency Exchange', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click("text=Sign in")
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html")
    })

    test('Make a currency exchange', async ({page}) =>{
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')

        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 euro (EUR) = 1.3862 U.S. dollar (USD)')

        await page.type('#pc_amount', '100')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('72.14 euro (EUR) = 100.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const successExchangeMessage = await page.locator('#alert_content')
        await expect(successExchangeMessage).toContainText('Foreign currency cash was successfully purchased.')
    })
})