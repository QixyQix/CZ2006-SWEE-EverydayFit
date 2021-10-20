import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import * as routes from './routes';
import crypto from 'crypto';
import { CronJob } from 'cron';

import AuthRouter from './routes/authRouter';
import ForecastRouter from './routes/forecastRouter';
import FitnessPlanRouter from './routes/fitnessPlanRouter';
import ExerciseRouter from './routes/exerciseRouter';
import SeedDatabase from './models/seed';

import ScheduledService from './service/scheduledService';

dotenv.config();

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_NAME || 'everydayFitDB';

mongoose
  .connect(`${mongoURL}/${dbName}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB: ', err));

const port = process.env.SERVER_PORT;
const app = express();

// Setup cron
const pollForecastSchedule = process.env.SCHEDULE_NEA_API || '* */2 * * *'
const forecastSchedule = new CronJob(pollForecastSchedule, ScheduledService.RetrieveForecastsFromAPI)
forecastSchedule.start();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/auth', AuthRouter);
app.use('/forecasts', ForecastRouter);
app.use('/plan', FitnessPlanRouter);
app.use('/exercise', ExerciseRouter)
routes.register(app);

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

const genJWTSecret = process.env.GENERATE_JWT_SECRETKEY || false;
if (genJWTSecret === 'true') {
  console.log(`GENERATED JWT SK: ${crypto.randomBytes(64).toString('hex')}`);
}

const genExercise = process.env.GENERATE_EXERCISE_DATABASE || false;
if (genExercise === 'true'){
  SeedDatabase();
}