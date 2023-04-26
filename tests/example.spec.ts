import { test, expect } from '@playwright/test'

import {loadHomePage, assertTitle} from '../helpers'

test.skip('Simlpe basic test', async ({page}) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test("Click on element", async({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click("#signin_button")
    await page.click("text=Sign in")
    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
})

test.describe("Inputs & assertions suite", () => {
    test("Working with inputs", async({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'un')
        await page.type('#user_password', 'up')
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
    
    test("Assertions @smoke", async({page}) => {
        await page.goto('https://www.example.com')
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
        const el = await page.locator('h1')
        await expect(el).toBeVisible()
        await expect(el).toHaveText('Example Domain')
        await  expect(el).toHaveCount(1)
        const nonexel = await page.locator('h5')
        await expect(nonexel).not.toBeVisible()
    })
})

test.describe.parallel.only("Tests with screenshots and hooks", () => {
    test.beforeEach(async ({page}) =>{
        await page.goto('https://www.example.com')
    })

    test("Screenshots", async ({page}) =>{
        await page.screenshot({path: "screenshot.png", fullPage: true})
    })
    
    test("Single element screenshots", async ({page}) => {
        const el = await page.$('h1')
        await el.screenshot({path: "screenshot_el.png"})
    })
})

test("Custom helpers", async ({page}) => {
    await loadHomePage(page)
    // await page.pause() //pause of the test for debugging
    await assertTitle(page)
})


