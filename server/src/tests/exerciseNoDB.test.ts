import app from '../app';
import request from "supertest";

describe('EXERCISE: Get all exercises', () =>{
    it('Returns error', async () => {
        await request(app).get('/exercise').expect(500);
});

it('Returns error', async () => {
    await request(app).get('/exercise/alt/').expect(500);
});

it('Returns error', async () => {
    await request(app).get('/exercise/Push Up').expect(500);
});

});