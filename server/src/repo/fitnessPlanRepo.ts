import mongoose from 'mongoose';
import FitnessPlan from '../models/fitnessPlan';

const checkValidObjectID = (id: string) => {
    return mongoose.isValidObjectId(id);
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

const GetFitnessPlanByID = async (fitnessPlanID: string) => {
    if (!checkValidObjectID(fitnessPlanID)) {
        console.error(`FitnessPlanRepo: GetFitnessPlanByID: Invalid fitnessPlanID ${fitnessPlanID}`)
        throw new Error('Invalid Fitness Plan ID');
    }
    const fitnessPlan = await FitnessPlan.findById(fitnessPlanID);
    return fitnessPlan
}

const AddActivityToFitnessPlan = async (fitnessPlanID: string, exerciseID: string, quantity: number, sets: number) => {
    const activity: any = {
        exercise: exerciseID,
        totalQuantity: quantity,
        sets,
        done: false
    };

    try {
        const result = await FitnessPlan.findOneAndUpdate(
            { _id: fitnessPlanID },
            { $push: { activities: activity } }
        );
        return result;
    } catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Failed to add activity to plan ${fitnessPlanID}`)
        throw new Error('An error occured while adding activity to fitness plan');
    }
}

const FitnessPlanRepo = {
    GetFitnessPlansForUserID,
    GetFitnessPlanByID,
    AddActivityToFitnessPlan,
}

export { FitnessPlanRepo as default };