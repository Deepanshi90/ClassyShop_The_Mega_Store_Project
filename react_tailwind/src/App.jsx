import './i18n';
import { createContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'
import ProductDetails from './Pages/ProductDetails'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductZoom } from "./components/ProductZoom";
import { IoCloseSharp } from 'react-icons/io5'
import { ProductDetailsComponents } from './components/ProductDetails'
import Login from './Pages/Login';
import Register from './Pages/Register'
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'
import ForgetPassword from './Pages/ForgetPassword'
import MyAccount from './Pages/MyAccount'

import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import { fetchDataFromApi } from './utils/api'

const alertBox = (type,msg) =>{
  if(type==="success"){
    toast.success(msg)
  }
  if(type==="error"){
    toast.error(msg)
  }
}

const MyContext = createContext();
function App() {
  const [count, setCount] = useState(0);
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin , setIsLogin] = useState(false);
  const [userData,setUserData] = useState({
    userName:'',
    userEmail:''
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleCartPanel= (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };


  useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        if(token !== undefined && token !==null && token!==""){
          setIsLogin(true);
          fetchDataFromApi(`/api/user/user-details`).then((res) =>{
            setUserData(res.data);
            console.log(res?.response?.data?.error);
            if(res?.response?.data?.error === true){
              if(res?.response?.data?.message === "You have not logged In"){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refresToken");
                alertBox("error","Your session is expired please login again")
                setIsLogin(false);
              }
            }
            
          })
        }
        else{
          setIsLogin(false);
        }
  },[isLogin])

  // useEffect(() => {
  //   const token = localStorage.getItem('accesstoken');
  //   console.log(token);
  
  //   if (token) {
  //     setIsLogin(true);
  
  //     fetchDataFromApi(`/api/user/user-details`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then((res) => {
  //       console.log(res);
  //       setUserData(res.data);
  //     }).catch((err) => {
  //       console.error(err);
  //     });

  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);
  

  const openAlertBox=(status ,msg) =>{
   
    
    if(status==="success"){
      toast.success(msg);

    }
    if(status==="error"){
      toast.error(msg);

    }
  }

  const values = {
    setOpenProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    alertBox ,setUserData,
    userData
  }

  

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };


  return (
    <>

      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={'/'} exact={true} element={<Home />} />
            <Route path={'/productListing'} exact={true} element={<ProductListing />} />
            <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
            <Route path={'/login'} exact={true} element={<Login />} />
            <Route path={'/register'} exact={true} element={<Register />} />
            <Route path={'/cart'} exact={true} element={<CartPage />} />
            <Route path={'/verify'} exact={true} element={<Verify />} />
            <Route path={'/forget-password'} exact={true} element={<ForgetPassword />} />
            <Route path={'/checkout'} exact={true} element={<Checkout />} />
            <Route path={'/my-account'} exact={true} element={<MyAccount />} />
            <Route path={'/my-list'} exact={true} element={<MyList />} />
            <Route path={'/my-orders'} exact={true} element={<Orders />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        open={openProductDetailsModal}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >

        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' onClick={handleCloseProductDetailsModal}>< IoCloseSharp className='text-[20px]' /></Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
              <ProductDetailsComponents />
            </div>
          </div>
        </DialogContent>

      </Dialog>


      <Toaster />


    </>
  )
}

export default App
export { MyContext };