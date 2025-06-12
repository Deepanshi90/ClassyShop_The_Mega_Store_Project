import { Router } from 'express';
// import { forgotPasswordController, loginController, logoutController, refreshToken, registerUserController, resetpassword, updateUserDetails, userDetails, verifyEmailController, verifyForgotPasswordOtp } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
// import upload from '../middleware/multer.js';

import {registerUserController, verifyEmailController,loginUserController,logoutController,userAvatarController,removeImageFromCloudinary,updateUserDetails, forgotPasswordController, verifyForgotPasswordOtp, resetpassword, refreshToken, userDetails, resetpasswordNotOld, authWithGoogle, addReview, getReviews, getAllUsers, getAllReviews, deleteMultiple} from "../controllers/user.controller.js";
import upload from '../middleware/multer.js';

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.post('/authWithGoogle', authWithGoogle);
userRouter.get('/logout',auth,logoutController);
// userRouter.get('/logout',auth,logoutController);
// userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
// userRouter.put('/update-user', auth, updateUserDetails);
userRouter.put('/:id', auth, updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password', resetpassword);
userRouter.post('/reset-password2', resetpasswordNotOld);
userRouter.post('/refresh-token', refreshToken);
userRouter.get('/user-details', auth, userDetails);
userRouter.post('/addReview', auth, addReview);
userRouter.get('/getReview', auth, getReviews);
userRouter.get('/getAllUsers', auth, getAllUsers);
userRouter.get('/getAllReviews', auth, getAllReviews);

userRouter.delete('/deleteMultiple',auth,deleteMultiple);

export default userRouter;
