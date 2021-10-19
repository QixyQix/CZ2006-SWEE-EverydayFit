import ExerciseRepo from "../repo/exerciseRepo";

const GetExerciseByName = async (exerciseName: string) => {
    try {
        const exercises = await ExerciseRepo.GetExerciseByName(exerciseName)
        return exercises;
    } catch (err) {
        console.error(`ExerciseService: GetExercise: Unable to get exercise data for use ${exerciseName}`);
        throw new Error('An error occured while trying to retrieve exercise data');
    }
}

const ExerciseService = {
    GetExerciseByName,
}

export { ExerciseService as default };