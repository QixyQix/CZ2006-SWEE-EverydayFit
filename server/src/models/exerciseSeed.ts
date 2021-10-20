import mongoose from 'mongoose';

const ExerciseSeed = [{
    _id: new mongoose.Types.ObjectId(),
    name: 'push_up',
    category: 'anaerobic',
    isOutdoor: 'hybrid',
    quantityUnit: '1',
    calorieBurnRatePerUnit: 1.14
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'sit_up',
    category: 'anaerobic',
    isOutdoor: 'hybrid',
    quantityUnit: '1',
    calorieBurnRatePerUnit: 1.14
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'running',
    category: 'aerobic',
    isOutdoor: 'yes',
    quantityUnit: '100m',
    calorieBurnRatePerUnit: 7.69
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'walking',
    category: 'aerobic',
    isOutdoor: 'yes',
    quantityUnit: '100m',
    calorieBurnRatePerUnit: 4.69
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'bicycling',
    category: 'aerobic',
    isOutdoor: 'yes',
    quantityUnit: '100m',
    calorieBurnRatePerUnit: 2.92
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'swimming',
    category: 'aerobic',
    isOutdoor: 'hybrid',
    quantityUnit: '1mets',
    calorieBurnRatePerUnit: 75
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'yoga',
    category: 'anaerobic',
    isOutdoor: 'hybrid',
    quantityUnit: '1mets',
    calorieBurnRatePerUnit: 75
},
{
    _id: new mongoose.Types.ObjectId(),
    name: 'weight_lifting',
    category: 'anaerobic',
    isOutdoor: 'hybrid',
    quantityUnit: '1min',
    calorieBurnRatePerUnit: 2.67
}
];

export { ExerciseSeed as default };