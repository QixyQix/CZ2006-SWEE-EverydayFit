import mongoose from 'mongoose';
import FitnessPlan from '../models/fitnessPlan';

const checkValidObjectID = (id: string) => {
    return mongoose.isValidObjectId(id);
}

const CreateFitnessPlan = async (userID: string, date: Date, activities: any) => {
    try {
        const fitnessPlan = new FitnessPlan({
            date,
            owner: userID,
            activities,
        });

        await fitnessPlan.save();
        return fitnessPlan;
    } catch (err) {
        console.error(`FitnessPlanRepo: CreateFitnessPlan: An error occured while creating fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while creating fitnessPlan');
    }
}

const GetFitnessPlansForUserID = async (userID: string) => {
    const today = new Date();
    if (!checkValidObjectID(userID)) {
        console.error(`FitnessPlanRepo: GetFitnessPlansForUserID: Invalid userID ${userID}`)
        throw new Error('Invalid User ID');
    }
    const fitnessPlans = await FitnessPlan.find({ owner: userID, date: { $gte: today } });
    return fitnessPlans;
}

const GetDateFitnessPlanForUser = async (userID: string, date: Date) => {
    const fitnessPlan = await FitnessPlan.findOne({ owner: userID, date });
    return fitnessPlan;
}

const GetFitnessPlanByID = async (fitnessPlanID: string) => {
    if (!checkValidObjectID(fitnessPlanID)) {
        console.error(`FitnessPlanRepo: GetFitnessPlanByID: Invalid fitnessPlanID ${fitnessPlanID}`)
        throw new Error('Invalid Fitness Plan ID');
    }
    const fitnessPlan = await FitnessPlan.findById(fitnessPlanID);
    return fitnessPlan
}

const AddActivityToFitnessPlan = async (userID: string, date: Date, exerciseID: string, quantity: number, sets: number) => {
    const activity: any = {
        exercise: exerciseID,
        totalQuantity: quantity,
        sets,
        done: false
    };

    try {
        const result = await FitnessPlan.findOneAndUpdate(
            { owner: userID, date },
            { $push: { activities: activity } }
        );
        return result;
    } catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Failed to add activity to plan for ${userID} on ${date.toDateString()}`)
        throw new Error('An error occured while adding activity to fitness plan');
    }
}

const FitnessPlanRepo = {
    CreateFitnessPlan,
    GetFitnessPlansForUserID,
    GetDateFitnessPlanForUser,
    GetFitnessPlanByID,
    AddActivityToFitnessPlan,
}

export { FitnessPlanRepo as default };