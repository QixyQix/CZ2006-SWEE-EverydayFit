import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import FitnessPlanController from '../controller/fitnessPlanController';

const router = Express.Router();

router.get('/',VerifyJWTToken, FitnessPlanController.GetFitnessPlans);
router.get('/:date', VerifyJWTToken, FitnessPlanController.GetDateFitnessPlanForUser);
router.post('/:date/activity',VerifyJWTToken, FitnessPlanController.AddActivityToFitnessPlan);
router.delete('/:date/activity',VerifyJWTToken, FitnessPlanController.DeleteActivityFromFitnessPlan);
router.patch('/:date/activity',VerifyJWTToken, FitnessPlanController.EditActivityFromFitnessPlan);

export { router as default };