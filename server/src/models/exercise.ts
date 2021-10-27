import mongoose from 'mongoose';
import { EExerciseCategory, EQuantityType } from './constants';

export interface IExercise extends mongoose.Document {
    _id: string,
    name: string,
    category: EExerciseCategory,
    outdoorOnly: boolean,
    quantityType: EQuantityType,
    quantityUnit: string,
    calorieBurnRatePerUnit: number
}

const exerciseSchema = new mongoose.Schema({
    name: String,
    category: {type: String, enum: Object.values(EExerciseCategory)},
    outdoorOnly: Boolean,
    quantityType: { type: String, enum: Object.values(EQuantityType) },
    quantityUnit: String,
    calorieBurnRatePerUnit: Number,
});

const Exercise = mongoose.model<IExercise>('exercise', exerciseSchema);

export { Exercise as default };