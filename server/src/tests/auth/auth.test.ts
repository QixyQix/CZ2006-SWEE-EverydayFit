import testDB from "../mongoTestDB";
import AuthService from "../../service/authService";
import AuthController from "../../controller/authController";
import { Request, Response } from "express";
import app from '../../app';
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
    it('throws error when invalid emial format is used', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqixOutlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect(500)
    });
})