import './App.css'
import './responsive.css'
import React, { forwardRef, useEffect } from 'react';
import {createBrowserRouter , RouterProvider } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar"
import { createContext, useState } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Products from './Pages/Products';
import HomeSliderBanners from './Pages/HomeSliderBanners';
import AddHomeSlide from './Pages/HomeSliderBanners/addHomeSlide';
import CategoryList from './Pages/Category';
import AddCategory from './Pages/Category/addCategory';
import SubCategoryList from './Pages/Category/subCatList';
import AddSubCategory from './Pages/Category/addSubCategory';
import Users from './Pages/Users';
import Orders from './Pages/Orders';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyAccount from './Pages/VerifyAccount';
import ChangePassword from './Pages/ChangePassword';

import toast, { Toaster } from 'react-hot-toast';
import { fetchDataFromApi } from './utils Copy/api';
import Profile from './Pages/Profile';
import AddAddress from './Pages/Address/addAddress.jsx';
import EditCategory from './Pages/Category/editCategory.jsx';
import ProductDetails from './Pages/Products/productDetails.jsx';
import AddRAMS from './Pages/Products/addRAMS.jsx';
import AddWeight from './Pages/Products/addWeight.jsx';
import AddSize from './Pages/Products/addSize.jsx';
import BannerV1List from './Pages/Banners/bannerV1List.jsx';
import BlogList from './Pages/Blog/index.jsx';

const alertBox = (type,msg) =>{
  if(type==="success"){
    toast.success(msg)
  }
  if(type==="error"){
    toast.error(msg)
  }
}


export   const MyContext = createContext(); 

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });


function App() {

  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin , setIsLogin] = useState(false);
  const [isOpenFullScreenPanel , setIsOpenFullScreenPanel] = useState({
    open:false,
    // model: '',
    id:"",
  });
  const [userData,setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sidebarWidth, setSidebarWidth] = useState(18)

useEffect(() =>{
  console.log(windowWidth);
  
  if(windowWidth<992){
    setisSidebarOpen(false);
    setSidebarWidth(windowWidth)
  }
  else{
    setSidebarWidth(18)
  }
},[windowWidth])

  const router = createBrowserRouter([
   { path:"/",
    exact: true,
    element:(<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ?  'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          {/* <div className="sidebarOverlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[50]"></div> */}
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <Dashboard />
          </div>
        </div>
      </section>
    </>)
  },
  { path:"/login",
    exact: true,
    element:<>
      <Login />
    </>
  },
  { path:"/forgot-password",
    exact: true,
    element:<>
      <ForgotPassword />
    </>
  },
  { path:"/sign-up",
    exact: true,
    element:<>
      <SignUp />
    </>
  },
  { path:"/verify-account",
    exact: true,
    element:<>
      <VerifyAccount />
    </>
  },
  { path:"/change-password",
    exact: true,
    element:<>
      <ChangePassword />
    </>
  },
  { path:"/products",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <Products />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/homeSlider/list",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <HomeSliderBanners />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/category/list",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <CategoryList />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/subCategory/list",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <SubCategoryList />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/users",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <Users />
          </div>
        </div>
      </section>
    </>
  } ,
  { path:"/orders",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <Orders />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/profile",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <Profile />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/product/:id",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <ProductDetails />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/product/addRams",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <AddRAMS />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/product/addWeight",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <AddWeight />
          </div>
        </div>
      </section>
    </>
  },
  { path:"/product/addSize",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <AddSize />
          </div>
        </div>
      </section>
    </>
  }
  ,
  { path:"/bannerV1/list",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <BannerV1List />
          </div>
        </div>
      </section>
    </>
  }
   ,
  { path:"/blog/list",
    exact: true,
    element:<>
      <section className="main">
        <Header />
        <div className="contentMain flex ">
        <div
  className={`sidebarWrapper transition-all duration-300 overflow-hidden ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} `}

>
          <Sidebar />
          </div>
          <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
            <BlogList />
          </div>
        </div>
      </section>
    </>
  }
  
  ])
  
    useEffect(()=>{
          const token = localStorage.getItem('accessToken')
          if(token !== undefined && token !==null && token!==""){
            setIsLogin(true);
            fetchDataFromApi(`/api/user/user-details`).then((res) =>{
              // console.log(res);
              setUserData(res?.data);
                //  console.log(res?.response?.data?.error);
              // if(res?.response?.data?.error === true){
                if(res?.response?.data?.message === "You have not logged in and error from auth"){
                  if(res?.response?.data?.error === true){
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refresToken");
                  alertBox("error","Your session is expired please login again")
                  // setIsLogin(false);
                  window.location.href= "/login"
                }
              }
            })
          }
          else{
            setIsLogin(false);
          }

         
    },[isLogin])


    useEffect(()=>{
     getCat();

      const handleResize = () =>{
            setWindowWidth(window.innerWidth)
          }

     window.addEventListener("resize",handleResize);

     return()=>{
      window.removeEventListener("resize",handleResize);
     }
    },[])

    const getCat = () =>{
      fetchDataFromApi("/api/category").then((res) => {
        setCatData(res?.data);
      });
    }

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin , 
    setIsLogin,
    isOpenFullScreenPanel , setIsOpenFullScreenPanel,
    alertBox,
    setUserData,
    userData,
    address, 
    setAddress,
    catData, 
    setCatData,
    getCat,
    windowWidth, 
    setWindowWidth,
    sidebarWidth, 
    setSidebarWidth,


  }
  return (
    <>
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />


     

<Toaster />

      </MyContext.Provider>
      

    </>
  )
}

export default App
