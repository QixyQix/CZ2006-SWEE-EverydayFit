import ForecastRepo from "../repo/forecastRepo";
import axios from 'axios';
import { EForecastCategory } from "../models/constants";

const RetrieveForecastsFromAPI = async () => {
    console.info('ForecastRepo: RetrieveForecastsFromAPI: Retrieving forecast from NEA API...');
    let apiData: any = null;
    try {
        const res = await axios.get('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        if (res.status !== 200) return;

        apiData = res.data;
    } catch (err) {
        console.error('ForecastRepo: RetrieveForecastsFromAPI: Error occured whiile retrieving forecast');
        console.error(err.message);
    }

    const datesToNotify: Date[] = [];
    const forecastObjs = apiData.items[0].forecasts;

    for (const forecast of forecastObjs) {
        const date = new Date(forecast.date);
        date.setHours(0, 0, 0, 0);

        const highTemp = forecast.temperature.high;
        const lowTemp = forecast.temperature.low;

        let forecastCategory: EForecastCategory = EForecastCategory.CLEAR;
        const forecastDesc: string = forecast.forecast;
        if (forecastDesc.toLowerCase().includes('showers')) forecastCategory = EForecastCategory.SHOWERS;
        if (forecastDesc.toLowerCase().includes('thundery')) forecastCategory = EForecastCategory.THUNDERY_SHOWERS;

        const wetWeather: boolean = (forecastCategory === EForecastCategory.CLEAR) ? false : true;

        const existingForecast = await ForecastRepo.GetDateForecast(date);
        if (!existingForecast) {
            // Create new forecast
            await ForecastRepo.CreateForecast(date, highTemp, lowTemp, forecastDesc, forecastCategory, wetWeather);
            if (wetWeather)
                datesToNotify.push(date);
        } else {
            existingForecast.highTemp = highTemp;
            existingForecast.lowTemp = lowTemp;
            existingForecast.forecast = forecastDesc;
            existingForecast.forecastCategory = forecastCategory;
            if (!existingForecast.wetWeather && wetWeather)
                datesToNotify.push(date);
            existingForecast.wetWeather = wetWeather;

            await existingForecast.save();
        }
    }

    console.info(`ForecastRepo: RetrieveForecastsFromAPI: Completed updating forecast information`);
    console.info(`ForecastRepo: RetrieveForecastsFromAPI: Dates to notify are: ${datesToNotify}`);
}

const ScheduledService = {
    RetrieveForecastsFromAPI,
}

export { ScheduledService as default };