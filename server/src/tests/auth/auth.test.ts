import testDB from "../mongoTestDB";
import AuthService from "../../service/authService";

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
    it('Registers account', async () =>{
        const result = await AuthService.Register("qixyqix@outlook.com","Qi Xiang","P@ssw0rd");

        expect(result.token).not.toEqual("");
        expect(result.refreshToken).not.toEqual("");
    });
})