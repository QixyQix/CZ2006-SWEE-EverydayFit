import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { CronJob } from 'cron';
import SeedDatabase from './data/seed';

import app from './app';

import ScheduledService from './service/scheduledService';

dotenv.config();

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_NAME || 'everydayFitDB';

mongoose
  .connect(`${mongoURL}/${dbName}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB: ', err));

const port = process.env.SERVER_PORT;

// Setup cron
const pollForecastSchedule = process.env.SCHEDULE_NEA_API || '* */2 * * *'
const forecastSchedule = new CronJob(pollForecastSchedule, ScheduledService.RetrieveForecastsFromAPI)
forecastSchedule.start();

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
if (genExercise === 'true') {
  SeedDatabase();
}