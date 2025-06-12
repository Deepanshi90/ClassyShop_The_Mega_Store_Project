const router = createBrowserRouter([
    { path:"/",
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
             <Dashboard />
           </div>
         </div>
       </section>
     </>
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
   }
   
   ])
  
   
   export default router;