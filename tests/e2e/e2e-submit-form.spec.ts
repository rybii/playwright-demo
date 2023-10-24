import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback Form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    test('Reset Feedback form', async ({page})=>{
        await feedbackPage.fillForm(
            "name",
            "email@em.ail",
            "some subject",
            "some comment")
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    test('Submit Feedback form', async ({page})=>{
        await feedbackPage.fillForm(
            "name",
            "email@em.ail",
            "some subject",
            "some comment")
        await feedbackPage.submitForm()
        await feedbackPage.assertFeedbackFormSent
    })
})