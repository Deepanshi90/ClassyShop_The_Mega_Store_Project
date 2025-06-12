// import React, { useContext, useEffect, useState } from 'react'
// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';
// import { IoMdEye } from 'react-icons/io';
// import { IoMdEyeOff } from 'react-icons/io';
// import { Link, useNavigate, useNavigation } from 'react-router-dom';
// import { FcGoogle } from "react-icons/fc";
// import { MyContext } from '../../App';
// import CircularProgress from '@mui/material/CircularProgress';
// import { postData } from '../../utils/api';


// const Login = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [isPasswordShow, setIsPasswordShow] = useState(false);
//     const [formFields, setFormFields] = useState({
//         email: '',
//         password: '',
//     });


//     const context = useContext(MyContext);
//     const history = useNavigate()


//     const forgetPassword = () => {
//         context.openAlertBox("success", "OTP Send")
//         history("/verify");

//     }

//     const onChangeInput = (e) => {
//         const { name, value } = e.target;
//         setFormFields(() => {
//             return {
//                 ...formFields,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(formFields).every(el => el)
//     // console.log(formFields);

//     const handleSubmit = (e) => {

//         e.preventDefault();
//         setIsLoading(true);

//         if (formFields.email === "") {
//             context.alertBox("error", "Please enter valid Email Id")
//             return false;
//         }

//         if (formFields.password === "") {
//             context.alertBox("error", "Please enter Password")
//             return false;
//         }
//         postData("/api/user/login", formFields,{withCredentials: true}).then((res) => {
//             console.log(res);

//             if (res?.error !== true) {
//                 setIsLoading(false);
//                 context.alertBox("success", res?.message)
//                 localStorage.setItem("userEmail", formFields.email)

//                 setFormFields({
//                     email: "",
//                     password: ""
//                 })

//                 // console.log("Access Token to be stored:", res?.data?.accesstoken);
//                 // console.log("Refresh Token to be stored:", res?.data?.refreshToken);

//                 localStorage.setItem("accesstoken", res?.data?.accesstoken);
//                 localStorage.setItem("refreshToken", res?.data?.refreshToken);

//                 // After setting the tokens, log again to verify if they are stored
//                 // console.log("AccessToken from localStorage:", localStorage.getItem("accessToken"));
//                 // console.log("RefreshToken from localStorage:", localStorage.getItem("refreshToken"));

//                 context.setIsLogin(true);

//                 history("/")
//             }
//             else {
//                 context.alertBox("error", res?.message);
//                 setIsLoading(false);
//             }



//         })
//     }


//     return (
//         <section className="section py-10 ">
//             <div className="container">
//                 <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
//                     <h3 className='text-center text-[18px]  text-black'>Login To Your Account</h3>

//                     <form className="w-full mt-5" onSubmit={handleSubmit}>
//                         <div className="form-group w-full mb-5">
//                             <TextField type='email' id="email" label="Email Id" name='email' value={formFields.email} disabled={isLoading === true ? true : false} onChange={onChangeInput} variant="outlined" className='w-full' />
//                         </div>

//                         <div className="form-group w-full mb-5 relative ">
//                             <TextField type={isPasswordShow === true ? 'password' : 'text'} id="password" label="Password" variant="outlined" className='w-full' name='password' value={formFields.password} disabled={isLoading === true ? true : false} onChange={onChangeInput} />
//                             <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => setIsPasswordShow(!isPasswordShow)}>
//                                 {
//                                     isPasswordShow === true ? <IoMdEyeOff className='text-[20px] opacity-75' /> : <IoMdEye className='text-[20px] opacity-75' />
//                                 }
//                             </Button>
//                         </div>

//                         <a href="#" className='link cursor-pointer text-[14px] font-[600]' onClick={forgetPassword}>Forget Password?</a>

//                         <div className="flex items-center w-full mt-3">
//                             <Button type='submit' disabled={!valideValue} className='btn-org w-full btn-lg flex gap-3'>

//                                 {
//                                     isLoading === true ? <CircularProgress color="inherit" /> : 'Login'
//                                 }

//                             </Button>
//                         </div>


//                         <p className='text-center'>Not Registered? <Link className='link text-[14px] font-[600] text-[#ff5252]' to="/register">Sign Up</Link></p>
//                         <p className="text-center font-[500]">or continue with social account</p>

//                         <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'><FcGoogle className='text-[20px]' />Login with Google</Button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Login;



import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {firebaseApp} from "../../firebase";
import { useEffect } from 'react';
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const context = useContext(MyContext);
  const history = useNavigate();

