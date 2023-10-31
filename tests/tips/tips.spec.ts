import { test, expect } from '@playwright/test'

test.describe.only("Tips and Tricks", () => {
    test("TestInfo Object", async ({page}, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(testInfo.title)
    })

    test("Test Skip Browser", async ({page, browserName}) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto("https://www.example.com")
    })
})