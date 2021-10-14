import { Request, Response } from 'express';
import AuthService from '../service/authService';

const Register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const tokens = await AuthService.Register(email, name, password);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.Login(email, password);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const AuthController = {
  Register,
  Login
};

export { AuthController as default };