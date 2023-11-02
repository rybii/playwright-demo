import { test, expect } from '@playwright/test'

test.describe.parallel("API testing", () => {
    const baseUrl = "https://reqres.in/api/"

    test("Simple API test - Assert response status", async ({request}) => {
        const response = await request.get(`${baseUrl}users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API test - Assert invalid user Id", async ({request}) => {
        const response = await request.get(`${baseUrl}users/test`)
        expect(response.status()).toBe(404)
    })

    test("GET User Details", async ({request}) => {
        const response = await request.get(`${baseUrl}users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.first_name).toBe("George")
        expect(responseBody.data.last_name).toBe("Bluth")
    })

    test("POST Create New User", async ({request}) => {
        const response = await request.post(`${baseUrl}users`, {
            data: {
                "name": "John",
                "job": "QA"
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.createdAt).toBeTruthy()
        expect(responseBody.name).toBe("John")
        expect(responseBody.job).toBe("QA")
    })

    test("POST Login Successful", async ({request}) => {
        const response = await request.post(`${baseUrl}login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
        expect(responseBody.token).toBe("QpwL5tke4Pnpja7X4")
    })

    test("POST Login Failed - missing password", async ({request}) => {
        const response = await request.post(`${baseUrl}login`, {
            data: {
                "email": "eve.holt@reqres.in"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test("POST Login Failed - user not found", async ({request}) => {
        const response = await request.post(`${baseUrl}login`, {
            data: {
                "email": "ev.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("user not found")
    })

    test("PUT Update User", async ({request}) => {
        const response = await request.put(`${baseUrl}users/2`, {
            data: {
                "name": "John",
                "job": "TL"
            }
        })

        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.updatedAt).toBeTruthy()
        expect(responseBody.name).toBe("John")
        expect(responseBody.job).toBe("TL")
    })

    test("DELETE Update User", async ({request}) => {
        const response = await request.delete(`${baseUrl}users/2`)

        expect(response.status()).toBe(204)
    })
})