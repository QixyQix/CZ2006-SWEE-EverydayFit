import testDB from "./mongoTestDB";
import app from '../app';
import request from "supertest";
import SeedDatabase from '../data/seed';
import mongoose from 'mongoose';
import { EExerciseCategory, EQuantityType } from '../models/constants';

let exercises: any[] = [];
let createdExerciseID: string = "";

beforeAll(async () => {
    await testDB.connect();
    await SeedDatabase();

    await request(app).get('/exercise').then((response) => {
        exercises = response.body;
        for (const exercise of exercises) {
            if (exercise.name === 'Push Up') {
                createdExerciseID = exercise._id;
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

describe('EXERCISE: Get all exercises', () =>{
    it('Returns status 200 and all fitness details', async () => {
        await request(app).get('/exercise').expect((res) => {
            for (const exercise of res.body){
                if (exercise){
                    expect(exercise).toMatchSnapshot({
                        _id: expect.any(String),
                        name: expect.any(String),
                        category: expect.any(String) ,
                        outdoorOnly: expect.any(Boolean),
                        quantityType: expect.any(String),
                        quantityUnit: expect.any(String),
                        calorieBurnRatePerUnit: expect.any(Number)
                    })
                }
            }
        }).expect(200);
});

});

describe('EXERCISE: Get alternatives for exercise ID', () =>{
    it('Returns status 500 if non-existent exercise ID used', async() => {
        await request(app).get('/exercise/alt/12345abcde6789fghadc4f86').expect(500);
    });

    it('Returns null and status 200 if no exercise ID provided', async() => {
        await request(app).get('/exercise/alt/').expect(null).expect(200);
    });

    it('Returns status 200 and all fitness details', async () => {
        await request(app).get('/exercise').expect((res) => {
            for (const exercise of res.body){
                if (exercise){
                    expect(exercise).toMatchSnapshot({
                        _id: expect.any(String),
                        name: expect.any(String),
                        category: expect.any(String) ,
                        outdoorOnly: expect.any(Boolean),
                        quantityType: expect.any(String),
                        quantityUnit: expect.any(String),
                        calorieBurnRatePerUnit: expect.any(Number)
                    })
                }
            }
        }).expect(200);
    });
});

describe('EXERCISE: Get exercise by name', () =>{
    it('Returns null and status 200 if non-existent exercise name used', async() => {
        await request(app).get('/exercise/Fighting').expect(null).expect(200);
    });
    it ('Returns status 200 and details of exercise of exercise name', async() => {
        await request(app).get('/exercise/Push Up').expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                name: expect.any(String),
                category: expect.any(String) ,
                outdoorOnly: expect.any(Boolean),
                quantityType: expect.any(String),
                quantityUnit: expect.any(String),
                calorieBurnRatePerUnit: expect.any(Number)
            })
        }).expect(200);
    })
});