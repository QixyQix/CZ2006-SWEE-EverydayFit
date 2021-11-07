import testDB from "./mongoTestDB";
import app from '../app';
import request from "supertest";
import SeedDatabase from '../data/seed';
let token = "";
let exercises: any[] = [];
let distanceBaseExercise: any = {};
let quantitativeBaseExercise: any = {};

beforeAll(async () => {
    await testDB.connect();
    await SeedDatabase();

    await request(app).post('/auth/register').send({
        email: "qixyqix@Outlook.com",
        name: "Qi Xiang",
        password: "P@ssw0rd"
    }).then((response) => {
        token = response.body.token;
    });

    await request(app).get('/exercise').then((response) => {
        exercises = response.body;
        for (const exercise of exercises) {
            if (exercise.quantityType === 'QUANTITATIVE') {
                quantitativeBaseExercise = exercise;
                break;
            }
        }
        for (const exercise of exercises) {
            if (exercise.quantityType === 'DISTANCE') {
                distanceBaseExercise = exercise;
                break;
            }
        }
    })
});
afterEach(async () => {
    // await testDB.clearDatabase()
});
afterAll(async () => {
    await testDB.clearDatabase()
    await testDB.closeDatabase()
});

describe('FITNESSPLAN: Post activity', () => {
    it('Returns status 401 if no Authorization header is present', async () => {
        await request(app).post('/plan/2021-11-10/activity').send({
            exerciseID: quantitativeBaseExercise._id,
            quantity: 15,
            sets: 3
        }).expect(401);
    });

    it('Returns status 401 if expired JWT Token is used', async () => {
        await request(app).post('/plan/2021-11-10/activity')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MTZiYjI1MzEwZTFlN2IxY2M1YzlmYzIiLCJpYXQiOjE2MzQ0NDc5ODksImV4cCI6MTYzNDQ1MTU4OX0.cQQ2d0zCWUcE8PvJoMNXjVSMbLiqSc5k7IlvHOUbB8E')
            .send({
                exerciseID: quantitativeBaseExercise._id,
                quantity: 15,
                sets: 3
            }).expect(401);
    });

    it('Returns status 500 if invalid date format is used', async () => {
        await request(app).post('/plan/2021-11-1/activity')
            .set('Authorization', token)
            .send({
                exerciseID: quantitativeBaseExercise._id,
                quantity: 15,
                sets: 3
            }).expect(500);
    });

    it('Returns status 500 if non-existent exercise ID used', async () => {
        await request(app).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
                exerciseID: '6187da4fb5cccfeba574f852',
                quantity: 10,
                sets: 3
            }).expect(500);
    });

    it('Returns status 500 if quantity < 1', async () => {
        await request(app).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
                exerciseID: quantitativeBaseExercise._id,
                quantity: 0,
                sets: 3
            }).expect(500);
    });

    it('Returns status 500 is a quantitative exercise and sets < 1', async () => {
        await request(app).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
                exerciseID: quantitativeBaseExercise._id,
                quantity: 15,
                sets: 0
            }).expect(500);
    });

    it('Returns status 200 and the fitness plan', async () => {
        await request(app).post('/plan/2021-11-10/activity')
            .set('Authorization', token)
            .send({
                exerciseID: quantitativeBaseExercise._id,
                quantity: 15,
                sets: 1
            }).expect((res) => {
                console.log(res.body);
                expect(res.body).toMatchSnapshot({
                    _id: expect.any(String),
                    activities: expect.any(Array),
                    date: expect.any(String),
                    owner: expect.any(String)
                });

                for (const activity of res.body.activities) {
                    if (activity) {
                        expect(activity).toMatchSnapshot({
                            exerciseID: expect.any(String),
                            totalQuantity: expect.any(Number),
                            sets: expect.any(Number),
                            done: expect.any(Boolean),
                            _id: expect.any(String)
                        })
                    }
                }
            }).expect(200);
    })
})