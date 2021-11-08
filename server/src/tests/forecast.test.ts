import app from '../app';
import request from "supertest";
import testDB from "./mongoTestDB";
import GetForecasts from '../service/forecastService';
import scheduledService from '../service/scheduledService';

beforeAll( async() =>{
    await testDB.connect();
    await scheduledService.RetrieveForecastsFromAPI();
});

afterEach(async () => {
    // await testDB.clearDatabase()
});

afterAll(async () => {
    await testDB.clearDatabase()
    await testDB.closeDatabase()
});

describe ("FORECASTS Forecast services", () => {

    it('Returns status 200 and weather forecasts' ,async()=>{
        await request(app).get("/forecasts/").expect((res)=>{
            for (const forecast of res.body){
                if (forecast){
                    expect(forecast).toMatchSnapshot({
                        _id: expect.any(String),
                        date: expect.any(String),
                        highTemp: expect.any(Number),
                        lowTemp: expect.any(Number),
                        forecast: expect.any(String),
                        forecastCategory: expect.any(String),
                        wetWeather: expect.any(Boolean)
                    })
                }
            }
        });
    });
});