import mongoose from 'mongoose';

export interface IForecast {
    _id: string,
    date: Date,
    highTemp: number,
    lowTemp: number,
    forecast: string,
    wetWeather: boolean
}

const forecastSchema = new mongoose.Schema({
    date: { type: Date, unique: true },
    highTemp: Number,
    lowTemp: Number,
    forecast: String,
    wetWeather: Boolean,
});

const Forecast = mongoose.model<IForecast>('forecast', forecastSchema);

export { Forecast as default };