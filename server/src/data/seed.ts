import Exercise from "../models/exercise";
import ExerciseSeed from './exerciseSeed';

const SeedDatabase = async() => {
    try{
        await Exercise.insertMany(ExerciseSeed);
        console.log(`Exercise data seeded`);
    } catch (err){
        console.error("Exercise data seeding error")
    }
};

export { SeedDatabase as default };