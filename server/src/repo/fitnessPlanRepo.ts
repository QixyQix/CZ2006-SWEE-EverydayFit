import mongoose, { mongo } from 'mongoose';
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

const AddActivityToFitnessPlan = async (userID: string, date: Date, exerciseID: string, quantity: number, sets: number, done = false) => {
    if (!checkValidObjectID(exerciseID)) {
        console.error(`ExerciseRepo: AddActivityToFitnessPlan: Invalid exerciseID ${exerciseID}`)
        throw new Error('Invalid Exercise ID');
    }
    const activity: any = {
        exerciseID,
        totalQuantity: quantity,
        sets,
        done
    };

    try {
        const result = await FitnessPlan.findOneAndUpdate(
            { owner: userID, date },
            { $push: { activities: activity } },
            { new: true }
        );
        return result;
    } catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Failed to add activity to plan for ${userID} on ${date.toDateString()}`)
        throw new Error('An error occured while adding activity to fitness plan');
    }
}

const DeleteActivityFromFitnessPlan = async (userID: string, date: Date, activityID: string) => {
    if (!checkValidObjectID(activityID)) {
        console.error(`FitnessPlanRepo: AddActivityToFitnessPlan: Invalid activityID ${activityID}`)
        throw new Error('Invalid Activity ID');
    }
    try {
        const result = await FitnessPlan.findOneAndUpdate(
            { owner: userID, date },
            { $pull: { activities: { _id: activityID } } },
            { new: true }
        );
        return result;
    } catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: DeleteActivityFromFitnessPlan: Failed to delete activity for ${userID} on ${date.toDateString()}`)
        throw new Error('An error occured while deleting activity from fitness plan');
    }
}

const EditActivityFromFitnessPlan = async (userID: string, date: Date, activityID: string, exerciseID: string, quantity: number, sets: number, done: boolean) => {
    if (!checkValidObjectID(activityID)) {
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Invalid activityID ${activityID}`)
        throw new Error('Invalid Activity ID');
    }
    if (!checkValidObjectID(exerciseID)) {
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Invalid exerciseID ${activityID}`)
        throw new Error('Invalid Exercise ID');
    }

    try {
        const fitnessPlan = await GetDateFitnessPlanForUser(userID, date);
        fitnessPlan.activities.some(item => {
            if (item._id.toString() === activityID) {
                item.exerciseID = exerciseID,
                    item.totalQuantity = quantity,
                    item.sets = sets,
                    item.done = done;
            }
        });
        await fitnessPlan.save();
        return fitnessPlan;
    } catch (err) {
        console.error(err.message);
        console.error(`FitnessPlanRepo: EditActivityFromFitnessPlan: Failed to edit activity for ${userID} on ${date.toDateString()}`)
        throw new Error('An error occured while editing activity from fitness plan');
    }
}

const GetFitnessPlansForDate = async (date: Date) => {
    try {
        const fitnessPlans = await FitnessPlan.find({ date });
        return fitnessPlans;
    } catch (err) {
        console.error(`FitnessPlanRepo: GetFitnessPlansForDate: ${err.message}`);
        throw new Error('An error occured while fetching fitness plans');
    }
}

const FitnessPlanRepo = {
    CreateFitnessPlan,
    GetFitnessPlansForUserID,
    GetDateFitnessPlanForUser,
    GetFitnessPlanByID,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
    GetFitnessPlansForDate,
}

export { FitnessPlanRepo as default };
