import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe("Login page visual tests", () => {
    let homepage: HomePage
    let loginpage: LoginPage

    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page)
        loginpage = new LoginPage(page)

        await homepage.visit()
        await homepage.clickOnSignIn()
    })

    test("Login Form", async({page}) => {
        await loginpage.snaphotLoginForm()
    })

    test("Login Error Message", async({page}) => {
        await loginpage.login("un", "up")
        await loginpage.snaphotErrorMessage()
    })
})