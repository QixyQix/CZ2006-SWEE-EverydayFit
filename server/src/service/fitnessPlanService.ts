import FitnessPlanRepo from "../repo/fitnessPlanRepo";
import ExerciseRepo from "../repo/exerciseRepo";
import { EQuantityType } from "../models/constants";

const GetFitnessPlansForUserID = async (userID: string) => {
    try {
        const fitnessPlans = await FitnessPlanRepo.GetFitnessPlansForUserID(userID);
        return fitnessPlans;
    } catch (err) {
        console.error(`FitnessPlanService: GetFitnessPlansForUserID: Unable to get fitness plans for use ${userID}`);
        throw new Error('An error occured while trying to retrieve fitness plans');
    }
}

const GetDateFitnessPlanForUser = async (userID: string, date: Date) => {
    try {
        const fitnessPlans = await FitnessPlanRepo.GetDateFitnessPlanForUser(userID, date);
        return fitnessPlans;
    } catch (err) {
        console.error(`FitnessPlanService: GetDateFitnessPlanForUser: Unable to get date fitness plans for use ${userID}`);
        throw new Error('An error occured while trying to retrieve fitness plans');
    }
}

const AddActivityToFitnessPlan = async (userID: string, date: Date, exerciseID: string, quantity: number, sets: number) => {
    try {
        if (quantity == null || quantity < 1 || quantity === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: quantity detail is null');
            throw new Error('Invalid Input: Quantity must be more than or equal to 1 ');
        }

        const exercise = await ExerciseRepo.GetExerciseByID(exerciseID);
        if (!exercise) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: Invalid exerciseID');
            throw new Error('Invalid Input: Invalid exerciseID');
        }

        if (exercise.quantityType === EQuantityType.QUANTITATIVE) {
            if (sets < 1) {
                console.error('FitnessPlanService: AddActivityToFitnessPlan: Exercise is quantitative and has sets < 1');
                throw new Error('Invalid Input: Sets must be 1 or more for quantitative exercise');
            }
        } else {
            sets = 0;
        }

        const fitnessPlan = await FitnessPlanRepo.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            // Create fitness plan if it does not exist
            const activities: any = [
                {
                    exerciseID,
                    totalQuantity: quantity,
                    sets,
                    done: false
                }
            ]
            const newFitnessPlan = await FitnessPlanRepo.CreateFitnessPlan(userID, date, activities);
            return newFitnessPlan;
        } else {
            if (fitnessPlan.owner.toString() !== userID) {
                console.error(`FitnessPlanService: AddActivityToFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
                throw new Error('You do not own this fitness plan!');
            }

            const result = await FitnessPlanRepo.AddActivityToFitnessPlan(userID, date, exerciseID, quantity, sets);
            return result;
        }
    } catch (err) {
        console.error(`FitnessPlanService: AddActivityToFitnessPlan: An error occured while adding activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
}

const DeleteActivityFromFitnessPlan = async (userID: string, date: Date, activityID: string) => {
    try {
        if (!activityID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: activityID detail is null');
            throw new Error('An error occured while trying to add activity');
        }
        const fitnessPlan = await FitnessPlanRepo.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: Fitness Plan for ${userID} on ${date} is already empty`);
            throw new Error('An error occured while trying to delete activity');
        }

        if (fitnessPlan.owner.toString() !== userID) {
            console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
            throw new Error('You do not own this fitness plan!');
        }

        if (!(fitnessPlan.activities.find(activity => { return activity._id.toString() === activityID }))) {
            throw new Error('Activity does not exist')
        }

        const result = await FitnessPlanRepo.DeleteActivityFromFitnessPlan(userID, date, activityID);
        return result;
    } catch (err) {
        console.error(`FitnessPlanService: DeleteActivityFromFitnessPlan: An error occured while deleting activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
}

const EditActivityFromFitnessPlan = async (userID: string, date: Date, activityID: string, exerciseID: string, quantity: number, sets: number, done: boolean) => {
    try {
        if (!activityID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: activityID detail is null');
            throw new Error('Invalid Input: No Activity ID');
        } else if (!exerciseID) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: exerciseID detail is null');
            throw new Error('Invalid Input: No Exercise ID');
        } else if (quantity == null || quantity < 1 || quantity === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: quantity detail is null');
            throw new Error('Invalid Input: Quantity must be more than or equal to 1');
        } else if (sets == null || sets === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: sets detail is null');
            throw new Error('Invalid Input: Sets is null');
        } else if (done == null || done === undefined) {
            console.error('FitnessPlanService: AddActivityToFitnessPlan: done status detail is null');
            throw new Error('Invalid Input: Done is null');
        }

        const exercise = await ExerciseRepo.GetExerciseByID(exerciseID);
        if (!exercise) {
            throw new Error('Exercise ID not found');
        } else if (exercise.quantityType === EQuantityType.QUANTITATIVE) {
            if (sets < 1) {
                console.error('FitnessPlanService: EditActivityFromFitnessPlan: Exercise is quantitative and has sets < 1');
                throw new Error('Sets must be > 1 for quantitative based exercise');
            }
        }

        const fitnessPlan = await FitnessPlanRepo.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            console.error(`FitnessPlanService: EditActivityFromFitnessPlan: Fitness Plan for ${userID} on ${date} is empty`);
            throw new Error('No fitnessPlan found for the given date');
        }

        if (fitnessPlan.owner.toString() !== userID) {
            console.error(`FitnessPlanService: EditActivityFromFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
            throw new Error('You do not own this fitness plan!');
        }

        if (!(fitnessPlan.activities.find(activity => { return activity._id.toString() === activityID }))) {
            throw new Error('Activity does not exist')
        }

        const result = await FitnessPlanRepo.EditActivityFromFitnessPlan(userID, date, activityID, exerciseID, quantity, sets, done);
        return result;
    } catch (err) {
        console.error(`FitnessPlanService: EditActivityFromFitnessPlan: An error occured while editing activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error(err.message);
    }
}

const FitnessPlanService = {
    GetFitnessPlansForUserID,
    GetDateFitnessPlanForUser,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
}

export { FitnessPlanService as default };
