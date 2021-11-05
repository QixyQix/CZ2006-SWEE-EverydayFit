import { Request, Response } from 'express';
import AuthService from '../service/authService';

const Register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
  if (!email.match(emailRegex)) {
    console.error(`AuthController: Login: Invalid email string: ${email}`)
    return res.status(500).json({ message: 'Email must be in name@email.com format' });
  }else if (email.length > 300){
    console.error(`AuthController: Login: Invalid email string: ${email}`)
    return res.status(500).json({ message: 'Email is too long' });
  }

  if (password.length < 6 || password.lenth > 50){
    console.error(`AuthController: Login: Invalid password string: ${email}`)
    return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
  }

  try {
    const tokens = await AuthService.Register(email, name, password);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const emailRegex = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
  if (!email.match(emailRegex)) {
    console.error(`AuthController: Login: Invalid email string: ${email}`)
    return res.status(500).json({ message: 'Email must be in name@email.com format' });
  }else if (email.length > 300){
    console.error(`AuthController: Login: Invalid email string: ${email}`)
    return res.status(500).json({ message: 'Email is too long' });
  }

  if (password.length < 6 || password.length > 50){
    console.error(`AuthController: Login: Invalid password string: ${email}`)
    return res.status(500).json({ message: 'Password should be within length of 6 - 50.' });
  }

  try {
    const result = await AuthService.Login(email, password);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const Refresh = async (req: Request, res: Response) => {
  const userID = req.params.user;

  try {
    const result = await AuthService.RefreshToken(userID);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const SetExpoToken = async (req: Request, res: Response) => {
  const userID = req.params.user;
  const { expoToken } = req.body;

  if (!expoToken){
    console.error(`AuthController: Login: Invalid expo token: ${expoToken}`)
    return res.status(500).json({ message: 'Expo token detaill is null' });
  }

  try {
    const result = await AuthService.SetUserExpoToken(userID, expoToken);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const AuthController = {
  Register,
  Login,
  Refresh,
  SetExpoToken
};

export { AuthController as default };