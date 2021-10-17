import { Request, Response } from 'express';
import ForecastService from "../service/forecastService";

const GetForecast = async (req: Request, res: Response) => {
    const forecasts = await ForecastService.GetForecasts();
    res.json(forecasts);
}

const ForecastController = {
    GetForecast,
}

export { ForecastController as default };