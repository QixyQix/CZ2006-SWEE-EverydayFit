import User from '../models/user';

const CreateUser = async (email: string, name: string, hashedPassword: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    const newUser = new User({
        email: normalizedEmail,
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
    const normalizedEmail = email.trim().toLowerCase();

    try {
        const user = await User.findOne({ email: normalizedEmail });
        return user;
    } catch (err) {
        console.error(`UserRepo: GetUserByEmail: ${err.message}`);
        throw new Error(`An error occured while retrieving user by email`);
    }
}

const GetUserByID = async(userID: string)=>{
    try{
        const user = await User.findById(userID);
        return user;
    }catch(err){
        console.error(`UserRepo: GetUserByID: ${err.message}`);
        throw new Error(`An error occured while retrieving user by ID`);
    }
}

const UserRepo = {
    CreateUser,
    GetUserByEmail,
    GetUserByID,
}

export { UserRepo as default };