import Express from 'express';
import VerifyJWTToken from '../middleware/verifyJWT';
import AuthController from '../controller/authController';

const router = Express.Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);

export { router as default };