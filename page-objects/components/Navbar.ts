import { expect, Locator, Page } from '@playwright/test'

export class Navbar {
    readonly page: Page
    readonly accountSummary: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyMap: Locator
    readonly onlineStatements: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSummary = page.locator("#account_summary_tab")
        this.accountActivity = page.locator("#account_activity_tab")
        this.transferFunds = page.locator("#transfer_funds_tab")
        this.payBills = page.locator("#pay_bills_tab")
        this.myMoneyMap = page.locator("#money_map_tab")
        this.onlineStatements = page.locator("#online_statements_tab")        
    }

    async clickOnTab(tabName) {
        switch(tabName) {
            case "Account Summary": 
                await this.accountSummary.click()
                break
            case "Account Activity": 
                await this.accountActivity.click()
                break
            case "Transfer Funds": 
                await this.transferFunds.click()
                break
            case "Pay Bills": 
                await this.payBills.click()
                break
            case "My Money Map": 
                await this.myMoneyMap.click()
                break
            case "Online Statements": 
                await this.onlineStatements.click()
                break
            default:
                throw new Error("This tab does not exists!")
        }
    }
}
