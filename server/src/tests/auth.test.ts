import testDB from "./mongoTestDB";
import app from '../app';
import request from "supertest";

beforeAll(async () => {
    await testDB.connect();
});
afterEach(async () => {
    // await testDB.clearDatabase()
});
afterAll(async () => {
    await testDB.clearDatabase()
    await testDB.closeDatabase()
});

describe('AUTH: Register an account', () => {

    it('Returns status code 500 when an invalid email is used', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqixOutlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect(500)
    });

    it('Returns status code 500 when password length shorter than 6 is used', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "abc45"
        }).expect(500)
    });

    it('Returns status code 200 when a valid email and password is provided', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body.token).not.toEqual(undefined);
            expect(res.body.refreshToken).not.toEqual(undefined);
            expect(res.body.token).not.toEqual("");
            expect(res.body.refreshToken).not.toEqual("");
        })
            .expect(200)
    });

    it('Returns status code 500 when creating a new account using existing email', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        })
            .expect(500)
    });
});

describe('AUTH: Login an account', () => {

    it('Returns status code 500 when logging in with invalid email format', async () => {
        await request(app).post('/auth/login').send({
            email: "qixyqixoutlook.com",
            password: "P@ssw0rd"

        }).expect(500)
    });

    it('Returns status code 500 when logging in with invalid password length', async () => {
        await request(app).post('/auth/login').send({
            email: "qixyqixoutlook.com",
            password: "abc45"
        }).expect(500)
    });

    it('Returns status code 200 with property success = false when logging in', async () => {
        await request(app).post('/auth/login').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "Pussw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body).toHaveProperty("success")
            expect(res.body).toHaveProperty("message")
            expect(res.body.token).toEqual("");
            expect(res.body.refreshToken).toEqual("");
            expect(res.body.message).not.toEqual(undefined);
            expect(res.body.success).toEqual(false);
        })
            .expect(200)
    });

    it('Returns status code 200 with property success = false when logging in', async () => {
        await request(app).post('/auth/login').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect((res) => {
            expect(res.body).toHaveProperty("token");
            expect(res.body).toHaveProperty("refreshToken");
            expect(res.body).toHaveProperty("success")
            expect(res.body).toHaveProperty("message")
            expect(res.body.token).not.toEqual("");
            expect(res.body.refreshToken).not.toEqual("");
            expect(res.body.token).not.toEqual(undefined);
            expect(res.body.refreshToken).not.toEqual(undefined);
            expect(res.body.message).not.toEqual(undefined);
            expect(res.body.success).toEqual(true);
        })
            .expect(200)
    });
});