import { test, expect } from '@playwright/test'

test.describe("Login/Logout Flows", () =>{
    test.beforeEach(async ({page}) =>{
        await page.goto('http://zero.webappsecurity.com/')
    })

    test("Negative scenario for login", async ({page}) =>{
        await page.click("#signin_button")
        await page.type('#user_login', 'un')
        await page.type('#user_password', 'up')
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
})