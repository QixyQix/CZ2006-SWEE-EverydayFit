import mongoose from 'mongoose';

export interface IExercise extends mongoose.Document {
    _id: string,
    name: string,
    category: string,
    isOutdoor: string,
    quantityUnit: string,
    calorieBurnRatePerUnit: number
}

const exerciseSchema = new mongoose.Schema({
    name: String,
    category: String,
    isOutdoor: String,
    quantityUnit: String,
    calorieBurnRatePerUnit: Number,
});

const Exercise = mongoose.model<IExercise>('exercise', exerciseSchema);

export { Exercise as default };