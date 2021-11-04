import UserRepo from '../repo/userRepo';
import RefreshTokenRepo from '../repo/refreshTokenRepo';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


dotenv.config();
const JWT_GENERAL_SK = process.env.JWT_GENERAL_SK || null;
const JWT_REFRESH_SK = process.env.JWT_REFRESH_SK || null;

const GenerateGeneralJWTToken = (userID: string) => {
    if (!JWT_GENERAL_SK) {
        console.error('AuthService: GenerateGeneralJWTToken: No JWT Secret');
        throw new Error('An error occured while trying to generate token');
    }

    try {
        const token = jwt.sign({ userID }, JWT_GENERAL_SK, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('AuthService: GenerateGeneralJWTToken: Failed to sign JWT Token');
        throw new Error('An error occured while trying to generate token');
    }
}

const GenerateRefreshJWTToken = (userID: string) => {
    if (!JWT_REFRESH_SK) {
        console.error('AuthService: GenerateRefreshJWTToken: No JWT Secret');
        throw new Error('An error occured while trying to generate refresh token');
    }

    try {
        const token = jwt.sign({ userID, generatedAt: Date.now() }, JWT_REFRESH_SK, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('AuthService: GenerateRefreshJWTToken: Failed to sign refresh JWT Token');
        throw new Error('An error occured while trying to generate refresh token');
    }
}

const Register = async (email: string, name: string, password: string) => {
    const existingUser = await UserRepo.GetUserByEmail(email.trim());

    if (existingUser) {
        console.info(`AuthService: Register: ${email} already has an account`);
        throw new Error('An account with this email already exists');
    }

    // Hash password
    let hashedPassword = null;
    try {
        hashedPassword = bcrypt.hashSync(password, 10);
    } catch (err) {
        console.log(err);
        console.error(`AuthService: Register: An error occured while trying to hash password for ${email}`);
        throw new Error('An error occured while trying to register account');
    }

    let newUser = null;
    try {
        newUser = await UserRepo.CreateUser(email.trim(), name, hashedPassword);
    } catch (err) {
        console.error(`AuthService: Register: An error occured while trying to create account ${email}`);
        throw new Error('An error occured while trying to create account');
    }

    // Generate tokens
    try {
        const generalToken = GenerateGeneralJWTToken(newUser._id);
        const refreshToken = GenerateRefreshJWTToken(newUser._id);

        await RefreshTokenRepo.CreateRefreshToken(newUser._id, refreshToken);

        return { token: generalToken, refreshToken };
    } catch (err) {
        throw new Error('An error occured while generating authorization tokens')
    }
}

const Login = async (email: string, password: string) => {
    const user = await UserRepo.GetUserByEmail(email.trim());
    if (!user) {
        console.info(`AuthService: Login: Attempt to login for non-existent account ${email}`);
        return { success: false, message: 'Invalid login', token: '', refreshToken: '' };
    }

    if (!bcrypt.compareSync(password, user.hashedPassword)) {
        console.info(`AuthService: Login: Failed login for account ${email}`);
        return { success: false, message: 'Invalid login', token: '', refreshToken: '' };
    }

    try {
        const generalToken = GenerateGeneralJWTToken(user._id);
        const refreshToken = GenerateRefreshJWTToken(user._id);

        await RefreshTokenRepo.CreateRefreshToken(user._id, refreshToken);

        return { success: true, message: 'Successfully logged in', token: generalToken, refreshToken };
    } catch (err) {
        console.error(`AuthService: Login: Error generating tokens for user ${email}`);
        throw new Error('An error occured while logging in');
    }

}

const RefreshToken = async (userID: string) => {
    if (!userID) {
        throw new Error('No user ID');
    }

    try {
        const newToken = GenerateGeneralJWTToken(userID);
        return { token: newToken };
    } catch (err) {
        throw new Error(err.message);
    }
}

const SetUserExpoToken = async (userID: string, expoToken: string) => {
    if (!userID) {
        throw new Error('No user ID');
    }

    const user = await UserRepo.GetUserByEmail(userID)
    if (!user) {
        throw new Error(`User of ID ${userID} not found`);
    }

    user.expoToken = expoToken;
    await user.save();
    return { message: 'Successfully set expo token for user' };
}

const AuthService = {
    Register,
    Login,
    RefreshToken,
    SetUserExpoToken,
}

export { AuthService as default };