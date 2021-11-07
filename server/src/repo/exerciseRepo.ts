import Exercise from '../models/exercise';
import mongoose from 'mongoose';
import { EExerciseCategory } from '../models/constants';

const checkValidObjectID = (id: string) => {
    return mongoose.isValidObjectId(id);
}

const GetAllExercises = async () => {
    try {
        const exercises = await Exercise.find();
        return exercises;
    } catch (err) {
        console.error(`ExerciseRepo: GetAllExercises: ${err.message}`);
        throw new Error(`An error occured while retrieving all exercises`);
    }
}

const GetExerciseByID = async (exerciseID: string) => {
    try {
        if (!checkValidObjectID(exerciseID)) {
            console.error(`ExerciseRepo: GetExerciseByID: Invalid exercise ID: ${exerciseID}`);
            throw new Error(`Invalid exerciseID`);
        }
        const exercise = await Exercise.findById(exerciseID);
        return exercise;
    } catch (err) {
        console.error(`ExerciseRepo: GetExerciseByID: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by ID`);
    }
}

const GetExerciseByCategory = async (exerciseCategory: EExerciseCategory, outdoorOnly: boolean) => {
    try {
        if (!outdoorOnly) {
            const exercises = Exercise.find({ category: exerciseCategory, outdoorOnly })
            return exercises;
        } else {
            const exercises = Exercise.find({ category: exerciseCategory })
            return exercises;
        }
    } catch (err) {
        console.error(`ExerciseRepo: GetExerciseByCategory: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by category`);
    }
}

const GetExerciseByName = async (exerciseName: string) => {
    try {
        const exercise = await Exercise.findOne({ name: exerciseName });
        return exercise;
    } catch (err) {
        console.error(`ExerciseRepo: GetExerciseByName: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by exercise name`);
    }
}

const ExerciseRepo = {
    GetAllExercises,
    GetExerciseByID,
    GetExerciseByCategory,
    GetExerciseByName,
}

export { ExerciseRepo as default };