import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    //define selectors
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    //init selectors using constructor
    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
    }

    //define login page methods
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }
    
    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }
}