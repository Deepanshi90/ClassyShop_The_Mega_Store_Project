import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1];
        console.log("Received token:", token);


        if (!token) {
            return response.status(401).json({
                message: "Provide token",
                error: true,
                success: false
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return response.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        request.userId = decode.id;  // ✅ Fix here
        next();  // ✅ Ensure next is called
    } catch (error) {
        return response.status(500).json({
            message: "You have not logged in and error from auth",
            error: true,
            success: false
        });
    }
};

export default auth;



// import jwt from "jsonwebtoken";
// 🔹 Purpose:
// Imports the jsonwebtoken library, which is used to sign, verify, and decode JWT tokens.

// 🔹 Example:
// JWT token looks like this:

// Copy
// Edit
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// const auth = async (request, response, next) => {
// 🔹 Purpose:
// Defines a middleware function named auth.
// Middleware functions have access to:

// request → the incoming request data,

// response → the response you can send,

// next → the function to call to move to the next middleware or controller.

// 🔹 Use Case:
// We use it to check if the user is logged in before allowing access to a protected route.

// js
// Copy
// Edit
//     try {
// 🔹 Purpose:
// Start of a try...catch block to handle any unexpected errors (e.g., if token is invalid or expired).

// js
// Copy
// Edit
//         const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1];
// 🔹 Purpose:
// Attempts to get the JWT token from either:

// request.cookies.accessToken → If token is stored in cookies.

// Authorization header → Typically sent as:

// makefile
// Copy
// Edit
// Authorization: Bearer <token>
// So .split(" ")[1] grabs just the <token> part.

// 🔹 Example 1 (From Header):

// http
// Copy
// Edit
// Authorization: Bearer abc.def.ghi
// Result: token = "abc.def.ghi"

// 🔹 Example 2 (From Cookies):

// js
// Copy
// Edit
// cookies = {
//   accessToken: "abc.def.ghi"
// }
// Result: token = "abc.def.ghi"

// js
// Copy
// Edit
//         console.log("Received token:", token);
// 🔹 Purpose:
// Logs the token received for debugging.
// ✅ Safe to remove in production.

// js
// Copy
// Edit
//         if (!token) {
//             return response.status(401).json({
//                 message: "Provide token",
//                 error: true,
//                 success: false
//             });
//         }
// 🔹 Purpose:
// If no token is found, respond with HTTP 401 Unauthorized.

// 🔹 Example Response:

// json
// Copy
// Edit
// {
//   "message": "Provide token",
//   "error": true,
//   "success": false
// }
// js
// Copy
// Edit
//         const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
// 🔹 Purpose:
// Verifies the token using a secret key (usually stored in your .env file).
// If the token is valid, decode contains the user’s data that was used while creating the token (e.g., id, email, etc.)

// 🔹 Example .env:

// ini
// Copy
// Edit
// SECRET_KEY_ACCESS_TOKEN=MySuperSecretKey
// 🔹 Example decoded token:

// js
// Copy
// Edit
// {
//   id: "65fdbe2faba79e6e5df3cce1",
//   email: "user@example.com",
//   iat: 1717000212,
//   exp: 1717003812
// }
// js
// Copy
// Edit
//         if (!decode) {
//             return response.status(401).json({
//                 message: "Unauthorized access",
//                 error: true,
//                 success: false
//             });
//         }
// 🔹 Purpose:
// Even though rare, if decoding fails silently (e.g., empty payload), this check ensures we return a 401 Unauthorized.

// js
// Copy
// Edit
//         request.userId = decode.id;
// 🔹 Purpose:
// Add the userId from the decoded token to the request object.
// This makes it accessible in the next controller, like:

// js
// Copy
// Edit
// const user = await UserModel.findById(request.userId);
// js
// Copy
// Edit
//         next();  // ✅ Ensure next is called
// 🔹 Purpose:
// Important! Calls the next middleware or the route’s controller.
// Without next(), the request will hang forever.

// js
// Copy
// Edit
//     } catch (error) {
//         return response.status(500).json({
//             message: "You have not logged in and error from auth",
//             error: true,
//             success: false
//         });
//     }
// 🔹 Purpose:
// If there's any error in verifying the token or code execution, return a 500 Internal Server Error.

// 🔹 Example Error Response:

// json
// Copy
// Edit
// {
//   "message": "You have not logged in and error from auth",
//   "error": true,
//   "success": false
// }
// js
// Copy
// Edit
// export default auth;
// 🔹 Purpose:
// Exports the middleware so it can be imported and used in other files like:

// js
// Copy
// Edit
// import auth from "../middlewares/auth.js";
// ✅ How It's Used in Real Code
// ✅ Route File (e.g. user.routes.js)
// js
// Copy
// Edit
// import auth from "../middlewares/auth.js";
// import { getUserProfile } from "../controllers/user.controller.js";

// router.get('/profile', auth, getUserProfile);
// /profile is a protected route.

// Before hitting getUserProfile, the auth middleware verifies the token.

// ✅ Summary
// Line	Function
// import jwt	Load JWT module
// auth = (req, res, next)	Middleware to verify user
// const token = ...	Get token from cookies or headers
// jwt.verify(...)	Decode & validate token
// req.userId = decode.id	Attach user ID to request
// next()	Move to the next function
// catch	Handle any errors
// export default	Make the function reusable



        // if(!token){
        //     token = request.query.token;
        // }
        
// import jwt from "jsonwebtoken";

// const auth = async (request, response, next) => {
//     try {
//         const token = request.cookies?.accessToken || request?.headers?.authorization?.split(" ")[1];
//         console.log("Received token:", token);

//         if (!token) {
//             return response.status(401).json({
//                 message: "Provide token",
//                 error: true,
//                 success: false
//             });
//         }

//         const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

//         request.userId = decode._id; // ✅ Correct if your token has `_id`
//         next();
//     } catch (error) {
//         return response.status(401).json({
//             message: "Invalid or expired token",
//             error: true,
//             success: false
//         });
//     }
// };

// export default auth;

