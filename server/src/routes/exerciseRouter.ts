import Express from 'express';
import ExerciseController from '../controller/exerciseController';

const router = Express.Router();

router.get('/:exerciseName', ExerciseController.GetExercise)

export { router as default };