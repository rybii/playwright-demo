import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('New Payment', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')
        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
    })

    test('Create a new payment', async ({page}) =>{
        await navbar.clickOnTab('Pay Bills')
        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    })
})