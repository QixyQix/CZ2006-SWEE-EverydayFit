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

const AddActivityToFitnessPlan = async (fitnessPlanID: string, userID: string, exerciseID: string, quantity: number, sets: number) => {
    try {
        const fitnessPlan = await FitnessPlanRepo.GetFitnessPlanByID(fitnessPlanID);
        if (!fitnessPlan) {
            console.error(`FitnessPlanService: AddActivityToFitnessPlan: Fitness plan does not exist ${fitnessPlanID}`);
            throw new Error('An error occured while trying to retrieve fitness plans');
        }

        if (fitnessPlan.owner !== userID) {
            console.error(`FitnessPlanService: AddActivityToFitnessPlan: User ${userID} attempted to modify fitness plan ${fitnessPlanID} belonging to ${fitnessPlan.owner}`);
            throw new Error('You do not own this fitness plan!');
        }

        const result = await FitnessPlanRepo.AddActivityToFitnessPlan(fitnessPlanID, exerciseID, quantity, sets);
        return result;
    } catch (err) {
        console.error(`FitnessPlanService: AddActivityToFitnessPlan: An error occured while adding activity to fitness plan ${fitnessPlanID}`);
        throw new Error('An error occured while trying to adding activity');
    }
}

const FitnessPlanService = {
    GetFitnessPlansForUserID,
    AddActivityToFitnessPlan,
}

export { FitnessPlanService as default };