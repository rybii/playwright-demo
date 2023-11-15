import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe("Tips and Tricks", () => {
    test.only("TestInfo Object", async ({page}, testInfo) => {
        await page.goto("https://www.example.com")
        //console.log(testInfo.title)
        let newNumber = await getRandomNumber()
        let newString = await getRandomString()
        console.log(newNumber)
        console.log(newString)
    })

    test("Test Skip Browser", async ({page, browserName}) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto("https://www.example.com")
    })

    test("Test Fixme Annotation", async ({page, browserName}) => {
        test.fixme(browserName === "chromium", "Unstable test. Needs revision")
        await page.goto("https://www.example.com")
    })

    const people = ["Mike", "John", "Jack", "Andrew", "Bob"]
    for (const name of people)
        test(`Running test for ${name}`, async ({page}) => {
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.type("#searchTerm", `${name}`)
            await page.waitForTimeout(3000)
        })

    test("Mouse movement simulation", async ({page}) => {
        await page.goto("https://www.example.com")
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0,100)
        await page.mouse.up()
    })

    test("Multiple browser tabs", async ({browser}) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.example.com")
        await page3.goto("https://www.example.com")
        await page1.waitForTimeout(5000)
    })

})

//Emulate iphone 11: npx playwright open --device="iPhone 11" wikipedia.org

//Save website to PDF: npx playwright pdf {website URL} {name of the otput file}.pdf

//save screenshot of the web page under iphone emulation: 
//npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 x.com google-iphone-image.png

//timezone geolocation and language change: npx playwright open --timezone="Europe/Rome" --lang="it-IT" --geolocation="40.121, 10.123" google.com