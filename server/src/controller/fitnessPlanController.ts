import { Request, Response } from 'express';
import FitnessPlanService from "../service/fitnessPlanService";

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
    const { date } = req.params;

    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: AddActivityToFitnessPlan: Invalid date string: ${date}`)
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }

    const dateObj = new Date(date);
    try {
        const result = await FitnessPlanService.AddActivityToFitnessPlan(userID, dateObj, exerciseID, quantity, sets);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const FitnessPlanController = {
    GetFitnessPlans,
    AddActivityToFitnessPlan
}

export { FitnessPlanController as default };