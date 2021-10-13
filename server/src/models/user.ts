import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: string,
    name: string,
    email: string,
    hashedPassword: string
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
});

const User = mongoose.model<IUser>('user', userSchema);

export { User as default };