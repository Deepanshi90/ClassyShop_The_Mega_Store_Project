import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, Links, NavLink } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';

const ForgotPassword = () => {

    return (
        <section className="relative w-full h-[100vh]  bg-white  ">
            <header className="w-full fixed top-0 left-0 opacity-100 px-4 py-3 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <Link to="/">
                    <img
                        src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg"
                        alt="logo image"
                        className="w-[200px]"
                    />
                </Link>

                <div className="flex items-center gap-2">
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

            <div className="loginBox card w-[600px] h-auto pb-30 mx-auto pt-20 relative z-50">
                <div className="text-center">
                {/* <img src="./line.jpg" alt="imge"  className='m-auto'/> */}
                </div>

                <h1 className='text-center text-[35px] font-[800] mt-4'>Having trouble to sign in?<br />
                    Reset your password.
                </h1>


             
                <br />

                <form className='w-[80%] px-10 mx-auto mt-3'>
                    <div className="form-group mb-4 w-full">
                         <h4 className='mb-1 font-medium text-[14px]'>Email</h4>
                            <input
                             type="email"
                                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' placeholder='Enter your email'
                            />
                     </div>


                   
                     <Button className='btn-blue btn-lg w-full' >Reset Password</Button>
<br />
<br />


                     <div className="text-center flex items-center justify-center gap-4">
                        <span>Don't want to reset? </span>
                        <Link to="/login" className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-stone-950'>
                                             Sign In?
                                             </Link>
                     </div>
                     
                </form>
            </div>
            


            {/* Foreground Content */}
            {/* <div className="relative z-10 flex items-center justify-center h-full"> */}
                {/* Put your login form or content here */}
                {/* <h1 className="text-3xl font-bold text-black">Login Page</h1>
            </div> */}
        </section>


      

    );
};

export default ForgotPassword;


  //     <section className="bg-[#fff]">
        //     <header className="w-full fixed top-0 left-0 px-4 py-2 flex items-center justify-between">
        //         <Link to="/">
        //             {/* Remove opacity-200 and use opacity-100 for a clear logo */}
        //             <img 
        //                 src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" 
        //                 alt="logo image"  
        //                 className="opacity-100" 
        //             />
        //         </Link>
        //     </header>

        //     {/* Background image with opacity-50 for a faded effect */}
        //     <img 
        //         src="./background.avif" 
        //         alt="background_image" 
        //         className="w-full fixed top-0 left-0 opacity-50 z-0" 
        //     />
        //     lgjmkr
        // </section>