import testDB from "./mongoTestDB";
import app from '../app';
import request from "supertest";
import SeedDatabase from '../data/seed';
import mongoose from 'mongoose';

describe('FORECASTS: Get Forecasts', () => {
    it('Returns status 200 and details of weather forecasts', async () => {
        await request(app).get('/forecasts/').expect((res) => {
            expect(res.body).toMatchSnapshot({
                _id: expect.any(String),
                date: expect.any(Date),
                highTemp: expect.any(Number),
                lowTemp: expect.any(Number),
                forecast: expect.any(String),
                forecastCategory: expect.any(String),
                wetWeather: expect.any(Boolean)
            })
        }).expect(200);
    });
});