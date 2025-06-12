import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io"
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils Copy/api';

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }

  })

  const context = useContext(MyContext);
  const history = useNavigate();

  const logout = () => {
        // setAnchorMyAcc(null);
    
        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accessToken')}`,{withCredentials: true}).then((res) =>{
          // console.log(res);
          if(res.error === false){
            context.alertBox("success",res?.message);
            context.setIsLogin(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userEmail");
            history("/login");
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
  

  return (
    <>
      {/* <div
  className={`sidebar fixed top-0 left-0 bg-white h-full border-r border-[rgba(0,0,0,0.2)] py-2 px-2 transition-all duration-300 overflow-hidden z-[50] ${context.isSidebarOpen ? 'w-[18%]' : 'w-0'}`} */}
 <div
  className={`${ context.isSidebarOpen=== true ? 'sidebar z-[99]' : '0px'} fixed top-0 left-0 bg-white h-full border-r border-[rgba(0,0,0,0.2)] py-2 px-2 transition-all duration-300 overflow-hidden z-[50] ${context.isSidebarOpen ? 'w-[18%]' : 'w-0'}`}
  // style={{ width: context.isSidebarOpen=== true ? '18%' : '0px' }}


  //  className={`sidebar fixed top-0 left-0 bg-white h-full border-r border-[rgba(0,0,0,0.2)] py-2 px-2 transition-all duration-300 
  // overflow-hidden z-[50] w-[${context.isSidebarOpen===true ? 'context?.sidebarW' : '0px'}] `}
>
        <div className="py-2 w-full" 
        onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false);
          setSubmenuIndex(null)
        }}
        >
          <Link to="/">
            <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/logo-1691412328.jpg" alt="image" className='w-[120px] px-4' /></Link>
        </div>


        <ul className='mt-4 overflow-y-scroll max-h-[80vh]'>
          <li>
            <Link to="/" 
             onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
>
              <Button className='w-full !capitalize !justify-start flex gap-3 tex-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                <RxDashboard className='text-[18px] ' /><span>Dashboard</span></Button>
            </Link>
          </li>

          <li>
            <Button
              className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'
              onClick={() => isOpenSubMenu(1)}
            >
              <FaRegImage className='text-[18px]' />
              <span>Home Slides</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 1}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/homeSlider/list"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
                  >
                  <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[500] !pl-9 flex gap-3'>
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                    Home Banner List
                  </Button>
                  </Link>
                </li>

                <li className='w-full'>
                  <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3'
                   onClick={() => {context.setIsOpenFullScreenPanel({
                      open:true,
                      model:"Add Home Slide"
                    }) 
          context?.windowWidth<992 && context?.setisSidebarOpen(false)   
          setSubmenuIndex(null)                 
                    }}>
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                    Add Home Banner Slide
                  </Button>
                </li>


              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/users" 
             onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}>
              <Button className='w-full !capitalize !justify-start flex gap-3 tex-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                <FaUsers className='text-[18px] ' /><span>Users</span></Button>
            </Link>
          </li>

          <li>
            <Button
              className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'
              onClick={() => isOpenSubMenu(3)}
            >
              <RiProductHuntLine className='text-[18px]' />
              <span>Products</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 3}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/products"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[500] !pl-9 flex gap-3'>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>

                <li className='w-full'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' onClick={() => {context.setIsOpenFullScreenPanel({
                      open:true,
                      model:"Add Product"
                    })
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
           }}>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Product Upload
                    </Button>
                </li>


                <li className='w-full'>
                  <Link to="/product/addRams"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add Product RAMS
                    </Button>
                    </Link>
                </li>

                <li className='w-full'>
                  <Link to="/product/addWeight"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add Product Weight
                    </Button>
                    </Link>
                </li>

                <li className='w-full'>
                  <Link to="/product/addSize" 
                  
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add Product Size
                    </Button>
                    </Link>
                </li>


              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'
              onClick={() => isOpenSubMenu(4)}
            >
              <TbCategory className='text-[18px]' />
              <span>Category</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 4}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/category/list"
                  
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[500] !pl-9 flex gap-3'>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>

                <li className='w-full'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' onClick={() =>{ context.setIsOpenFullScreenPanel({
                open: true,
                model:'Add New Category'
            })
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
      }}>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add a Category
                    </Button>
                </li>

                <li className='w-full'>
                  <Link to="/subCategory/list"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' >
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Sub Category List
                    </Button>
                  </Link>
                </li>

                <li className='w-full'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' onClick={() => {context.setIsOpenFullScreenPanel({
                open: true,
                model:'Add New Sub Category'
            })
           
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]" ></span>
                      Add a Sub Category
                    </Button>
                </li>

              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/orders"
             onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}>
              <Button className='w-full !capitalize !justify-start flex gap-3 tex-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'>
                <IoBagCheckOutline className='text-[20px] ' /><span>Orders</span></Button>
            </Link>
          </li>

          <li>
            <Button
              className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'
              onClick={() => isOpenSubMenu(5)}
            >
              <RiProductHuntLine className='text-[18px]' />
              <span>Banners</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 5 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 5}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/bannerV1/list"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[500] !pl-9 flex gap-3'>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Banner V1 List
                    </Button>
                  </Link>
                </li>

                <li className='w-full'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' onClick={() => {context.setIsOpenFullScreenPanel({
                      open:true,
                      model:"Add BannerV1"
                    })
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add Banner V1
                    </Button>
                </li>

              </ul>
            </Collapse>
          </li>


          <li>
            <Button
              className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]'
              onClick={() => isOpenSubMenu(6)}
            >
              <RiProductHuntLine className='text-[18px]' />
              <span>Blog</span>
              <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
                <FaAngleDown className={`transition-all ${submenuIndex === 6 ? 'rotate-180' : ''}`} />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === 6}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/blog/list"
                   onClick={() =>{
          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
        }}
        >
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[500] !pl-9 flex gap-3'>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                     Blog List
                    </Button>
                  </Link>
                </li>

                <li className='w-full'>
                    <Button className='!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] font-[400] !pl-9 flex gap-3' onClick={() => {context.setIsOpenFullScreenPanel({
                      open:true,
                      model:"Add Blog"
                    })

          context?.windowWidth<992 && context?.setisSidebarOpen(false)
          setSubmenuIndex(null)
       
        }}>
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)]"></span>
                      Add Blog
                    </Button>
                </li>

              </ul>
            </Collapse>
          </li>

          <li>

            <Button onClick={logout} className='w-full !capitalize !justify-start flex gap-3 tex-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center hover:!bg-[#f1f1f1] !py-2'>
              <IoMdLogOut className='text-[20px] ' /><span>Logout</span></Button></li>
        </ul>
      </div>


      {/* <div className="sidebarOverlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[51]" onClick={() => context?.setisSidebarOpen(false)}></div> */}
    </>
  )
}


export default Sidebar;