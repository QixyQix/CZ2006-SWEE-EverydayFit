import { Request, Response } from 'express';
import ExerciseService from "../service/exerciseService";

const GetAllExercises = async (req: Request, res: Response) => {
    try {
        const exercises = await ExerciseService.GetAllExercises();
        res.json(exercises);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const GetAlternativeForExerciseID = async (req: Request, res: Response) => {
    try {
        const { exerciseID } = req.params;
        const alternatives = await ExerciseService.GetAlternativeForExerciseID(exerciseID);
        res.json(alternatives);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const GetExercise = async (req: Request, res: Response) => {
    const exerciseName = req.params.exerciseName
    if (!exerciseName) {
        return res.status(401).json({ message: 'Exercise not found' })
    }
    try {
        const exercise = await ExerciseService.GetExerciseByName(exerciseName);
        res.json(exercise);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const ExerciseController = {
    GetAllExercises,
    GetAlternativeForExerciseID,
    GetExercise,
}

export { ExerciseController as default };