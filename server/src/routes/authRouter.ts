import Express from 'express';
import VerifyJWTRefreshToken from '../middleware/verifyRefreshJWT';
import AuthController from '../controller/authController';

const router = Express.Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.post('/refresh', VerifyJWTRefreshToken, AuthController.Refresh);

export { router as default };