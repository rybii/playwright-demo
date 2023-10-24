import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly resetButton: Locator
    readonly submitButton: Locator
    readonly feedbackTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.resetButton = page.locator("input[name='clear']")
        this.submitButton = page.locator("input[name='submit']")
        this.feedbackTitle = page.locator("#feedback-title")
    }

    async fillForm(name: string, email: string, subject: string, comment: string) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
    }

    async resetForm() {
        await this.resetButton.click()
    }

    async submitForm() {
        await this.submitButton.click()
    }

    async assertReset() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }

    async assertFeedbackFormSent() {
        await expect(this.feedbackTitle).toBeVisible
    }
}