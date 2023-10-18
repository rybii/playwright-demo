import { test, expect } from '@playwright/test'

test.describe('Feedback Form', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#feedback')
    })

    test('Reset Feedback form', async ({page})=>{
        await page.type('#name','some name')
        await page.type('#email','some@email.com')
        await page.type('#subject','some subject')
        await page.type('#comment','some comment')
        await page.click("input[name='clear']")
        
        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')
        
        await expect (nameInput).toBeEmpty
        await expect (commentInput).toBeEmpty
    })

    test('Submit Feedback form', async ({page})=>{
        await page.type('#name','some name')
        await page.type('#email','some@email.com')
        await page.type('#subject','some subject')
        await page.type('#comment','some comment')
        await page.click("input[name='submit']")

        await page.waitForSelector('#feedback-title')
    })
})