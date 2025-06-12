import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search/index';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { Button } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoIosLogOut } from 'react-icons/io';
import { fetchDataFromApi, postData } from '../../utils/api';
import { toast } from 'react-toastify';
import { HiOutlineMenu } from 'react-icons/hi';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Header = () => {

  const context = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useNavigate();
  const logout = () => {
    setAnchorEl(null);

    fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{withCredentials: true}).then((res) =>{
      console.log(res);
      if(res.error === false){
        context.alertBox("success",res?.message);
        context.setIsLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        context.setUserData(null);
        context?.setCartData([])
        context?.setMyListData([])
        history("/");
      }else{
        context.alertBox("error",res?.message);
        context.setIsLogin(true);
      }
     

      
    })
    // localStorage.removeItem('accessToken');
    // context.setIsLogin(false);
    // toast.success('Logout successful!');
    history("/");  // Redirect to login page after logout
  };
  const [isOpenCatPanel,setIsOpenCatPanel] = useState(false);
  


  return (
    <header className='bg-white sticky -top-[60px] z-100'>
      <div className="top-strip py-2 border-t-[1px] border-gray-200 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%] hidden lg:block">
              <p className="text-[12px] font-[500]">Get up to 50% off new season styles, limited time only</p>
            </div>

            <div className="col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end">
              <ul className='flex items-center gap-3 w-full justify-between lg:w-[200px]'>
                <li className="list-none">
                  <Link to="/help-center" className='text-[11px] lg:text-[13px] link font-[500] transition' >Help Center</Link>
                </li>
                <li className="list-none">
                  <Link to="/my-orders" className='text-[11px] lg:text-[13px] link font-[500] transition' >Order Tracking</Link>
                </li>
              </ul>
            </div>


          </div>
        </div>

      </div>
      <div className="header py-2 lg:py-4 border-b-[1px] border-gray-200">
        <div className="container flex items-center justify-between">
          {
            context?.windowWidth <992 &&   
            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-800' onClick={() => setIsOpenCatPanel(true)}>
              <HiOutlineMenu size={22}/></Button>
          }
        
          <div className="col1 w-[40%] lg:w-[25%]">
            <Link to={"/"}> <img src='/logo.jpg' alt='Comapny logo'></img></Link>
          </div>
          <div className="col2  fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 hidden lg:block">
            <Search />
          </div>
          <div className="col3 w-[10%]  lg:w-[35%] flex items-center pl-7">

            <ul className='flex items-center justify-end gap-0 lg:gap-3 w-full'>
              {
                context.isLogin === false ?
                  <li className="list-none">
                    <Link to="/login" className='link transition text-[15px] f-[500]'>Login</Link> |  <Link to={"/register"} className='link transition text-[15px] f-[500]'>Register</Link>
                  </li>
                  :
                  (
                    <>
                    {
                      context?.windowWidth>992 && 
                       <li>
                      <Button className=" !text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer" onClick={handleClick}>
                        <Button className='!w-[40px !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] '><FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                        </Button>
{
  context?.windowWidth >992 && 

         <div className="info flex flex-col">
                          <h4 className='leading-3 text-[14px] font-[500] mb-0 text-[rgba(0,0,0,0.7)]  capitalize text-left justify-start'>
                          {context?.userData?.name || "ABC"}
  </h4>
                            <span className='text-[13px] font-[400]  text-[rgba(0,0,0,0.7)]  capitalize text-left justify-start'>
                              {context?.userData?.email || "abc@gmaim.com"}</span>
                        </div>

}
                 
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: {
                              overflow: 'visible',
                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                              mt: 1.5,
                              '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                              },
                              '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                              },
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <Link to="/my-account" className='w-full block link'>
                          <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                            <FaRegUser className='text-[14px]' /> <span className='text-[14px] '> My account</span>
                          </MenuItem>
                        </Link>
                        <Link to="/my-orders" className='w-full block link'>
                          <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                            <IoBagCheckOutline className='text-[14px]' /> <span className='text-[14px] '>Orders</span>
                          </MenuItem>
                        </Link>

                        <Link to="/my-list" className='w-full block link'>
                          <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                            <IoMdHeartEmpty className='text-[14px]' /> <span className='text-[14px] '>My Lists</span>
                          </MenuItem>
                        </Link>

                        <MenuItem onClick={logout} className='flex gap-2 !py-2'>
                          <IoIosLogOut className='text-[14px]' /> <span className='text-[14px] '>Logout</span>
                        </MenuItem>
                      </Menu>
                      </li>
                    }
                   
                    </>
                  )
              }

{/* 
              <li>
                <Tooltip title="Compare" >
                  <IconButton aria-label="cart" >
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoIosGitCompare /></StyledBadge>
                  </IconButton></Tooltip>
              </li> */}

              {
                context?.windowWidth >800 && 
                 <li>
                <Tooltip title="Wish List" >
                  <Link to={"/my-list"}>
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={context?.myListData?.length || "0"} color="secondary">
                      <FaRegHeart /></StyledBadge>
                  </IconButton>
                  </Link>
                  </Tooltip>
              </li>
              }
             
              <li>
                <Tooltip title="Cart" >
                  <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
                    <StyledBadge badgeContent={context?.cartData?.length || "0"} color="secondary">
                      <MdOutlineShoppingCart /></StyledBadge>
                  </IconButton></Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel}/>
    </header>
  )
}

export default Header;