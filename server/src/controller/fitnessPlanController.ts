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

const GetDateFitnessPlanForUser = async (req: Request, res: Response) => {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' })
    }

    const { date } = req.params;

    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: GetDateFitnessPlanForUser: Invalid date string: ${date}`)
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }

    const dateObj = new Date(date);
    try {
        const result = await FitnessPlanService.GetDateFitnessPlanForUser(userID, dateObj);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message })
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

const DeleteActivityFromFitnessPlan = async (req: Request, res: Response) => {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' })
    }

    const { activityID } = req.body;
    const { date } = req.params;

    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: DeleteActivityFromFitnessPlan: Invalid date string: ${date}`)
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }

    const dateObj = new Date(date);
    try {
        const result = await FitnessPlanService.DeleteActivityFromFitnessPlan(userID, dateObj, activityID);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const EditActivityFromFitnessPlan = async (req: Request, res: Response) => {
    const userID = req.params.user;
    if (!userID) {
        return res.status(401).json({ message: 'User not found' })
    }

    const { activityID, exerciseID, quantity, sets, done } = req.body;
    const { date } = req.params;

    const dateRegex = /^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    if (!date.match(dateRegex)) {
        console.error(`FitnessPlanController: EditActivityFromFitnessPlan: Invalid date string: ${date}`)
        return res.status(500).json({ message: 'Date must be in yyyy-MM-dd format' });
    }

    const dateObj = new Date(date);
    try {
        const result = await FitnessPlanService.EditActivityFromFitnessPlan(userID, dateObj, activityID, exerciseID, quantity, sets, done);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const FitnessPlanController = {
    GetFitnessPlans,
    GetDateFitnessPlanForUser,
    AddActivityToFitnessPlan,
    DeleteActivityFromFitnessPlan,
    EditActivityFromFitnessPlan,
}

export { FitnessPlanController as default };