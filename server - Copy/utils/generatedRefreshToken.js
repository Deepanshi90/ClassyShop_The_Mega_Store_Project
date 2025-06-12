import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId) => {
    const token = await jwt.sign(
        // { _id: userId },
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,  // ✅ using the correct env variable
        { expiresIn: '7d' }
    );

    await UserModel.updateOne(
        { _id: userId },
        { refresh_token: token }
    );

    return token;
};

export default generatedRefreshToken;
