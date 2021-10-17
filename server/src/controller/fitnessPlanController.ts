import { Request, Response } from 'express';
import FitnessPlanService from "../service/FitnessPlanService";

const GetFitnessPlans = async (req: Request, res: Response) => {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' })
    }
    try {
        const fitnessPlans = await FitnessPlanService.GetFitnessPlansForUserID(userID);
        return res.json(fitnessPlans)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const AddActivityToFitnessPlan = async (req: Request, res: Response) => {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' })
    }

    const { exerciseID, quantity, sets } = req.body;
    const { fitnessPlanID } = req.params;

    try {
        const result = await FitnessPlanService.AddActivityToFitnessPlan(fitnessPlanID, userID, exerciseID, quantity, sets);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const FitnessPlanController = {
    GetFitnessPlans,
    AddActivityToFitnessPlan
}

export {FitnessPlanController as default};