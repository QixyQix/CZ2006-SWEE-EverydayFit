import { EForecastCategory } from '../models/constants';
import Forecast from '../models/forecast';

const GetForecasts = async () => {
    const today = new Date();
    today.setHours(0, 0, 0);

    const forecasts = await Forecast.find({ date: { $gte: today } });
    return forecasts;
}

const GetDateForecast = async (date: Date) => {
    const forecast = await Forecast.findOne({ date });
    return forecast;
}

const CreateForecast = async(date:Date, highTemp:number, lowTemp:number, forecast:string, forecastCategory:EForecastCategory, wetWeather:boolean)=>{
    const newForecast = new Forecast({
        date,
        highTemp,
        lowTemp,
        forecast,
        forecastCategory,
        wetWeather
    })

    await newForecast.save();
    return newForecast;
}

const ForecastRepo = {
    GetForecasts,
    GetDateForecast,
    CreateForecast,
}

export { ForecastRepo as default };