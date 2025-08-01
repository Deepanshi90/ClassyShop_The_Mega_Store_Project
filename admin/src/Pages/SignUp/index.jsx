import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, Links, NavLink } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from 'react-icons/fa6';
import {FcGoogle} from "react-icons/fc";
import LoadingButton from "@mui/lab/LoadingButton"
import { BsFacebook } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils Copy/api.js';
import { MyContext } from '../../App.jsx';


const SignUp = () => {

    const [loadingGoogle , setLoadingGoogle] = useState(false);
    const [loadingFb , setLoadingFb] = useState(false);
    const [isPasswordShow, setisPasswordShow] = useState(false);

    const [isLoading,setIsLoading] = useState(false);
    const [formFields,setFormFields] = useState({
            name:"",
            email:"",
            password:""
        })

        const context = useContext(MyContext)
        const history = useNavigate();
        const onChangeInput = (e) =>{
            const {name,value} = e.target;
            setFormFields(()=>{
                return{
                    ...formFields,
                    [name]:value
                }
            })
        }

        const valideValue = Object.values(formFields).every(el => el)
            // console.log(formFields);
            
            const handleSubmit = (e) =>{
        
                e.preventDefault();
                setIsLoading(true);
                // alert(formFields.name)
                if(formFields.name === ""){
                    context.alertBox("error","Please enter full name")
                    return false;
                }
        
                if(formFields.email === ""){
                    context.alertBox ("error","Please enter valid Email Id")
                    return false;
                }
        
                if(formFields.password === ""){
                    context.alertBox ("error","Please enter Password")
                    return false;
                }
                postData("/api/user/register",formFields).then((res)=>{
                    console.log(res);
        
                    if(res?.error !== true){
                        setIsLoading(false);
                        context.alertBox ("success",res?.message)
                        localStorage.setItem("userEmail",formFields.email)
                        
                    setFormFields({
                        name:"",
                        email:"",
                        password:""
                    })
        
                    history("/verify-account")
                    }
                    else{
                        context.alertBox ("error",res?.message);
                        setIsLoading(false);
                    }
        
                    
                    
                })
            }

    function handleClickGoogle() {
        setLoadingGoogle(true);
      }
    
    function handleClickFb() {
        setLoadingFb(true);
      }
    return (
        <section className="relative w-full  bg-white  ">
            {/* <header className="w-full static lg:fixed top-0 left-0 opacity-100 px-4 py-3 flex items-center justify-center sm:justify-between z-50 bg-white/80 backdrop-blur-md shadow-sm"> */}
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
                <div className="text-center">
                {/* <img src="./line.jpg" alt="imge"  className='m-auto'/> */}
                </div>

                  <h1 className='text-center text-[18px] sm:text-[35px] font-[800] mt-4'>Join Us today!
                    Get special<br /> benefits and stay up-to-date. 
                </h1>


                <div className="flex items-center justify-center w-full mt-5 gap-4">
                <LoadingButton
          size="small"
          onClick={handleClickGoogle}
          endIcon={<FcGoogle />}
          loading={loadingGoogle}
          loadingPosition="end"
          variant="outlined"
          className='!bg-none !py-2 !text-[16px] !capitalize !px-5 !text-[#000] '
        >
          Sign In with Google
        </LoadingButton>

                </div>

                <br />

                <div className="w-full flex items-center justify-center gap-3">
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)]"></span>
                    <span className='text-[10px] lg:text-[14px] font-[500]'>Or, Sign In with your Email</span>
                    <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.3)]"></span>
                </div>

<br />
                 <form className='w-full max-w-[400px] px-4 mx-auto mt-3' onSubmit={handleSubmit}>

                <div className="form-group mb-4 w-full">
                         <h4 className='mb-1 font-medium text-[14px]'>Full Name</h4>
                            <input
                             type="text"
                                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name='name' value={formFields.name} disabled={isLoading === true ? true : false} onChange={onChangeInput}
                            />
                     </div>

                    <div className="form-group mb-4 w-full">
                         <h4 className='mb-1 font-medium text-[14px]'>Email</h4>
                            <input
                             type="email"
                                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='email' value={formFields.email} disabled={isLoading === true ? true : false} onChange={onChangeInput}
                            />
                     </div>


                     <div className="form-group mb-4 w-full">
                         <h4 className='mb-1 font-medium text-[14px]'>Password</h4>
                            <div className="relative w-full">
                            <input
                             type={isPasswordShow === false ? 'password' : 'text'}
                                className='w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='password' value={formFields.password} disabled={isLoading === true ? true : false} onChange={onChangeInput}
                            />
                            <Button className='!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[40px] !h-[40px] !min-w-[35px] !text-gray-600' onClick={() => setisPasswordShow(!isPasswordShow)}>
                                {
                                    isPasswordShow === false? (<FaEyeSlash className='text-[16px] '/>) :
                                    (<FaRegEye className='text-[16px]' />)
                                }
                                </Button>
                            </div>
                     </div>

                     <div className="form-group mb-4 w-full flex items-center justify-between ">
                     <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                     <Link to="/forget-password" className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-stone-950'>
                     Forget Password?
                     </Link>
                     </div>

                      <div className="flex items-center justify-between mb-4">
                                           <span className='text-[14px]'>Already have an account?</span>
                                            <Link to="/login" className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-stone-950 cursor-pointer'>
                                         Sign In
                                          </Link>
                                          </div>
                     
                     <Button type='submit' className='btn-blue btn-lg w-full' disabled={!valideValue }> {
                                                     isLoading === true ? <CircularProgress color="inherit" /> :'  Sign Up'
                                                 }</Button>

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

export default SignUp;


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