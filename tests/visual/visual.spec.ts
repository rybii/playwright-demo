import { test, expect } from '@playwright/test'

test.describe.only("Visual regression test", () => {
    test("Full Page Snapshot", async ({page}) =>{
        await page.goto("https://example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })
    test("Single Element Snapshot", async ({page}) =>{
        await page.goto("https://example.com")
        const pageHeader = await page.$("h1")
        expect(await pageHeader.screenshot()).toMatchSnapshot("page-header.png")
    })
})