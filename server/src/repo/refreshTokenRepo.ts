import RefreshToken from '../models/refreshToken';

const CreateRefreshToken = async (userID: string, token: string) => {

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    const newRefreshToken = new RefreshToken({
        user: userID,
        token,
        generatedAt: new Date(),
        expiresAt: expiry,
    });

    try {
        await newRefreshToken.save();
    } catch (err) {
        console.error(`RefreshTokenRepo: CreateRefreshToken: An error occured while saving refresh token`);
        throw new Error('An error occured while saving refresh token');
    }

}

const RefreshTokenRepo = {
    CreateRefreshToken
}

export { RefreshTokenRepo as default };
