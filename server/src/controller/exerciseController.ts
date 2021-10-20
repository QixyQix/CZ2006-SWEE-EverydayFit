import { Request, Response } from 'express';
import ExerciseService from "../service/exerciseService";

const GetExercise = async (req: Request, res: Response) => {
    const exerciseName = req.params.exerciseName
    if (!exerciseName){
        return res.status(401).json({ message: 'Exercise not found'})
    }
    try{
        const exercise = await ExerciseService.GetExerciseByName(exerciseName);
        res.json(exercise);
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
}

const ExerciseController = {
    GetExercise,
}

export { ExerciseController as default };