import User from '../models/user';

const CreateUser = async (email: string, name: string, hashedPassword: string) => {
    const newUser = new User({
        email,
        name,
        hashedPassword
    });

    try {
        await newUser.save();
        return newUser;
    } catch (err) {
        console.error(`UserRepo: CreateUser: ${err.message}`);
        throw new Error(`An error occured while creating user account`);
    }
}

const GetUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (err) {
        console.error(`UserRepo: GetUserByEmail: ${err.message}`);
        throw new Error(`An error occured while retrieving user by email`);
    }
}

const UserRepo = {
    CreateUser,
    GetUserByEmail,
}

export { UserRepo as default };