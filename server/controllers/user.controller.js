import UserModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { error } from "console";

// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide name, email, and password",
                error: true,
                success: false
            });
        }

        let user = await UserModel.findOne({ email : email });
        if (user) {
            return response.json({
                message: "User already registered with this email",
                error: true,
                success: false
            });
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user = new UserModel({
            name,
            email,
            password: hashPassword,
            otp: verifyCode,
            otpExpires: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        await user.save();

        // Send verification email
        await sendEmailFun({
            sendTo: email,
            subject: "Verify Your Email - Ecommerce App",
            text: "",
            html: VerificationEmail(name, verifyCode)
        });

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        return response.status(200).json({
            success: true,
            message: "User registered successfully! Please verify your email",
            token
        });

    } catch (error) {
        console.error("Register Error:", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// export async function verifyEmailController(request, response) {
//     try {
//         const { email, otp } = request.body;
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return response.status(400).json({
//                 error: true,
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         const isCodeValid = user.otp === otp.toString();
//         const isNotExpired = user.otpExpires > Date.now();

//         if (isCodeValid && isNotExpired) {
//             user.verify_email = true,
//                 user.otp = null,
//                 user.otpExpires = null,
//                 await user.save();
//             return response.status(200).json({
//                 error: false,
//                 success: true,
//                 message: "Email verified Successfully"
//             });
//         } else if (!isCodeValid) {
//             return response.status(400).json({
//                 error: true,
//                 success: false,
//                 message: "Invaild OTP"
//             })
//         }
//         else {
//             return response.status(400).json({
//                 error: true,
//                 success: false,
//                 message: "OTP expired"
//             })
//         }

//         if (!user) {
//             return response.status(400).json({
//                 message: "Invalid code",
//                 error: true,
//                 success: false
//             })
//         }
//     } catch (error) {
//         console.error("Register Error:", error);
//         return response.status(500).json({
//             message: error.message || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "User not found"
            });
        }

        const isCodeValid = String(user.otp) === String(otp);
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return response.status(200).json({
                error: false,
                success: true,
                message: "Email verified Successfully"
            });
        } else if (!isCodeValid) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "Invalid OTP"
            });
        } else {
            return response.status(400).json({
                error: true,
                success: false,
                message: "OTP expired"
            });
        }
    } catch (error) {
        console.error("Verify Error:", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}


export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Connect to admin ",
                error: false,
                success: true
            })
        }

        if (user.verify_email !== true ) {
            return response.status(400).json({
                message: "Your Email is not verify yet please verify your email first ",
                error: false,
                success: true
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return response.status(500).json({
                message: "Check your password ",
                error: true,
                success: false
            })
        }

        const accesstoken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);
        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accesstoken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accesstoken, 
                refreshToken
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// logout controller
// export async function logoutController(request, response) {
//     try {
//         const userid = request.userId;

//         const cookiesOption = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None"
//         }
//         response.clearCookie('accessToken', cookiesOption)
//         response.clearCookie('refreshToken', cookiesOption)

//         const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
//             refresh_token: ""
//         })
//         return response.status(400).json({
//             message: "Logout Successfully",
//             error: false,
//             success: true
//         })

//     } catch (error) {
//         console.error("Logout Error:", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }


export async function logoutController(request, response) {
    try {
        // Ensure the user is authenticated and the userId is set correctly
        const userid = request.userId;
        if (!userid) {
            return response.status(401).json({
                message: "User is not authenticated",
                error: true,
                success: false
            });
        }

        // Log the tokens (optional) to check if they are present in the request
        console.log("Access Token:", request.cookies.accessToken);
        console.log("Refresh Token:", request.cookies.refreshToken);

        // Clear cookies for logout
        const cookiesOption = {
            httpOnly: true,
            secure: true,  // Ensure this works in production with HTTPS
            sameSite: "None"
        };

        response.clearCookie('accessToken', cookiesOption);
        response.clearCookie('refreshToken', cookiesOption);

        // Remove refresh token from the user's record in the database
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""  // Clear refresh token from the DB
        });

        // Return success response with a proper status code
        return response.status(200).json({
            message: "Logout Successfully",
            error: false,
            success: true
        });

    } catch (error) {
        console.error("Logout Error:", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}


// image uplaoad
var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];
        const userId = request.userId;
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId });
        const userAvatar = user.avatar;

        // forst remove image from cloudninary
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];
        const imageName = avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName, (error, result) => {
                    // console.log(error,res);

                }
            )
        }

        if (!user) {
            console.error("User not found", error);
            return response.status(500).json({
                message: "Something went wrong",
                error: true,
                success: false,
            });
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        }

        for (let i = 0; i < request?.files?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    console.log(result);
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    console.log(request.files[i].filename);

                }
            )
        }

        user.avatar = imagesArr[0];
        await user.save();
        return response.status(200).json({
            _id: userId,
            avtar: imagesArr[0]
        })
    } catch (error) {
        console.error("Image Loding  Error from cloudinary:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }

}


// export async function userAvatarController(req, res) {
//     try {
//       const userId = req.userId;
//       const images = req.files; // ✅ fixed from req.file to req.files

//       if (!images || images.length === 0) {
//         return res.status(400).json({ message: "No image uploaded" });
//       }

//       const uploadedImages = [];

//       for (const file of images) {
//         const result = await cloudinary.uploader.upload(file.path, {
//           use_filename: true,
//           unique_filename: false,
//           overwrite: false,
//         });

//         uploadedImages.push(result.secure_url);

//         // delete the local file
//         fs.unlinkSync(file.path);
//       }

//       return res.status(200).json({
//         _id: userId,
//         avatar: uploadedImages[0], // send only first uploaded image URL
//       });
//     } catch (error) {
//       console.error("Cloudinary upload error:", error);
//       return res.status(500).json({
//         message: error.message || "Something went wrong",
//         error: true,
//         success: false,
//       });
//     }
//   }

export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;
        const userId = request.userId;


        if (!imgUrl) {
            return response.status(400).json({
                message: "Image URL is required",
                error: true,
                success: false,
            });
        }

        // Extracting the image public ID from URL
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        if (!imageName) {
            return response.status(400).json({
                message: "Invalid image URL format",
                error: true,
                success: false,
            });
        }

        // Destroy image from Cloudinary
        const res = await cloudinary.uploader.destroy(imageName);

        if (res.result === "ok") {
            return response.status(200).json({
                message: "Image removed successfully from Cloudinary",
                success: true,
            });
        } else {
            return response.status(500).json({
                message: "Failed to remove image from Cloudinary",
                error: true,
                success: false,
            });
        }
    } catch (error) {
        console.error("Error removing image from Cloudinary:", error);
        return response.status(500).json({
            message: "Something went wrong",
            error: true,
            success: false,
        });
    }
}

