import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { IoHomeOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';
import { BsBagCheck } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { MyContext } from '../../../App';
import { useLocation } from 'react-router-dom';


const MobileNav = () => {
  const context = useContext(MyContext);

  const location = useLocation();

  useEffect(() =>{
    // console.log(location.pathname);
    // if(location.pathname === "/product"){
          if(location.pathname === "/productListing"){
      context?.setIsFilterBtnShow(true)
    }
    else{
context?.setIsFilterBtnShow(false)
    }
    
  },[location])

  const openFilters =()=>{
    context?.setOpenFilter(true);
  }
  return (
    <div className="mobileNav bg-white p-1 px-3 w-full flex items-center justify-between fixed bottom-0 left-0 gap-0 z-[51]" >
        <NavLink to="/" exact={true} activeClassName="isActive">
        <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
            <IoHomeOutline size={18}/>
            <span className='text-[12px]'>Home</span>
        </Button>
        </NavLink>

       
        {
          context?.isFilterBtnShow === true &&
 <Button className='flex-col !w-[40px] !h-[40px] !min-w-[40px] !capitalize !text-gray-700 !bg-[#ff5252] !rounded-full'
         onClick={openFilters}>
            <MdOutlineFilterAlt size={18} className='text-white'/>
            {/* <span className='text-[12px]'>Filters</span> */}
        </Button>
        }


        <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700' onClick={() => context?.setOpenSearchPanel(true)}>
            <IoSearch size={18}/>
            <span className='text-[12px]'>Search</span>
        </Button>
        {/* <Button
  className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'
  onClick={() => {
    console.log("Opening search panel...");
    context?.setOpenSearchPanel(true);
  }}
>
  <IoSearch size={18} />
  <span className='text-[12px]'>Search</span>
</Button> */}


 <NavLink to="/my-list" exact={true} activeClassName="isActive">
        <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
            <LuHeart size={18}/>
            <span className='text-[12px]'>WishList</span>
        </Button>
        </NavLink>
 <NavLink to="/my-orders" exact={true} activeClassName="isActive">
        <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
            <BsBagCheck size={18}/>
            <span className='text-[12px]'>Orders</span>
        </Button>
       </NavLink>
 <NavLink to="/my-account" exact={true} activeClassName="isActive">
        <Button className='flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700'>
            <FiUser size={18}/>
            <span className='text-[12px]'>Account</span>
        </Button>
        </NavLink>
    </div>
  )
}



// const MobileNav = () => {
//   const linkClass = ({ isActive }) =>
//     `flex flex-col items-center !w-[40px] !min-w-[40px] text-[12px] ${
//       isActive ? "text-[#ff5252]" : "text-gray-700"
//     }`;

//   return (
//     <div className="mobileNav bg-white p-1 px-3 w-full grid grid-cols-5 fixed bottom-0 left-0 place-items-center  shadow-md z-51">
      
//       <NavLink to="/" className={linkClass}>
//         <IoHomeOutline size={18} />
//         <span>Home</span>
//       </NavLink>


//         <IoHomeOutline size={18} />
//         <span>Filters</span>


//       <div className="flex flex-col items-center !w-[40px] !min-w-[40px] text-gray-700 text-[12px]">
//         <IoSearch size={18} />
//         <span>Search</span>
//       </div>

//       <NavLink to="/my-list" className={linkClass}>
//         <LuHeart size={18} />
//         <span>WishList</span>
//       </NavLink>

//       <NavLink to="/my-orders" className={linkClass}>
//         <BsBagCheck size={18} />
//         <span>Orders</span>
//       </NavLink>

//       <NavLink to="/my-account" className={linkClass}>
//         <FiUser size={18} />
//         <span>Account</span>
//       </NavLink>

//     </div>
//   );
// };



export default MobileNav;


    // <div className="mobileNav bg-white p-1 px-3 w-full grid grid-cols-5 fixed bottom-0 left-0 place-items-center z-50 shadow-md">
      
    //   <NavLink
    //     to="/"
    //     className={({ isActive }) =>
    //       `flex flex-col items-center ${isActive ? "text-[#ff5252]" : "!text-gray-700"}`
    //     }
    //   >
    //     <Button className="!w-[40px] !min-w-[40px] !capitalize flex-col">
    //       <IoHomeOutline size={18} />
    //       <span className="text-[12px]">Home</span>
    //     </Button>
    //   </NavLink>

    //   <div className="flex flex-col items-center !text-gray-700">
    //     <Button className="!w-[40px] !min-w-[40px] !capitalize flex-col">
    //       <IoSearch size={18} />
    //       <span className="text-[12px]">Search</span>
    //     </Button>
    //   </div>

    //   <NavLink
    //     to="/my-list"
    //     className={({ isActive }) =>
    //       `flex flex-col items-center ${isActive ? "!text-[#ff5252]" : "!text-gray-700"}`
    //     }
    //   >
    //     <Button className="!w-[40px] !min-w-[40px] !capitalize flex-col !text-gray-700">
    //       <LuHeart size={18} />
    //       <span className="text-[12px]">WishList</span>
    //     </Button>
    //   </NavLink>

    //   <NavLink
    //     to="/my-orders"
    //     className={({ isActive }) =>
    //       `flex flex-col items-center ${isActive ? "text-[#ff5252]" : "!text-gray-700"}`
    //     }
    //   >
    //     <Button className="!w-[40px] !min-w-[40px] !capitalize flex-col">
    //       <BsBagCheck size={18} />
    //       <span className="text-[12px]">Orders</span>
    //     </Button>
    //   </NavLink>

    //   <NavLink
    //     to="/my-account"
    //     className={({ isActive }) =>
    //       `flex flex-col items-center ${isActive ? "text-[#ff5252]" : "!text-gray-700"}`
    //     }
    //   >
    //     <Button className="!w-[40px] !min-w-[40px] !capitalize flex-col">
    //       <FiUser size={18} />
    //       <span className="text-[12px]">Account</span>
    //     </Button>
    //   </NavLink>

    // </div>