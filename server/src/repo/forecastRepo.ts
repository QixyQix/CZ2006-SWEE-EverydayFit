import Forecast from "../models/forecast";

const GetForecasts = async () => {
    const today = new Date();
    today.setHours(0, 0, 0);

    const forecasts = await Forecast.find({ date: { $gte: today } });
    return forecasts;
}

const ForecastRepo = {
    GetForecasts
}

export { ForecastRepo as default };