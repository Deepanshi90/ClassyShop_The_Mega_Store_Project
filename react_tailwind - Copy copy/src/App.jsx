import { createContext, useEffect, useState } from 'react'
import './App.css'
import './responsive.css'
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
import Search from './components/Search'
import BlogItem from './components/BlogItem'
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
import { fetchDataFromApi, postData } from './utils/api'
import Address from './Pages/MyAccount/address'
import OrderSuccess from './Pages/Orders/success'
import OrderFailed from './Pages/Orders/failed'
import SearchPage from './Pages/Search'
import BlogDetail from './Pages/Blog/blogDetail'
import HelpCenter from './Pages/HelpCenter/helpCenter'
import AboutUsSection from './Pages/AboutUs/aboutUs'
import DeliveryInfoPage from './Pages/delivery/delivery'
import LegalNoticePage from './Pages/Legal/legalNotice'
import TermsAndConditions from './Pages/term/termCondition'
import SecurePayment from './Pages/Payment/securePayment'
import PriceDrop from './Pages/PriceDrop/priceDrop'
import NewProducts from './Pages/NewProduct/newProduct'
import SalesCharts from './Pages/BestSale/BestSales'
import SiteMapPage from './Pages/SiteMap/siteMap'
import StoresPage from './Pages/Stores/stores'
import StoreRegistration from './Pages/Stores/storeRegister'
import SubscribeToNewsletter from './Pages/NewsLetter/NewsLetter'
import ContactUs from './Pages/contactUs/contact'
import ContactSuccess from './Pages/contactUs/contactSuccess'
import Chatbot from './Pages/catgpt/Chatbot'
import NotFound from './Pages/error/errorPage'
import StoreConfirmation from './Pages/Stores/StoreConfirmation'

const alertBox = (type, msg) => {
  if (type === "success") {
    toast.success(msg)
  }
  if (type === "error") {
    toast.error(msg)
  }
}

