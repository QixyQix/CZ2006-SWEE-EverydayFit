import FitnessPlanRepo from "../repo/fitnessPlanRepo";

const GetFitnessPlansForUserID = async (userID: string) => {
    try {
        const fitnessPlans = await FitnessPlanRepo.GetFitnessPlansForUserID(userID);
        return fitnessPlans;
    } catch (err) {
        console.error(`FitnessPlanService: GetFitnessPlansForUserID: Unable to get fitness plans for use ${userID}`);
        throw new Error('An error occured while trying to retrieve fitness plans');
    }
}

const AddActivityToFitnessPlan = async (userID: string, date: Date, exerciseID: string, quantity: number, sets: number) => {
    try {
        const fitnessPlan = await FitnessPlanRepo.GetDateFitnessPlanForUser(userID, date);
        if (!fitnessPlan) {
            // Create fitness plan if it does not exist
            const activities: any = [
                {
                    exercise: exerciseID,
                    totalQuantity: quantity,
                    sets,
                    done: false
                }
            ]
            const newFitnessPlan = await FitnessPlanRepo.CreateFitnessPlan(userID, date, activities);
            return newFitnessPlan;
        } else {
            if (fitnessPlan.owner !== userID) {
                console.error(`FitnessPlanService: AddActivityToFitnessPlan: User ${userID} attempted to modify fitness plan belonging to ${fitnessPlan.owner}`);
                throw new Error('You do not own this fitness plan!');
            }

            const result = await FitnessPlanRepo.AddActivityToFitnessPlan(userID, date, exerciseID, quantity, sets);
            return result;
        }
    } catch (err) {
        console.error(`FitnessPlanService: AddActivityToFitnessPlan: An error occured while adding activity to fitness plan for ${userID} on ${date.toDateString()}`);
        throw new Error('An error occured while trying to adding activity');
    }
}

const FitnessPlanService = {
    GetFitnessPlansForUserID,
    AddActivityToFitnessPlan,
}

export { FitnessPlanService as default };