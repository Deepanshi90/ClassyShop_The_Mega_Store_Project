import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
import { use } from 'react';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [isPasswordShow , setIsPasswordShow] = useState(false);
    const [formFields,setFormFields] = useState({
        name:"",
        email:"",
        password:""
    })

    const context = useContext(MyContext);
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

            history("/verify")
            }
            else{
                context.alertBox ("error",res?.message);
                setIsLoading(false);
            }

            
            
        })
    }
  return (
    <section className="section py-10 ">
        <div className="container">
            <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className='text-center text-[18px]  text-black'>Register With a New Account</h3>

                <form className="w-full mt-5" onSubmit={handleSubmit}>

                <div className="form-group w-full mb-5">
                    <TextField type='text' id="name" name='name' value={formFields.name} disabled={isLoading === true ? true : false} label="Full Name" variant="outlined" className='w-full' onChange={onChangeInput}/>
                    </div>


                    <div className="form-group w-full mb-5">
                    <TextField type='email' id="email" name='email' disabled={isLoading === true ? true : false}   value={formFields.email} label="Email Id" variant="outlined" className='w-full'onChange={onChangeInput}/>
                    </div>

                    

                    <div className="form-group w-full mb-5 relative ">
                    <TextField type={isPasswordShow === true ? 'password' : 'text'} id="password" name='password' disabled={isLoading === true ? true : false}   value={formFields.password} label="Password" variant="outlined" className='w-full' onChange={onChangeInput}/>
                    <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'>
                        {
                            isPasswordShow === true ? <IoMdEyeOff className='text-[20px] opacity-75'onClick={() => setIsPasswordShow(!isPasswordShow)}/> : <IoMdEye className='text-[20px] opacity-75'onClick={() => setIsPasswordShow(!isPasswordShow)}/>
                        }
                        </Button>
                    </div>

                    <div className="flex items-center w-full mt-3">
                        <Button type='submit' disabled={!valideValue } className='btn-org w-full btn-lg flex gap-3'>
                            
                            {
                                isLoading === true ? <CircularProgress color="inherit" /> :'  Register'
                            }
                            
                          </Button>
                    </div>
                    <p className='text-center'>Already have an Account? <Link className='link text-[14px] font-[600] text-[#ff5252]' to="/login">Login</Link></p>
                    <p className="text-center font-[500]">or continue with social account</p>

                    <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'><FcGoogle className='text-[20px]'/>Login with Google</Button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register;