const MyContext = createContext();
function App() {
  const [count, setCount] = useState(0);
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] = useState(false);
   const [openAddressPanel, setOpenAddressPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [addressMode, setAddressMode] = useState("add");
  const [addressId,setAddressId] = useState();
  const [searchData,setSearchData] = useState([]);
  const [windowWidth,setWindowWidth] = useState(window.innerWidth);

  const [openFilter,setOpenFilter] = useState(false);
  const [isFilterBtnShow,setIsFilterBtnShow] = useState(false);
  // const [openSearchPanel,setOpenSearchPanel] = useState(false);
  const [openSearchPanel,setOpenSearchPanel] = useState(false);
  // const [userData,setUserData] = useState({
  //   userName:'',
  //   userEmail:''
  // });
  const [userData, setUserData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

   const toggleAddressPanel = (newOpen) => () => {
    // alert(newOpen);
    if(newOpen == false) {
      setAddressMode("add")
    }
    setOpenAddressPanel(newOpen);
  };

  const [myListData, setMyListData] = useState([]);

  const handleOpenProductDetailsModal = (status, item) => {
    // alert(status)
    setOpenProductDetailsModal({
      open: true,
      item: item
    });
  }


  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {}
    });
  };


  // useEffect(()=>{
  //       const token = localStorage.getItem('accessToken')
  //       if(token !== undefined && token !==null && token!==""){
  //         setIsLogin(true);
  //         // fetchDataFromApi(`/api/user/user-details`).then((res) =>{
  //         //   setUserData(res.data);
  //         //   console.log(res?.response?.data?.error);
  //         //   if(res?.response?.data?.error === true){
  //         //     if(res?.response?.data?.message === "You have not logged In"){
  //         //       localStorage.removeItem("accessToken");
  //         //       localStorage.removeItem("refresToken");
  //         //       alertBox("error","Your session is expired please login again")
  //         //       setIsLogin(false);
  //         //     }
  //         //   }

  //         // })
  //         fetchDataFromApi(`/api/user/user-details`).then((res) =>{
  //           console.log(res);
  //           setUserData(res?.data);
  //             //  console.log(res?.response?.data?.error);
  //           if(res?.response?.data?.error === true){
  //             if(res?.response?.data?.message === "You have not logged in and error from auth"){
  //               localStorage.removeItem("accessToken");
  //               localStorage.removeItem("refresToken");
  //               alertBox("error","Your session is expired please login again")
  //               // setIsLogin(false);
  //               window.location.href= "/login"
  //             }
  //           }
  //         })
  //       }
  //       else{
  //         setIsLogin(false);
  //       }
  // },[isLogin])

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);

      getCartItems();
      getMyListData();
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const getUserDetails = () =>{
          fetchDataFromApi(`/api/user/user-details`).then((res) => {
        console.log(res);

        if (res?.error === false && res?.data) {
          setUserData(res.data);
        } else if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not logged in and error from auth") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refresToken");
            alertBox("error", "Your session is expired please login again");
            window.location.href = "/login";
          }
        } else {
          console.warn("Unexpected API response:", res);
        }
      }).catch((err) => {
        console.error("API call failed:", err);
        alertBox("error", "Failed to fetch user details.");
      });
  }

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


  const openAlertBox = (status, msg) => {


    if (status === "success") {
      toast.success(msg);

    }
    if (status === "error") {
      toast.error(msg);

    }
  }

  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if (res?.error === false) {
        setCatData(res?.data);
      }
      console.log(res);

    })

    const handleResize = () =>{
            setWindowWidth(window.innerWidth)
          }

     window.addEventListener("resize",handleResize);

     return()=>{
      window.removeEventListener("resize",handleResize);
     }

  }, [])

  const addToCart = (product, userId, quantity) => {
    // console.log(product,userId);
    // console.log(userData);

    if (userId === undefined) {
      alertBox("error", "You are not login. Please login first than add the product to the cart!");
      return false;
    }

    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      quantity: Number(quantity),
      subTotal: Number(product?.price) * Number(quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      userId: userId,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram,

    }
    console.log(data);

    postData(`/api/cart/add`, data).then((res) => {

      if (res?.error === false) {
        alertBox("success", res?.message);

        getCartItems();
        getMyListData();
      }
      else {
        alertBox("error", res?.message)
      }

    })
  }

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data)
      }
    })
  }


  useEffect(() => {
  getMyListData();
}, []);

  const getMyListData = () => {
    // console.log("userId:", userId);
// console.log("myListItems:", myListItems);
    fetchDataFromApi(`/api/myList`).then((res) => {
      console.log(res);
      
      if (res?.error === false) {
        setMyListData(res?.data)
      }
    })
  }


  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    setOpenAddressPanel,
    openAddressPanel,
    toggleAddressPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    alertBox,
    setUserData,
    userData,
    catData,
    setCatData,
    addToCart,
    cartData,
    getCartItems,
    setCartData, fullWidth,
    maxWidth,
    myListData,
    setMyListData,
    getMyListData,
    getUserDetails,
    addressMode, 
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
    windowWidth,
    setWindowWidth,
    openFilter,
    setOpenFilter,
    isFilterBtnShow,
    setIsFilterBtnShow,
    openSearchPanel,
    setOpenSearchPanel

  }

  return (
    <>

      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
            <Chatbot />
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
            <Route path={'/address'} exact={true} element={<Address />} />
            <Route path={'/order/success'} exact={true} element={<OrderSuccess />} />
             <Route path={'/order/failed'} exact={true} element={<OrderFailed />} />
              <Route path={'/search'} exact={true} element={<SearchPage />} />
               <Route path={'/blog/:id'} exact={true} element={<BlogDetail />} />
                <Route path={'/help-center'} exact={true} element={<HelpCenter />} />
                 <Route path={'/aboutUs'} exact={true} element={<AboutUsSection />} />
                  <Route path={'/delivery'} exact={true} element={<DeliveryInfoPage />} />
                  <Route path={'/legal'} exact={true} element={<LegalNoticePage />} />
                  <Route path={'/condition'} exact={true} element={<TermsAndConditions />} />
                  <Route path={'/securePayment'} exact={true} element={<SecurePayment />} />
                  <Route path={'/priceDrop'} exact={true} element={<PriceDrop />} />
                  <Route path={'/newProduct'} exact={true} element={<NewProducts />} /> 
                  <Route path={'/bestSale'} exact={true} element={<SalesCharts />} />
                   <Route path={'/sitemap'} exact={true} element={<SiteMapPage />} />
                    <Route path={'/stores'} exact={true} element={<StoresPage/>} />
                    <Route path={'/storesRegister'} exact={true} element={<StoreRegistration/>} />
                    <Route path={'/store-confirmation'} exact={true} element={<StoreConfirmation/>} />
                    <Route path={'/subscribe'} exact={true} element={<SubscribeToNewsletter/>} />
                     <Route path={'/contact'} exact={true} element={<ContactUs />} />
                                    <Route path={'/contact-success'} exact={true} element={<ContactSuccess />} />
                                    <Route path="*" element={<NotFound />} />
              
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />




      <Toaster />


    </>
  )
}

export default App
export { MyContext };