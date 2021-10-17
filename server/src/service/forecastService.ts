import ForecastRepo from "../repo/forecastRepo";

const GetForecasts = async () => {
    const forecasts = await ForecastRepo.GetForecasts();
    return forecasts;
}

const ForecastService = {
    GetForecasts,
}

export { ForecastService as default };
