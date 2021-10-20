import Exercise from '../models/exercise';

const GetExerciseByName = async (exerciseName:string) => {
    try {
        const exercise = await Exercise.findOne({ name: exerciseName });
        return exercise;
    } catch (err) {
        console.error(`ExerciseRepo: GetExerciseByName: ${err.message}`);
        throw new Error(`An error occured while retrieving exercise by exercise name`);
    }
}

const ExerciseRepo = {
    GetExerciseByName,
}

export { ExerciseRepo as default};