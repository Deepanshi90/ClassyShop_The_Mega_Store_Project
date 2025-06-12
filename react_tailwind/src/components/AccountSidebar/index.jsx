import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { NavLink } from "react-router";
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import {  uploadImage } from '../../utils/api';


const AccountSidebar = () => {

    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const context = useContext(MyContext);

    const formdata = new FormData();

    useEffect(() => {
        const userAvtar = [];
    
        // First check context
        if (context?.userData?.avatar) {
            userAvtar.push(context.userData.avatar);
        } else {
            // If not available, try localStorage
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar) {
                userAvtar.push(savedAvatar);
            }
        }
        const email = localStorage.getItem("userEmail");
        if (email) {
          setUserEmail(email);
        }  
    
        setPreviews(userAvtar);
    }, [context?.userData]);
    let selectedImages = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);

            const files = e.target.files;
            setUploading(true);

            console.log(files);

            for(var i =0;i< files.length;i++){
                if(
                    files[i] &&
                    (
                        files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ){
                    const file = files[i];
                    selectedImages.push(file);
                    formdata.append(`avatar`,file);

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
                    
                }else{
                    context.alertBox("error","Please select a valid JPG , PNG or WEPG image file.");
                    setUploading(false);
                    return false;
                }
            }

        } catch (error) {
            console.log("Error from AccountSidebar", error);


        }
    }

    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
            <div className="w-full p-5 flex items-center justify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">

                    {
                        uploading === true ? <CircularProgress color="inherit" /> :
                        
                        <>
                        {
                            previews?.length !== 0 ? previews?.map((img,index) =>{
                                // console.log(img);
                                
                                return (
                                    <img src={img} key={index} alt="account_image" className='w-full h-full object-cover' />
                                )
                            }): <img src="https://www.bing.com/th/id/OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa?w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="account_image" className='w-full h-full object-cover' />
                        }
                        </>
                        
                    }
                    

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                        <FaCloudUploadAlt className='text-[#fff] text-[25px] ' />
                        <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 ' accept='image/*'
                            onChange={(e) => {
                                onChangeFile(e, "/api/user/user-avatar")
                            }} name='avatar' />
                    </div>
                </div>

                <h3>{context?.userData?.name}</h3>
                <h6 className='text-[13px] font-[500]'>{userEmail || "example@gmail.com"}</h6>
            </div>

            <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>

                <li className='w-full'>
                    <NavLink to="/my-account" exact={true} activeClassName="isActive">
                        <Button className=' w-full !capitalize !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'><FaRegUser className='text-[15px]' />My Profile</Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-list" exact={true} activeClassName="isActive">
                        <Button className=' w-full !capitalize  !py-2 !justify-start !text-left !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'><IoBagCheckOutline className='text-[17px]' />My List</Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-orders" exact={true} activeClassName="isActive">
                        <Button className=' w-full !capitalize  !py-2 !justify-start !text-left !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'><IoMdHeartEmpty className='text-[17px]' />My Order</Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <Button className=' w-full !capitalize  !py-2 !justify-start !text-left !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>< IoIosLogOut className='text-[18px]' />Logout</Button>
                </li>

            </ul>
        </div>
    )
}

export default AccountSidebar;


// import React, { useContext, useEffect, useState } from 'react';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import { FaRegUser } from 'react-icons/fa6';
// import { IoBagCheckOutline } from 'react-icons/io5';
// import { IoMdHeartEmpty } from 'react-icons/io';
// import { IoIosLogOut } from 'react-icons/io';
// import { NavLink } from "react-router-dom"; // corrected import
// import { Button } from '@mui/material';
// import { MyContext } from '../../App';
// import CircularProgress from '@mui/material/CircularProgress';
// import { editData } from '../../utils/api';

// const AccountSidebar = () => {

//     const [previews, setPreviews] = useState([]);
//     const [uploading, setUploading] = useState(false);
//     const [userEmail, setUserEmail] = useState("");
//     const context = useContext(MyContext);

//     const formdata = new FormData();

// useEffect(() => {
//     const userAvatar = [];

//     if (context?.userData?.avatar) {
//         userAvatar.push(context.userData.avatar);
//     }

//     const email = context?.userData?.email|| localStorage.getItem("userEmail");
//     if (email) {
//         setUserEmail(email);
//     }

//     setPreviews(userAvatar);
// }, [context?.userData]);


//     const onChangeFile = async (e) => {
//         try {
//             setPreviews([]);
//             const files = e.target.files;
//             setUploading(true);

//             if (!files || files.length === 0) return;

//             const file = files[0]; // assuming single file upload
//             if (file && ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
                
//                 formdata.append('avatar', file);

//                 const res = await editData("/api/user/user-avatar", formdata);

//                 setUploading(false);

//                 const newAvatar = res?.data?.avtar;
//                 if (newAvatar) {
//                     setPreviews([newAvatar]);

//                     // Update userData in context
//                     if (context?.setUserData) {
//                         context.setUserData(prev => ({
//                             ...prev,
//                             avatar: newAvatar
//                         }));
//                     }

//                     // Save to localStorage
//                     localStorage.setItem('userAvatar', newAvatar);
//                 }
//             } else {
//                 context.alertBox("error", "Please select a valid JPG, PNG, or WEBP image file.");
//                 setUploading(false);
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error from AccountSidebar:", error);
//             setUploading(false);
//         }
//     };

//     const handleLogout = () => {
//         if (context?.setUserData) {
//             context.setUserData(null); // clear user from context
//         }
//         localStorage.removeItem('userAvatar');
//         localStorage.removeItem('userEmail');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('userId');
//         // Clear any other stored data related to old user
//         // Finally, redirect
//         window.location.href = "/login"; // safer to go to login page
//     };

//     return (
//         <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
//             <div className="w-full p-5 flex items-center justify-center flex-col">
//                 <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
//                     {uploading ? (
//                         <CircularProgress color="inherit" />
//                     ) : (
//                         <>
//                             {previews.length > 0 ? (
//                                 previews.map((img, index) => (
//                                     <img src={img} key={index} alt="account_image" className='w-full h-full object-cover' />
//                                 ))
//                             ) : (
//                                 <FaRegUser className="text-[40px] text-gray-500" />
//                             )}
//                         </>
//                     )}

//                     <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
//                         <FaCloudUploadAlt className='text-white text-[25px]' />
//                         <input
//                             type="file"
//                             className='absolute top-0 left-0 w-full h-full opacity-0'
//                             accept='image/*'
//                             onChange={onChangeFile}
//                             name='avatar'
//                         />
//                     </div>
//                 </div>

//                 <h3>{context?.userData?.name}</h3>
//                 <h6 className='text-[13px] font-[500]'>{userEmail || "example@gmail.com"}</h6>
//             </div>

//             <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>
//                 <li className='w-full'>
//                     <NavLink to="/my-account" exact={true} activeClassName="isActive">
//                         <Button className='w-full !capitalize !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
//                             <FaRegUser className='text-[15px]' /> My Profile
//                         </Button>
//                     </NavLink>
//                 </li>

//                 <li className='w-full'>
//                     <NavLink to="/my-list" exact={true} activeClassName="isActive">
//                         <Button className='w-full !capitalize !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
//                             <IoBagCheckOutline className='text-[17px]' /> My List
//                         </Button>
//                     </NavLink>
//                 </li>

//                 <li className='w-full'>
//                     <NavLink to="/my-orders" exact={true} activeClassName="isActive">
//                         <Button className='w-full !capitalize !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
//                             <IoMdHeartEmpty className='text-[17px]' /> My Orders
//                         </Button>
//                     </NavLink>
//                 </li>

//                 <li className='w-full'>
//                     <Button onClick={handleLogout} className='w-full !capitalize !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
//                         <IoIosLogOut className='text-[18px]' /> Logout
//                     </Button>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default AccountSidebar;
