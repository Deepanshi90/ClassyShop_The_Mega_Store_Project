import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App';
import { FaCloudUploadAlt } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { editData, fetchDataFromApi, postData, uploadImage } from '../../utils copy/api';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Collapse } from 'react-collapse';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Profile = () => {
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState('');

    const context = useContext(MyContext);

    const formdata = new FormData();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState("");
    const [isChangePasswordFormShow, setisChangePasswordFormShow] = useState(false);

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

    const [selectedValue, setSelectedValue] = useState('Subhash Nagar');

    const handleChange = (event) => {
        // alert(event.target.value)
      setSelectedValue(event.target.value);

    //   if(event.target.checked === true){
    //     editData(`/api/address/selectAddress/${event.target.value} `,{selected:true})
    //   }
    //   else{
    //     editData(`/api/address/selectAddress/${event.target.value} `, {selected:false})
    //   }
    // //   console.log(event.target);
    // console.log(event);
      
    //   alert(event.target.value)
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (token === null && token === undefined && token === " ") {
            history("/login");
        }
    }, [context.isLogin])

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                // console.log(res.data);
                setAddress(res.data);
                context?.setAddress(res.data);
                
            });

            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            const ph = `"${context?.userData?.mobile}"`;
            // console.log(ph);
            setPhone(ph);

            //   setPhone('917015137052')
            //   setPhone(context?.userData?.mobile);
            //     alert(context?.userData?.mobile);
            setChangePassword({
                email: context?.userData?.email,
            })
        }
    }, [context?.userData])

    const onChangeInput = (e) => {
        e.preventDefault();
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

            if (res?.error !== true) {
                context.alertBox("success", res?.data?.message);
                setIsLoading(false);
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

    useEffect(() => {
        const userAvtar = [];

        // First check context
        if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
            userAvtar.push(context.userData.avatar);
            setPreviews(userAvtar);
        } else {
            // If not available, try localStorage
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar) {
                userAvtar.push(savedAvatar);
            }
        }
        // const email = localStorage.getItem("userEmail");
        // if (email) {
        //   setUserEmail(email);
        // }  


    }, [context?.userData]);

    let selectedImages = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);

            const files = e.target.files;
            setUploading(true);

            console.log(files);

            for (var i = 0; i < files.length; i++) {
                if (
                    files[i] &&
                    (
                        files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formdata.append(`avatar`, file);

                    uploadImage("/api/user/user-avatar", formdata).then((res) => {
                        setUploading(false);
                        let avatar = [];
                        console.log(res?.data?.avtar);

                        avatar.push(res?.data?.avtar);
                        setPreviews(avatar);

                        // Update userData in context
                        if (context?.setUserData) {
                            context.setUserData(prev => ({
                                ...prev,
                                avatar: res?.data?.avtar
                            }));
                        }

                        // Also save avatar to localStorage
                        localStorage.setItem('userAvatar', res?.data?.avtar);
                    })

                } else {
                    context.alertBox("error", "Please select a valid JPG , PNG or WEPG image file.");
                    setUploading(false);
                    return false;
                }
            }

        } catch (error) {
            console.log("Error from AccountSidebar", error);


        }
    }
    return (
//         <>
//             <div className="card my-4 shadow-md sm:rounded-lg bg-white px-5 pb-5 w-[65%]">
//                 <div className="flex items-center justify-between">
//                     <h1 className="font-[700] text-[20px] text-gray-800">User Profile</h1>

//                     <Button className='!ml-auto !mt-4 btn-blue btn-lg w-100px' onClick={() => setisChangePasswordFormShow(!isChangePasswordFormShow)}>Change Password</Button>
//                 </div>

//                 <br />

//                 <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ml-80">

//                     {
//                         uploading === true ? <CircularProgress color="inherit" /> :

//                             <>
//                                 {
//                                     previews?.length !== 0 ? previews?.map((img, index) => {
//                                         // console.log(img);

//                                         return (
//                                             <img src={img} key={index} alt="account_image" className='w-full h-full object-cover' />
//                                         )
//                                     }) : <img src="https://www.bing.com/th/id/OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa?w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="account_image" className='w-full h-full object-cover' />
//                                 }
//                             </>

//                     }


//                     <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
//                         <FaCloudUploadAlt className='text-[#fff] text-[25px] ' />
//                         <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 ' accept='image/*'
//                             onChange={(e) => {
//                                 onChangeFile(e, "/api/user/user-avatar")
//                             }} name='avatar' />
//                     </div>
//                 </div>

//                 <form className='mt-8 form ' onSubmit={handleSubmit}>
//                     <div className="flex items-center gap-5">
//                         <div className="w-[50%]">
//                             <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="name"
//                                 value={formFields.name}
//                                 disabled={isLoading === true ? true : false}
//                                 onChange={onChangeInput} />

//                         </div>

//                         <div className="w-[50%]">
//                             <input type="email" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="email"
//                                 value={formFields.email}
//                                 disabled={true}
//                                 onChange={onChangeInput} />

//                         </div>

//                     </div>

//                     <div className="flex items-center gap-5 mt-4">
//                         <div className="w-[50%]">
//                             <PhoneInput
//                                 defaultCountry="in"
//                                 value={phone}
//                                 disabled={isLoading === true ? true : false}
//                                 onChange={(phone) => {
//                                     setPhone(phone);
//                                     setFormFields({
//                                         mobile: phone
//                                     })
//                                 }}
//                             />


//                         </div>


//                     </div>

//                     <br />

//                     <div className='flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] mb-3 bg-[#f1faff] cursor-pointer hover:bg-[#e7f3f9] rounded-md' onClick={() => context.setIsOpenFullScreenPanel({
//                         open: true,
//                         model: 'Add New Address'
//                     })}>
//                         <span className='text-[14px] font-[500]' >Add Address</span>
//                     </div>

//                     <div className="flex gap-2 flex-col mt-4">
//                     {
//                         address?.length > 0 && address?.map((address, index) => {
//                             return (
//                                 <>
//                                     <label className="addressBox border border-dashed border-[rgba(0,0,0,0.2)] flex items-center justify-center w-full bg-[#f1f1f1] p-3 rounded-md cursor-pointer mb-4">
//                                         <Radio {...label} name='address' value={address._id
//                                         } checked={selectedValue ===(address._id)} onChange={handleChange}/>
//                                         <span className='text-[12px]'>{(address?.address_line1+" " +
//                                         address?.city+ " " +
//                                         address?.country+ " "   +
//                                         address?.state+ " " +
//                                         address?.pincode)}</span>
//                                     </label>
//                                 </>
//                             )
//                         })
//                     }
// </div>

//                     <div className="flex items-center gap-4">
//                         <Button type='submit' disabled={!valideValue} className='btn-blue btn-lg w-full'> {isLoading === true ? <CircularProgress color="inherit" size={24} /> : "Update Profile"}</Button>
//                     </div>
//                 </form>

//             </div>

//             <Collapse isOpened={isChangePasswordFormShow} >
//                 <div className="card w-[65%] bg-white p-5 shadow-md rounded-md">
//                     <div className="flex items-center pb-3">
//                         <h2 className='text-[18px] font-[600] pb-0'>Change Password</h2>

//                     </div>
//                     <hr className='border-[rgba(0,0,0,0.2)]' />

//                     <form className='mt-8' onSubmit={handleSubmitChangePassword}>
//                         <div className="flex items-center gap-5">
//                             <div className="w-[50%]">
//                                 <TextField type="text" label="Old Password" variant="outlined" size='small' className='w-full' name="oldPassword"
//                                     value={changePassword.oldPassword}
//                                     disabled={isLoading2 === true ? true : false}
//                                     onChange={onChangeInput} />

//                             </div>

//                             <div className="w-[50%]">
//                                 <TextField label="New Password" type='text' variant="outlined" size='small' className='w-full' name="newPassword"
//                                     value={changePassword.newPassword}
//                                     onChange={onChangeInput} />

//                             </div>

//                         </div>

//                         <div className="flex items-center gap-5 mt-4">
//                             <div className="w-[50%]">
//                                 <TextField type="text" label="Confirm Password" variant="outlined" size='small' className='w-full' name="confirmPassword"
//                                     value={changePassword.confirmPassword}
//                                     onChange={onChangeInput} />

//                             </div>


//                         </div>

//                         <br />
//                         <div className="flex items-center gap-4">
//                             <Button type='submit' disabled={!valideValue2} className='btn-blue btn-lg w-full'> {isLoading2 === true ? <CircularProgress color="inherit" size={24} /> : "Change Password"}</Button>
//                         </div>
//                     </form>
//                 </div>
//             </Collapse>
//         </>


<>
<div className="card my-4 shadow-md sm:rounded-lg bg-white px-5 pb-5 w-full max-w-screen-lg mx-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-bold text-xl text-gray-800">User Profile</h1>
        <Button
            className="btn-blue btn-lg !mt-3"
            onClick={() => setisChangePasswordFormShow(!isChangePasswordFormShow)}
        >
            Change Password
        </Button>
    </div>

    {/* Avatar */}
    <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 mx-auto mt-6">
        {uploading ? (
            <CircularProgress color="inherit" />
        ) : previews?.length ? (
            previews.map((img, index) => (
                <img
                    src={img}
                    key={index}
                    alt="account_image"
                    className="w-full h-full object-cover"
                />
            ))
        ) : (
            <img
                src="https://www.bing.com/th/id/OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa?w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="account_image"
                className="w-full h-full object-cover"
            />
        )}
        <div className="overlay absolute inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-white text-2xl" />
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0"
                accept="image/*"
                onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
                name="avatar"
            />
        </div>
    </div>

    {/* Form */}
    <form className="mt-8 form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
                type="text"
                name="name"
                value={formFields.name}
                disabled={isLoading}
                onChange={onChangeInput}
                className="w-full h-10 border border-gray-300 rounded-sm px-3 text-sm focus:outline-none focus:border-gray-500"
            />

            <input
                type="email"
                name="email"
                value={formFields.email}
                disabled
                onChange={onChangeInput}
                className="w-full h-10 border border-gray-300 rounded-sm px-3 text-sm focus:outline-none focus:border-gray-500"
            />
        </div>

        <div className="mt-4">
            <PhoneInput
                defaultCountry="in"
                value={phone}
                disabled={isLoading}
                onChange={(phone) => {
                    setPhone(phone);
                    setFormFields({ mobile: phone });
                }}
            />
        </div>

        {/* Add Address */}
        <div
            className="mt-6 p-4 border border-dashed border-gray-300 bg-[#f1faff] hover:bg-[#e7f3f9] rounded-md cursor-pointer text-center"
            onClick={() =>
                context.setIsOpenFullScreenPanel({ open: true, model: 'Add New Address' })
            }
        >
            <span className="text-sm font-medium">Add Address</span>
        </div>

        {/* Address List */}
        <div className="mt-4 space-y-4">
            {address?.length > 0 &&
                address.map((addressItem, index) => (
                    <label
                        key={index}
                        className="addressBox border border-dashed border-gray-300 flex items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    >
                        <Radio
                            {...label}
                            name="address"
                            value={addressItem._id}
                            checked={selectedValue === addressItem._id}
                            onChange={handleChange}
                        />
                        <span className="ml-2 text-xs">
                            {`${addressItem.address_line1} ${addressItem.city} ${addressItem.country} ${addressItem.state} ${addressItem.pincode}`}
                        </span>
                    </label>
                ))}
        </div>

        <div className="flex items-center mt-6">
            <Button type="submit" disabled={!valideValue} className="btn-blue btn-lg w-full">
                {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Update Profile'}
            </Button>
        </div>
    </form>
</div>

{/* Change Password Section */}
<Collapse isOpened={isChangePasswordFormShow}>
    <div className="card w-full max-w-screen-lg mx-auto bg-white p-5 shadow-md rounded-md mt-6">
        <div className="pb-3">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <hr className="border-gray-300 mt-2" />
        </div>

        <form className="mt-6" onSubmit={handleSubmitChangePassword}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                    type="text"
                    label="Old Password"
                    variant="outlined"
                    size="small"
                    name="oldPassword"
                    value={changePassword.oldPassword}
                    disabled={isLoading2}
                    onChange={onChangeInput}
                    className="w-full"
                />
                <TextField
                    type="text"
                    label="New Password"
                    variant="outlined"
                    size="small"
                    name="newPassword"
                    value={changePassword.newPassword}
                    onChange={onChangeInput}
                    className="w-full"
                />
            </div>

            <div className="mt-4">
                <TextField
                    type="text"
                    label="Confirm Password"
                    variant="outlined"
                    size="small"
                    name="confirmPassword"
                    value={changePassword.confirmPassword}
                    onChange={onChangeInput}
                    className="w-full sm:w-1/2"
                />
            </div>

            <div className="flex items-center mt-6">
                <Button type="submit" disabled={!valideValue2} className="btn-blue btn-lg w-full">
                    {isLoading2 ? <CircularProgress color="inherit" size={24} /> : 'Change Password'}
                </Button>
            </div>
        </form>
    </div>
</Collapse>

</>
    )
}

export default Profile;