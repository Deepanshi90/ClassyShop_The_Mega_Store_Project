import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react';
import CategoryCollapse from '../../CategoryCollapse';
import { Button } from '@mui/material';
import { MyContext } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../../../utils/api';

const CategoryPanel = (props) => {

  const context = React.useContext(MyContext);

  const history = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
    props.propsSetIsOpenCatPanel(newOpen)
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      {
        context?.windowWidth<992 &&
        <div className="p-3">
        <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" alt="logo" className='w-[170px]'/>
      </div>
      }
      <h3 className='p-3 text-[18px] font-[500] flex items-center justify-between'>
        Shop By Categories
        <IoCloseSharp onClick={toggleDrawer(false)} className='cursor-pointer text-[20px]' />
      </h3>

      {
        props?.data?.length !==0 && <CategoryCollapse data={props?.data} />
      }

   {
    context?.windowWidth < 992 && context?.isLogin === false && 
          <Link to="/login" className='p-3 block' onClick={() =>{
            props.setIsOpenCatPanel(false);
    props.propsSetIsOpenCatPanel(false)
          }}>
    <Button className='btn-org w-full'>Login</Button>   
    </Link>

   }

    {
    context?.windowWidth < 992 && context?.isLogin === true && 
          <div  className='p-3 block' onClick={() =>{
             props.setIsOpenCatPanel(false);
    props.propsSetIsOpenCatPanel(false)
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
          }}>
    <Button className='btn-org w-full'>Logout</Button>   
    </div>

   }
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;
