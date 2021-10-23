import ExerciseRepo from "../repo/exerciseRepo";

const GetAllExercises = async()=>{
    try{
        const exercises = await ExerciseRepo.GetAllExercises();
        return exercises;
    }catch(err){
        console.error(`ExerciseService: GetAllExercises: Unable to get all Exercise data`);
        throw new Error('An error occured while trying to retrieve exercise data');
    }
}

const GetAlternativeForExerciseID=async(exerciseID:string)=>{
    try{
        const exercise = await ExerciseRepo.GetExerciseByID(exerciseID);
        if(!exercise){
            console.error(`ExerciseService: GetAlternativeForExerciseID: No exercise by the ID ${exerciseID} found`);
            throw new Error(`Unable to find exercise by ID ${exerciseID}`);
        }
        const exerciseCategory = exercise.category;
        const alternatives = await ExerciseRepo.GetExerciseByCategory(exerciseCategory, false);
        return alternatives
    }catch(err){
        console.error(`ExerciseService: GetAlternativeForExerciseID: An error occured while trying to retrieve alternative exercises`);
        throw new Error(`An error occured while trying to find alternatives for exercise`);
    }
}

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
    GetAllExercises,
    GetAlternativeForExerciseID,
    GetExerciseByName,
}

export { ExerciseService as default };