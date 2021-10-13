import mongoose from 'mongoose';
import { IUser } from './user';

export interface IRefreshToken extends mongoose.Document {
    _id: string,
    user: IUser['_id'],
    token: string,
    generatedAt: Date,
    expiresAt: Date,
}

const refreshTokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    token: { type: String, unique: true },
    generatedAt: Date,
    expiresAt: Date,
});

const RefreshToken = mongoose.model<IRefreshToken>('refreshToken', refreshTokenSchema);

export { RefreshToken as default };