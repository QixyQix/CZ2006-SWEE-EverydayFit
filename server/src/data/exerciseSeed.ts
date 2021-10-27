import mongoose from 'mongoose';
import { EExerciseCategory, EQuantityType } from '../models/constants';

const ExerciseSeed = [{
    _id: new mongoose.Types.ObjectId(),
    name: 'Push Up',
    category: EExerciseCategory.ANAEROBIC,
    outdoorOnly: false,
    quantityType: EQuantityType.QUANTITATIVE,
    quantityUnit: 'reps',
    calorieBurnRatePerUnit: 1.14
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Sit Up',
    category: EExerciseCategory.ANAEROBIC,
    outdoorOnly: false,
    quantityType: EQuantityType.QUANTITATIVE,
    quantityUnit: 'reps',
    calorieBurnRatePerUnit: 1.14
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Running',
    category: EExerciseCategory.AEROBIC,
    outdoorOnly: true,
    quantityType: EQuantityType.DISTANCE,
    quantityUnit: 'km',
    calorieBurnRatePerUnit: 76.9
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Walking',
    category: EExerciseCategory.AEROBIC,
    outdoorOnly: true,
    quantityType: EQuantityType.DISTANCE,
    quantityUnit: 'km',
    calorieBurnRatePerUnit: 46.9
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Cycling',
    category: EExerciseCategory.AEROBIC,
    outdoorOnly: true,
    quantityType: EQuantityType.DISTANCE,
    quantityUnit: 'km',
    calorieBurnRatePerUnit: 29.2
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Swimming',
    category: EExerciseCategory.AEROBIC,
    outdoorOnly: false,
    quantityType: EQuantityType.QUANTITATIVE,
    quantityUnit: 'laps',
    calorieBurnRatePerUnit: 19.8
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Yoga',
    category: EExerciseCategory.ANAEROBIC,
    outdoorOnly: false,
    quantityType: EQuantityType.TIME,
    quantityUnit: 'mins',
    calorieBurnRatePerUnit: 3.75
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'Weightlifting',
    category: EExerciseCategory.ANAEROBIC,
    outdoorOnly: false,
    quantityType: EQuantityType.TIME,
    quantityUnit: 'min',
    calorieBurnRatePerUnit: 2.67
}
];

export { ExerciseSeed as default };