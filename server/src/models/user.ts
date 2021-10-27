import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: string,
    name: string,
    email: string,
    hashedPassword: string
    expoToken: string
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
    expoToken: String,
});

const User = mongoose.model<IUser>('user', userSchema);

export { User as default };