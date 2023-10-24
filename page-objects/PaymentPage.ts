import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountselectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator("#sp_payee")
        this.payeeDetailButton = page.locator("#sp_get_payee_details")
        this.payeeDetail = page.locator("#sp_payee_details")
        this.accountselectBox = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountselectBox.selectOption('6')
        await this.amountInput.type('100')
        await this.dateInput.type('2023-10-24')
        await this.descriptionInput.type('Some message')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible
        await expect(this.message).toContainText(
            'The payment was successfully submitted.'
        )
    }
}