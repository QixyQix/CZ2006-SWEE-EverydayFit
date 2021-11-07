import testDB from "../mongoTestDB";
import AuthService from "../../service/authService";
import AuthController from "../../controller/authController";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request, Response } from "express";

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
    it('throws an error when invalid email format is used', async () => {
        const req = getMockReq({
            body: {
                email: "qixyqix@Outlook.com",
                name: "Qi Xiang",
                password: "P@ssw0rd"
            }
        }) as Request;
        const { res } = getMockRes();
        await AuthController.Register(req, res);
        console.log(res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email must be in name@email.com format' });
    })
    // it('Registers account', async () => {
    //     const result = await AuthService.Register("qixyqix@outlook.com", "Qi Xiang", "P@ssw0rd");

    //     expect(result.token).not.toEqual("");
    //     expect(result.refreshToken).not.toEqual("");
    // });
})