// update user details 
export async function updateUserDetails(request, response) {

    try {
        const userId = request.userId;
        const { name, email, mobile, password } = request.body;
        const userExist = await UserModel.findById(userId);
        if (!userExist) {
            return response.status(400).send("The user does not exist. So, we cannot update the user details");
        }
        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        } else {
            hashPassword = userExist.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId, {
            name: name,
            mobile: mobile,
            email: email,
            verify_email: email !== userExist.email ? false : true,
            password: hashPassword,
            otp: verifyCode !== "" ? verifyCode : null,
            otpExpires: verifyCode !== "" ? Date.now() + 600000 : ''
        },
            { new: true }
        )

        if (email !== userExist.email) {
            // Send verification email
            await sendEmailFun({
                sendTo: email,
                subject: "Verify email for Ecommerce App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })
        }
        return response.json({
            message:"User Updated Successfully",
            error: false,
            success:true,
            user:updateUser
        })

    } catch (error) {
        console.error("User update Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// forget password not login
export async function forgotPasswordController(request,response) {
    try {
        const {email} = request.body;
        
        const user = await UserModel.findOne({email:email});
        // console.log(user);
        if(!user){
            return response.status(400).json({
                message:"Email not availabe",
                error:true,
                success:false
            })
        }else{
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp  = verifyCode 
            user.otpExpires = Date.now() + 600000 ;

            await user.save();
    
            await sendEmailFun({
                sendTo: email,
                subject: "Verify OTP for Ecommerce App",
                text: "",
                html: VerificationEmail(user.name , verifyCode)
            })
    
            return response.json({
                message:"Check your email, OTP sent to your email Successfully ",
                error:false,
                success:true
            })
        }

       
    } catch (error) {
        console.error("Forget Password Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }    
}

// verify forgot password otp
export async function verifyForgotPasswordOtp(request,response) {
    try {
        const {email,otp} = request.body;

    const user = await UserModel.findOne({email:email});
        // console.log(user);
        if(!user){
            return response.status(400).json({
                message:"Email not availabe",
                error:true,
                success:false
            })
        }

        if(!email || !otp){
            return response.status(400).json({
                message:"Provide the required fields email , otp",
                error : true,
                success:false
            })
        }
    if(otp !== user.otp){
        return response.status(400).json({
            message:"Invalid OTP",
            error:true,
            success:false
        })
    }

    const currentTime = new Date().toISOString()

    if(user.otpExpires < currentTime){
        return response.status(400).json({
            message:"OTP expires",
            error:true,
            success:false
        })
    }

    user.otp = "";
    user.otpExpires = "";
    await user.save();

    return response.status(200).json({
        message:"OTP Verified successfully",
        error:false,
        success:true
    })
    } catch (error) {
        console.error("Forget Password OTP Verify Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// reset the password 

export async function resetpassword(request,response) {
    try {
        const {email , newPassword, confirmPassword} = request.body;

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message:"Provide required fields email, newPassword , confirm Password",
                error:true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})
        if(!user){
            return response.status(400).json({
                message:"Email not available",
                error:true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message:"Password does not matched",
                error:true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(confirmPassword, salt);

        user.password = hashPassword;
        await user.save();

        return response.status(200).json({
            message:"Password Changed successfully",
            error:false,
            success:true
        })
    } catch (error) {
        console.error("Reset Password Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }    
}
// refresh token controller write 
// export async function refreshToken(request,response) {
//     try {
//         const refreshToken = request.cookie.refreshToken || request?.headers?.authorization?.split(" ")[1] //Bearer token

//         if(!refreshToken){
//             return response.status(401).json({
//                 message:"Invalid Token",
//                 error:true,
//                 success:false
//             })
//         }
        
//         const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

// if (!verifyToken) {
//     return response.status(401).json({
//         message: "Token is expired",
//         error: true,
//         success: false
//     });
// }

// const userId = verifyToken?._id;

// const newAccessToken = await generatedAccessToken(userId);

// const cookiesOption = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "None"
// };

// response.cookie('accessToken', newAccessToken, cookiesOption);

// return response.json({
//     message: "New Access token generated",
//     error: false,
//     success: true,
//     data: {
//         accessToken: newAccessToken
//     }
// });

//     } catch (error) {
//         console.error("Refresh Token Error:", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
    
// }

export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies?.refreshToken || request?.headers?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return response.status(401).json({
                message: "Refresh Token missing",
                error: true,
                success: false
            });
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        } catch (err) {
            return response.status(401).json({
                message: "Token is expired or invalid",
                error: true,
                success: false
            });
        }

        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.cookie('accessToken', newAccessToken, cookiesOption);

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get login user details
export async function userDetails(request,response) {
    try {
        
        const userId = request.userId;
        
        const user = await UserModel.findById(userId).select('-password -refresh_token');

        return response.json({
            message: 'User details',
            data: user,
            error: false,
            success: true
        });


    } catch (error) {
        console.error("Login User Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
    
}