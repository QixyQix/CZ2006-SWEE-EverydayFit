import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import AuthController from '../controller/authController';

const router = Express.Router();

router.post('/register', AuthController.Register);

export { router as default };