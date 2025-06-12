import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from 'react-collapse';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const myAccount = () => {

  const context = useContext(MyContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setisChangePasswordFormShow] = useState(false);
  const [phone, setPhone] = useState('');

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token === null && token === undefined && token === " ") {
      history("/");
    }

    // if(context.isLogin === false){
    //   history("/");
    // }

  }, [context.isLogin])

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile
      })
      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph)

      setChangePassword({
        email: context?.userData?.email,
      })
    }
  }, [context?.userData])

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    setChangePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "Please enter valid Name");
      setIsLoading(false);
      return;
    }

    if (formFields.email === "") {
      context.alertBox("error", "Please enter valid Email Id");
      setIsLoading(false);
      return;
    }

    if (formFields.mobile === "") {
      context.alertBox("error", "Please enter valid mobile");
      setIsLoading(false);
      return;
    }

    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
      console.log(res);
      setIsLoading(false);
      if (res?.error !== true) {
        context.alertBox("success", res?.data?.message);
        // setFormFields({name:"", email: "",mobile: "" });
        // // Save tokens
        // localStorage.setItem("accessToken", res?.data?.accesstoken);
        // localStorage.setItem("refreshToken", res?.data?.refreshToken);
        // localStorage.setItem("userEmail", formFields.email);

        // context.setIsLogin(true);              
        //  setIsLoading(false);
      } else {
        context.alertBox("error", res?.data?.message);
        setIsLoading(false);
      }

    }).catch((err) => {
      console.error(err);
      context.alertBox("error", "Something went wrong!");
      setIsLoading(false);
    });
  };
  const valideValue2 = Object.values(formFields).every((el) => el);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (changePassword.oldPassword === "") {
      context.alertBox("error", "Please old password");
      setIsLoading(false);
      return;
    }

    if (changePassword.newPassword === "") {
      context.alertBox("error", "Please enter new password");
      setIsLoading(false);
      return;
    }

    if (changePassword.confirmPassword === "") {
      context.alertBox("error", "Please enter confirm Password");
      setIsLoading(false);
      return;
    }
    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.alertBox("error", "Please check confirm Password and new paswword");
      setIsLoading(false);
      return;
    }

    postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading2(false);
        context.alertBox("success", res?.message);
      } else {
        context.alertBox("error", res?.message);
        setIsLoading2(false);
      }

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
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className='pb-0'>My Profile</h2>
              <Button className='!ml-auto btn-org btn-lg w-100px' onClick={() => setisChangePasswordFormShow(!isChangePasswordFormShow)}>Change Password</Button>
            </div>
            <hr className='border-[rgba(0,0,0,0.1)]' />
            <form className='mt-8' onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField type="text" label="Full Name" variant="outlined" size='small' className='w-full' name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput} />

                </div>

                <div className="w-[50%]">
                  <TextField label="Email" type='email' variant="outlined" size='small' className='w-full' name="email"
                    value={formFields.email}
                    disabled={true}
                    onChange={onChangeInput} />

                </div>

              </div>

              <div className="flex items-center gap-5 mt-4">
                <div className="w-[50%]">
                  <PhoneInput
                    defaultCountry="in"
                    value={phone}
                    disabled={isLoading === true ? true : false}
                    onChange={(phone) => {
                      setPhone(phone);
                      setFormFields({
                        mobile: phone
                      })
                    }}
                  />

                </div>


              </div>

              <br />
              <div className="flex items-center gap-4">
                <Button type='submit' disabled={!valideValue} className='btn-org btn-lg w-100px'> {isLoading === true ? <CircularProgress color="inherit" size={24} /> : "Update Profile"}</Button>
                <Button type='submit' className='btn-org btn-border btn-lg w-100px'>Cancle</Button>
              </div>
            </form>
          </div>



          <Collapse isOpened={isChangePasswordFormShow} >
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className='pb-0'>Change Password</h2>

              </div>
              <hr className='border-[rgba(0,0,0,0.2)]' />

              <form className='mt-8' onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-2 gap-5">
                  {
                    context?.userData?.signUpWithGoogle === false && 
                  <div className="col">
                    <TextField type="text" label="Old Password" variant="outlined" size='small' className='w-full' name="oldPassword"
                      value={changePassword.oldPassword}
                      disabled={isLoading2 === true ? true : false}
                      onChange={onChangeInput} />

                  </div>
                  }
                  

                  <div className="col">
                    <TextField label="New Password" type='text' variant="outlined" size='small' className='w-full' name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangeInput} />

                  </div>

 <div className="col">
                    <TextField type="text" label="Confirm Password" variant="outlined" size='small' className='w-full' name="confirmPassword"
                      value={changePassword.confirmPassword}
                      onChange={onChangeInput} />

                  </div>

                </div>

                <br />
                <div className="flex items-center gap-4">
                  <Button type='submit' className='btn-org btn-lg w-100px'> {isLoading2 === true ? <CircularProgress color="inherit" size={24} /> : "Change Password"}</Button>
                  <Button type='submit' className='btn-org btn-border btn-lg w-100px'>Cancle</Button>
                </div>
              </form>
            </div>
          </Collapse>


        </div>

      </div>
    </section>
  )
}


export default myAccount;