import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
    const token = await jwt.sign(
        // { id: userId },
        { _id: userId }, // ✅ use _id instead of id
        process.env.SECRET_KEY_ACCESS_TOKEN,  // ✅ using the correct env variable
        { expiresIn: '5h' }
    );
    return token;
};

export default generatedAccessToken;
