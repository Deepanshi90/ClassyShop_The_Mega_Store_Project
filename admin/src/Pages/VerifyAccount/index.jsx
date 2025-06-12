import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, Links, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';
import OtpBox from "../../Components/OtpBox";
import { MyContext } from '../../App';
import { postData } from '../../utils Copy/api';
import CircularProgress from '@mui/material/CircularProgress';


const VerifyAccount = () => {
const [otp,setOtp] = useState("");
 const [isLoading,setIsLoading] = useState(false);

const context = useContext(MyContext);
const handleOtpChange = (value) =>{
    setOtp(value);
}
const history = useNavigate();


 const verifyOTP = (e) =>{
    
    e.preventDefault();
    // alert(otp);
    if(otp !== ""){
        setIsLoading(true);
        const actionType = localStorage.getItem("actionType");

        if(actionType !== "forgot-password"){
          postData("/api/user/verifyEmail",{
            email: localStorage.getItem("userEmail"),
            otp: otp
          }).then((res) =>{
            if(res?.error === false){
              context.alertBox("success",res.message);
              localStorage.removeItem("userEmail")
              setIsLoading(false);
              history("/login");
            }
            else{
              context.alertBox("error",res?.message);
              setIsLoading(false);
            }
          })
        }else{
          postData("/api/user/verify-forgot-password-otp",{
            email: localStorage.getItem("userEmail"),
            otp: otp
          }).then((res) =>{
            if(res?.error === false){
              context.alertBox("success",res.message);
              history("/change-password");
            }
            else{
              context.alertBox("error",res?.message);
              setIsLoading(false);
            }
          })
        }
    }
   else{
    context.alertBox("error","Please enter OTP");
   }
   
  }

    return (
        <section className="relative w-full h-[100vh]  bg-white  ">
            <header className="w-full lg:fixed top-0 left-0 z-[999] bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-center sm:justify-between shadow-sm">
                <Link to="/">
                    <img
                        src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg"
                        alt="logo image"
                        className="w-[200px]"
                    />
                </Link>

                <div className="hidden sm:flex items-center gap-2">
                    <NavLink to="/login" exact={true} activeClassName="isActive">
                        <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
                            <CgLogIn className='text-[18px] ' />Login
                        </Button>
                    </NavLink>

                    <NavLink to="/sign-up" exact={true} activeClassName="isActive">
                        <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
                            < FaRegUser className='text-[13px] ' />Sign Up
                        </Button>
                    </NavLink>

                </div>
            </header>
            {/* Background Image with Opacity */}
            <img
                src="./background.avif"
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
            />

            <div className="loginBox card w-full md:w-[600] h-auto pb-30 mx-auto pt-5 lg:pt-20 relative z-50">
                <div className="text-center flex items-center justify-center flex-col">
                <img src="./verify2.png" alt="verfiy image" className='w-[100px]' />
                </div>

                <h1 className='text-center text-[18px] sm:text-[35px] font-[800] mt-4'>Welcome Back!<br />
                    Please Verify your Account.
                </h1>

                {/* <br /> */}
                <br />

                <p className='text-center text-[15px] '>OTP send to &nbsp; <span className='text-[#3872fa] font-bold text-[12px] sm:text-[14px]'>{localStorage.getItem("userEmail") || "your email"}</span></p>

                <br />
                <form onSubmit={verifyOTP}>
                <div className="text-center flex items-center justify-center flex-col ">
                    <OtpBox length={6} onChange={handleOtpChange}/>
                </div>
                <br />
                <div className="w-[300px] m-auto">
           <Button type="submit"  className='btn-blue w-full'>
            {
                                                                 isLoading === true ? <CircularProgress color="inherit" /> :' Verify OTP'
                                                             }
           </Button>
           </div>
                </form>
<br />
           
            </div>

        </section>




    );
};

export default VerifyAccount;