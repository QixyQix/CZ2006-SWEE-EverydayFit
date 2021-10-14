import mongoose from 'mongoose';
import { IExercise } from './exercise';
import { IUser } from './user';

export interface IActivity extends mongoose.Document {
    _id: string,
    exercise: IExercise,
    totalQuantity: number,
    sets: number,
    done: boolean,
}

const activitySchema = new mongoose.Schema({
    exerciseID: { type: mongoose.Schema.Types.ObjectId, ref: 'exercise' },
    totalQuantity: Number,
    sets: Number,
    done: Boolean,
});

export interface IFitnessPlan extends mongoose.Document {
    _id: string,
    date: Date,
    owner: IUser,
    activities: [IActivity],
}

const fitnessPlanSchema = new mongoose.Schema({
    date: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    activities: [activitySchema],
});

const FitnessPlan = mongoose.model<IFitnessPlan>('fitnessPlan', fitnessPlanSchema);

export { FitnessPlan as default };
