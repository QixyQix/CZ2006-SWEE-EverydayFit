import Express from 'express';
import ForecastController from '../controller/forecastController';

const router = Express.Router();

router.get('/', ForecastController.GetForecast);

export { router as default };