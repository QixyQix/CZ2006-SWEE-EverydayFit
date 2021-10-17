import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import FitnessPlanController from '../controller/fitnessPlanController';

const router = Express.Router();

router.get('/',VerifyJWTToken, FitnessPlanController.GetFitnessPlans);
router.post('/:date/activity',VerifyJWTToken, FitnessPlanController.AddActivityToFitnessPlan);

export { router as default };