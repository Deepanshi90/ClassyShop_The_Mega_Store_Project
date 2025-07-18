import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';

const ForgetPassword = () => {

    const [isPasswordShow , setIsPasswordShow] = useState(false);
    const [isPasswordShow2 , setIsPasswordShow2] = useState(false);
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
    <section className="section py-5 lg:py-10 ">
        <div className="container">
            <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
                <h3 className='text-center text-[18px]  text-black'>Forget Password</h3>

                <form className="w-full mt-5" onSubmit={handleSubmit}>
                    <div className="form-group w-full mb-5 relative">
                    <TextField type={isPasswordShow === true ? 'password' : 'text'} id="password" label="New Password" variant="outlined" className='w-full' name='newPassword'  value={formFields.newPassword}
                disabled={isLoading === true ? true: false} onChange={onChangeInput}/>
                    <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => setIsPasswordShow(!isPasswordShow)}>
                        {
                            isPasswordShow === true ? <IoMdEyeOff className='text-[20px] opacity-75'/> : <IoMdEye className='text-[20px] opacity-75'/>
                        }
                        </Button>
                    </div>

                    <div className="form-group w-full mb-5 relative ">
                    <TextField type={isPasswordShow2 === true ? 'password' : 'text'} id="confirm_password" label=" Confirm Password" variant="outlined" className='w-full' name='confirmPassword'  value={formFields.confirmPassword}
                 disabled={isLoading === true ? true: false}  onChange={onChangeInput}/>
                    <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black' onClick={() => setIsPasswordShow2(!isPasswordShow)}>
                        {
                            isPasswordShow2 === true ? <IoMdEyeOff className='text-[20px] opacity-75'/> : <IoMdEye className='text-[20px] opacity-75'/>
                        }
                        </Button>
                    </div>

                     <div className="flex items-center w-full mt-3">
                                  <Button type='submit' disabled={!valideValue} className='btn-org w-full btn-lg flex gap-3'>
                                    {isLoading ? <CircularProgress color="inherit" /> : 'Change Password'}
                                  </Button>
                                </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ForgetPassword;