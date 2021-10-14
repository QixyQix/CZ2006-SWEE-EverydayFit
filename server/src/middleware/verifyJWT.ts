import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_GENERAL_SK;

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!JWT_SECRET) {
        console.error(`Middleware: AuthenticateToken: No JWT Key`);
        res.status(500).json({ message: 'An error occured while verifying token' });
        return;
    }
    if (!token) {
        console.info(`Middleware: AuthenticateToken: No Token Provided`);
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, JWT_SECRET as string, (err: any, tokenContent: any) => {
        if (err) {
            console.info(`Middleware: AuthenticateToken: Invalid Token`);
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        req.params.user = tokenContent.userID;

        next();
    });
}

export { authenticateToken as default };