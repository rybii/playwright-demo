import {expect, Locator, Page} from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBar: Locator
    readonly linkToFeedback: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBar = page.locator('#searchTerm')
        this.linkToFeedback = page.locator('#feedback')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }

    async clickOnFeedbackLink() {
        await this.linkToFeedback.click()
    }

    async searchForPhrase(phrase: string) {
        await this.searchBar.type(phrase)
        await this.page.keyboard.press('Enter')
    }
}

