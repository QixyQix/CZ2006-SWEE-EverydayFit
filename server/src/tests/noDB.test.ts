import app from '../app';
import request from "supertest";

describe('EXERCISE: Get all exercises', () =>{
    it('Returns error when database is not connected', async () => {
        await request(app).get('/exercise/alt/').expect(500);
    });

    it('Returns error when database is not connected', async () => {
        await request(app).get('/exercise/Push Up').expect(500);
    });

});

describe('AUTH: Register an account', () => {

    it('Returns error when database is not connected', async () => {
        await request(app).post('/auth/register').send({
            email: "qixyqix@Outlook.com",
            name: "Qi Xiang",
            password: "P@ssw0rd"
        }).expect(500)
    });
});