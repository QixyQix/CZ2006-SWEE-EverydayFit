import mongoose from 'mongoose';
import { EForecastCategory } from './constants';

export interface IForecast {
    _id: string,
    date: Date,
    highTemp: number,
    lowTemp: number,
    forecast: string,
    forecastCategory: string,
    wetWeather: boolean
}

const forecastSchema = new mongoose.Schema({
    date: { type: Date, unique: true },
    highTemp: Number,
    lowTemp: Number,
    forecast: String,
    forecastCategory: { type: String, enum: Object.values(EForecastCategory) },
    wetWeather: Boolean,
});

const Forecast = mongoose.model<IForecast>('forecast', forecastSchema);

export { Forecast as default };