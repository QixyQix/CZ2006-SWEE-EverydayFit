import Express from 'express';
import VerifyJWTRefreshToken from '../middleware/verifyRefreshJWT';
import VerifyJWTToken from '../middleware/verifyJWT';
import AuthController from '../controller/authController';

const router = Express.Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.post('/refresh', VerifyJWTRefreshToken, AuthController.Refresh);
router.post('/expoToken', VerifyJWTToken, AuthController.SetExpoToken);
router.post('/logout', VerifyJWTToken, AuthController.Logout);

export { router as default };