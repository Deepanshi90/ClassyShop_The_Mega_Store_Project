import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, Links, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';
import {FcGoogle} from "react-icons/fc";
import LoadingButton from "@mui/lab/LoadingButton"
import { BsFacebook } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa6';
import { postData } from '../../utils Copy/api';
import { MyContext } from '../../App.jsx';
import CircularProgress from '@mui/material/CircularProgress';


const ChangePassword = () => {

    const [isPasswordShow, setisPasswordShow] = useState(false);
    const [isPasswordShow2, setisPasswordShow2] = useState(false);

     const [isLoading, setIsLoading] = useState(false);
     const [formFields, setFormFields] = useState({
        email:localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: '',
      });
    
        const context = useContext(MyContext);
        const history = useNavigate()
    
        const onChangeInput = (e) => {
            const { name, value } = e.target;
            setFormFields((prev) => ({
              ...prev,
              [name]: value,
            }));
          };
    
          const valideValue = Object.values(formFields).every((el) => el);
    
           const handleSubmit = (e) => {
              e.preventDefault();
              setIsLoading(true);
            
              if (formFields.newPassword.trim() === "") {
                context.alertBox("error", "Please enter New password");
                setIsLoading(false);
                return;
              }
            
              if (formFields.confirmPassword.trim() === "") {
                context.alertBox("error", "Please enter Confirm Password");
                setIsLoading(false);
                return;
              }
    
              if (formFields.confirmPassword.trim() !== formFields.newPassword.trim() ) {
                context.alertBox("error", "Password and Confirm Password does not match ");
                setIsLoading(false);
                return;
              }
            
              postData(`/api/user/reset-password2`,formFields).then((res)=>{
                console.log(res);
                if(res?.error === false){
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("actionType");
                    context.alertBox("success",res?.message)
                    setIsLoading(false);
                    history("/login");
                }
                else{
                    context.alertBox("error",res?.message)
                }
               
              })
            };
          

    return (
        // <section className="relative w-full  bg-white  ">
        //     <header className="w-full lg:fixed top-0 left-0 z-[999] bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-center sm:justify-between shadow-sm">
        //         <Link to="/">
        //             <img
        //                 src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg"
        //                 alt="logo image"
        //                 className="w-[200px]"
        //             />
        //         </Link>

        //         <div className="hidden sm:flex items-center gap-2">
        //             <NavLink to="/login" exact={true} activeClassName="isActive">
        //                 <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
        //                     <CgLogIn className='text-[18px] ' />Login
        //                 </Button>
        //             </NavLink>

        //             <NavLink to="/sign-up" exact={true} activeClassName="isActive">
        //                 <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
        //                     < FaRegUser className='text-[13px] ' />Sign Up
        //                 </Button>
        //                 </NavLink>

        //         </div>
        //     </header>
        //     {/* Background Image with Opacity */}
        //     <img
        //         src="./background.avif"
        //         alt="Background"
        //         className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
        //     />

        //     <div className="loginBox card w-[600px] h-auto pb-30 mx-auto pt-20 relative z-50">
        //         <div className="text-center">
        //         {/* <img src="./line.jpg" alt="imge"  className='m-auto'/> */}
        //         </div>

        //         <h1 className='text-center text-[35px] font-[800] mt-4'>Welcome Back!<br />
        //            You can change your password from here.
        //         </h1>

        //         <br />
        //         <form className='w-[80%] px-10 mx-auto mt-3' onSubmit={handleSubmit}>
                    
        //              <div className="form-group mb-4 w-full">
        //                  <h4 className='mb-1 font-medium text-[14px]'> New Password</h4>
        //                     <div className="relative w-full">
        //                     <input
        //                      type={isPasswordShow === false ? 'password' : 'text'}
        //                         className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='newPassword'  value={formFields.newPassword}
        //                         disabled={isLoading === true ? true: false} onChange={onChangeInput}
        //                     />
        //                     <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[35px] !text-gray-600' onClick={() => setisPasswordShow(!isPasswordShow)}>
        //                         {
        //                             isPasswordShow === false? (<FaEyeSlash className='text-[16px] '/>) :
        //                             (<FaRegEye className='text-[16px]' />)
        //                         }
        //                         </Button>
        //                     </div>
        //              </div>

        //              <div className="form-group mb-4 w-full">
        //                  <h4 className='mb-1 font-medium text-[14px]'>Confirm Password</h4>
        //                     <div className="relative w-full">
        //                     <input
        //                      type={isPasswordShow2 === false ? 'password' : 'text'}
        //                         className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='confirmPassword'  value={formFields.confirmPassword}
        //                         disabled={isLoading === true ? true: false}  onChange={onChangeInput}
        //                     />
        //                     <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[35px] !text-gray-600' onClick={() => setisPasswordShow2(!isPasswordShow2)}>
        //                         {
        //                             isPasswordShow2 === false? (<FaEyeSlash className='text-[16px] '/>) :
        //                             (<FaRegEye className='text-[16px]' />)
        //                         }
        //                         </Button>
        //                     </div>
        //              </div>

        //              <div className="form-group mb-4 w-full flex items-center justify-between ">
        //              <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
        //              </div>
                     
        //              <Button type='submit' disabled={!valideValue} className='btn-blue btn-lg w-full'>{isLoading ? <CircularProgress color="inherit" /> : 'Change Password'}</Button>

        //         </form>
        //     </div>
        // </section>

<section className="relative w-full bg-white min-h-screen">
    {/* Header */}
    <header className="w-full fixed top-0 left-0 opacity-100 px-4 py-3 flex items-center justify-between z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <Link to="/">
            <img
                src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg"
                alt="logo"
                className="w-[150px] sm:w-[180px] md:w-[200px]"
            />
        </Link>
        <div className="hidden sm:flex items-center gap-2">
            <NavLink to="/login" exact="true" activeClassName="isActive">
                <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-4 md:!px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
                    <CgLogIn className='text-[18px]' /> Login
                </Button>
            </NavLink>
            <NavLink to="/sign-up" exact="true" activeClassName="isActive">
                <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !px-4 md:!px-5 flex gap-1 !border !border-[rgba(0,0,0,0.2)]'>
                    <FaRegUser className='text-[13px]' /> Sign Up
                </Button>
            </NavLink>
        </div>
    </header>

    {/* Background */}
    <img
        src="./background.avif"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
    />

    {/* Login Box */}
    <div className="loginBox card w-[90%] sm:w-[80%] md:w-[600px] max-w-xl mx-auto pt-[120px] pb-10 relative z-50">
        <h1 className='text-center text-2xl md:text-[35px] font-bold mt-4 leading-snug'>
            Welcome Back!<br />You can change your password from here.
        </h1>

        <form className='w-full px-4 sm:px-8 md:px-10 mt-6' onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="form-group mb-4 w-full">
                <h4 className='mb-1 font-medium text-sm md:text-[14px]'>New Password</h4>
                <div className="relative w-full">
                    <input
                        type={isPasswordShow ? 'text' : 'password'}
                        className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                        name='newPassword'
                        value={formFields.newPassword}
                        disabled={isLoading}
                        onChange={onChangeInput}
                    />
                    <Button
                        type="button"
                        className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[35px] !text-gray-600'
                        onClick={() => setisPasswordShow(!isPasswordShow)}
                    >
                        {isPasswordShow ? <FaRegEye className='text-[16px]' /> : <FaEyeSlash className='text-[16px]' />}
                    </Button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-4 w-full">
                <h4 className='mb-1 font-medium text-sm md:text-[14px]'>Confirm Password</h4>
                <div className="relative w-full">
                    <input
                        type={isPasswordShow2 ? 'text' : 'password'}
                        className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                        name='confirmPassword'
                        value={formFields.confirmPassword}
                        disabled={isLoading}
                        onChange={onChangeInput}
                    />
                    <Button
                        type="button"
                        className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[35px] !text-gray-600'
                        onClick={() => setisPasswordShow2(!isPasswordShow2)}
                    >
                        {isPasswordShow2 ? <FaRegEye className='text-[16px]' /> : <FaEyeSlash className='text-[16px]' />}
                    </Button>
                </div>
            </div>

            {/* Remember Me */}
            <div className="form-group mb-4 w-full flex items-center justify-between">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
            </div>

            {/* Submit Button */}
            <Button
                type='submit'
                disabled={!valideValue}
                className='btn-blue btn-lg w-full'
            >
                {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Change Password'}
            </Button>
        </form>
    </div>
</section>

      

    );
};

export default ChangePassword;



