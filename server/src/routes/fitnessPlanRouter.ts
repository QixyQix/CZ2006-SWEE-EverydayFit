import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import FitnessPlanController from '../controller/fitnessPlanController';

const router = Express.Router();

router.get('/',VerifyJWTToken, FitnessPlanController.GetFitnessPlans);
router.post('/:date/activity',VerifyJWTToken, FitnessPlanController.AddActivityToFitnessPlan);
router.post('/:date/deleteActivity',VerifyJWTToken, FitnessPlanController.DeleteActivityFromFitnessPlan);
router.post('/:date/editActivity',VerifyJWTToken, FitnessPlanController.EditActivityFromFitnessPlan);

export { router as default };