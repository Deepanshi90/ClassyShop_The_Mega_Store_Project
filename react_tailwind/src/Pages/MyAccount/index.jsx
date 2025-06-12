import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const myAccount = () => {

    const context = useContext(MyContext);
    const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userId,setUserId] = useState("");

  const [formFields, setFormFields] = useState({
    name:'',  
    email: '',
      mobile:''
    });

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if(token === null){
            history("/");
        }
    },[])

    useEffect(()=>{
        if(context?.userData?._id !== "" && context?.userData?._id !== undefined){
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email:context?.userData?.email,
                mobile:context?.userData?.mobile
            })
        }
    },[context.userData])

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

          if (formFields.name.trim() === "") {
            context.alertBox("error", "Please enter valid Name");
            setIsLoading(false);
            return;
          }
      
          if (formFields.email.trim() === "") {
            context.alertBox("error", "Please enter valid Email Id");
            setIsLoading(false);
            return;
          }
      
          if (formFields.mobile.trim() === "") {
            context.alertBox("error", "Please enter valid mobile");
            setIsLoading(false);
            return;
          }
      
          editData(`/api/user/${userId}`, formFields).then((res) => {
            console.log("API Response:", res);
      
            if (res?.error !== true) {
              context.alertBox("success", res?.message);
      
              // Save tokens
              localStorage.setItem("accessToken", res?.data?.accesstoken);
              localStorage.setItem("refreshToken", res?.data?.refreshToken);
              localStorage.setItem("userEmail", formFields.email);
      
              context.setIsLogin(true);
              setFormFields({ email: "", password: "" });
      
              history("/"); // ✅ use navigate, not history
            } else {
              context.alertBox("error", res?.message);
            }
            setIsLoading(false);
          }).catch((err) => {
            console.error(err);
            context.alertBox("error", "Something went wrong!");
            setIsLoading(false);
          });
        };
      
  return (
    <section className="py-10 w-full ">
        <div className="container flex gap-5">
            <div className="col1 w-[20%]">
                <AccountSidebar />
            </div>

            <div className="col2 w-[50%]">
                <div className="card bg-white p-5 shadow-md rounded-md">
                    <h2 className='pb-3'>My Profile</h2>
                    <hr  className='border-[rgba(0,0,0,0.1)]'/>
                <form className='mt-5' onSubmit={handleSubmit}>
                <div className="flex items-center gap-5">
                    <div className="w-[50%]">
                    <TextField  type="text" label="Full Name" variant="outlined" size='small' className='w-full' name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput} />

                    </div>

                    <div className="w-[50%]">
                    <TextField  label="Email" type='email' variant="outlined" size='small' className='w-full' name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}/>

                    </div>

                </div>

                <div className="flex items-center gap-5 mt-4">
                    <div className="w-[50%]">
                    <TextField  type="number" label="Phone Number" variant="outlined" size='small' className='w-full' name="mobile"
                value={formFields.mobile}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}/>

                    </div>


                </div>

                <br />
                <div className="flex items-center gap-4">
                    <Button type='submit' disabled={!valideValue} className='btn-org btn-lg w-100px'> {isLoading === true ? <CircularProgress color="inherit" size={24} /> : "Update Profile"}</Button>
                    <Button type='submit' className='btn-org btn-border btn-lg w-100px'>Cancle</Button>
                </div>
                </form>
                </div>
            </div>

        </div>
    </section>
  )
}


export  default myAccount;