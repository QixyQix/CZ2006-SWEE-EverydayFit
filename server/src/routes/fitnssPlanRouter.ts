import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import FitnessPlanController from '../controller/fitnessPlanController';

const router = Express.Router();

router.get('/',VerifyJWTToken, FitnessPlanController.GetFitnessPlans);

export { router as default };