useEffect(() =>{
  window.scrollTo(0,0);
},[])

  // const forgotPassword = () => {

  //   if (formFields.email === "") {
  //     context.alertBox("error", "Please enter email id");
  //     return false;
  //   }
  //   else {
  //     context.alertBox("success", `OTP send to ${formFields.email}`);
  //     localStorage.setItem("userEmail", formFields.email);
  //     localStorage.setItem("actionType", 'forgot-password');

  //     postData("/api/user/forgot-password", {
  //       email: formFields.email,
  //     }).then((res) => {
  //       if (res?.error === false) {
  //         context.alertBox("success", res?.message);
  //         history("/verify");
  //       }
  //       else {
  //         context.alertBox("error", res?.message)
  //       }
  //     })
  //   }

  // };
  const forgotPassword = () =>{
    if(formFields.email === ""){
      context.alertBox("error","Please enter valid email id");
      return false;
    }
    else{
      context.alertBox("success",`OTP sends to your mail id : ${formFields.email}`);
      localStorage.setItem("userEmail",formFields.email);
      localStorage.setItem("actionType",'forgot-password');

      postData("/api/user/forgot-password",{
                email:formFields.email,
              }).then((res) =>{
                console.log(res);
                if(res?.error === false){
                  context.alertBox("success",res?.message);
                  history("/verify");
                }
                else{
                  context.alertBox("error",res?.message);
                }
              })
    }
    
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(formFields).every((el) => el);

  // // const handleSubmit = (e) => {
  // //   e.preventDefault();
  // //   setIsLoading(true);

  // //   if (formFields.email === "") {
  // //     context.alertBox("error", "Please enter valid Email Id");
  // //     setIsLoading(false);
  // //     return false;
  // //   }

  // //   if (formFields.password === "") {
  // //     context.alertBox("error", "Please enter Password");
  // //     setIsLoading(false);
  // //     return false;
  // //   }

  // //   postData("/api/user/login", formFields, { withCredentials: true }).then((res) => {
  // //     console.log("API Response:", res);

  // //     if (res?.error !== true) {
  // //       setIsLoading(false);
  // //       context.alertBox("success", res?.message);

  // //       // Store tokens and email in localStorage
  // //       localStorage.setItem("accessToken", res?.data?.accesstoken);
  // //       localStorage.setItem("refreshToken", res?.data?.refreshToken);
  // //       localStorage.setItem("userEmail", formFields.email);

  // //       // After login success, update context
  // //       context.setIsLogin(true);

  // //       // Reset form fields
  // //       setFormFields({
  // //         email: "",
  // //         password: "",
  // //       });

  // //       history("/");
  // //     } else {
  // //       context.alertBox("error", res?.message);
  // //       setIsLoading(false);
  // //     }
  // //   });
  // // };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.email.trim() === "") {
      context.alertBox("error", "Please enter valid Email Id");
      setIsLoading(false);
      return;
    }

    if (formFields.password.trim() === "") {
      context.alertBox("error", "Please enter Password");
      setIsLoading(false);
      return;
    }

    postData("/api/user/login", formFields , {withCredentials: true}).then((res) => {
      console.log("API Response:", res);

      if (res?.error !== true) {
         setIsLoading(true);
        context.alertBox("success", res?.message);

        setFormFields({ email: "", password: "" });

         // // Save tokens
         localStorage.setItem("accessToken", res?.data?.accesstoken);
         localStorage.setItem("refreshToken", res?.data?.refreshToken);
         localStorage.setItem("userEmail", formFields.email);
 
         context.setIsLogin(true);
        history("/"); // ✅ use navigate, not history
      } else {
        context.alertBox("error", res?.message);
        context.setIsLoading(false);
      }
      
    }).catch((err) => {
      console.error(err);
      context.alertBox("error", "Something went wrong!");
      setIsLoading(false);
    });
  };

const authWithGoogle =() =>{
        // alert()
        signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    
    const fields = {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        password: null,
        avatar: user.providerData[0].photoURL,
        mobile: user.providerData[0].phoneNumber,
        role:"USER"
    }

      postData("/api/user/authWithGoogle",fields).then((res)=>{
            console.log(res);

            if(res?.error !== true){
                setIsLoading(false);
                context.alertBox ("success",res?.message)
                localStorage.setItem("userEmail",fields.email)
                  localStorage.setItem("accessToken", res?.data?.accesstoken);
         localStorage.setItem("refreshToken", res?.data?.refreshToken);
         context.setisLogin(true);
                
            history("/")
            }
            else{
                context.alertBox ("error",res?.message);
                setIsLoading(false);
            }

            
            
        })

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }
  return (
    <section className="section py-10 ">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className='text-center text-[18px] text-black'>Login To Your Account</h3>

          {/* <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type='email'
                id="email"
                label="Email Id"
                name='email'
                value={formFields.email}
                disabled={isLoading === true}
                onChange={onChangeInput}
                variant="outlined"
                className='w-full'
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? 'password' : 'text'}
                id="password"
                label="Password"
                variant="outlined"
                className='w-full'
                name='password'
                value={formFields.password}
                disabled={isLoading === true}
                onChange={onChangeInput}
              />
              <Button
                className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? <IoMdEyeOff className='text-[20px] opacity-75' /> : <IoMdEye className='text-[20px] opacity-75' />}
              </Button>
            </div>

            <a href="#" className='link cursor-pointer text-[14px] font-[600]' onClick={forgotPassword}>Forgot Password?</a>

            <div className="flex items-center w-full mt-3">
              <Button type='submit' disabled={!valideValue} className='btn-org w-full btn-lg flex gap-3'>
                {isLoading ? <CircularProgress color="inherit" /> : 'Login'}
              </Button>
            </div>

            <p className='text-center'>Not Registered? <Link className='link text-[14px] font-[600] text-[#ff5252]' to="/register">Sign Up</Link></p>
            <p className="text-center font-[500]">or continue with social account</p>

            <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'>
              <FcGoogle className='text-[20px]' />Login with Google
            </Button>
          </form> */}

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ?  "password" : "text" }
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <a
              href="#"
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              Forgot Password?
            </a>

            <div className="flex items-center w-full mt-3">
              <Button
                type="submit"
                disabled={!valideValue}
                className="btn-org w-full btn-lg flex gap-3"
              >
                {isLoading === true ? <CircularProgress color="inherit" size={24} /> : "Login"}
              </Button>
            </div>

            <p className="text-center mt-3">
              Not Registered?{" "}
              <Link
                className="link text-[14px] font-[600] text-[#ff5252]"
                to="/register"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-center font-[500] mt-2">or continue with social account</p>

            <Button
              className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black mt-2" onClick={authWithGoogle}
            >
              <FcGoogle className="text-[20px]" /> Login with Google
            </Button>
          </form>


        </div>
      </div>
    </section>
  );
};

export default Login;
