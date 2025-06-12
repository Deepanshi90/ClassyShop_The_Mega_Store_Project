import React, { useState, PureComponent, useContext, useEffect } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import { FaAngleUp } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import { FaAngleDown } from 'react-icons/fa6';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from "react-icons/go";
import TooltipMUI from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { BiExport } from "react-icons/bi";
import { MyContext } from '../../App';
import { deleteMultipleData, fetchDataFromApi, deleteData } from '../../utils Copy/api';
import SearchBox from '../../Components/SearchBox';
import { CircularProgress, Rating } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Products from '../Products';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'subcategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },

  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
  },

  {
    id: 'sales',
    label: 'SALES',
    minWidth: 80,
  },

  {
    id: 'action',
    label: 'ACTION',
    minWidth: 120,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
const [orders,setOrders] = useState([])
const [totalOrdersData, setTotalOrderData] = useState([]);
const [ordersData,setOrdersData] = useState([]);
const [sidebarWidth,setSidebarWidth] = useState("")
 const [searchQuery,setSearchQuery] = useState('');
 
  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }

  }

  useEffect(()=>{
                fetchDataFromApi("/api/order/order-list").then((res) =>{
                    console.log(res);
                    if(res?.error === false){
         setOrders(res?.data);
                    }
                   
                })

                fetchDataFromApi(`/api/order/order-list`).then((res) =>{
                 
                  if(res?.error === false){
                    setTotalOrderData(res);
                    //  console.log(res);
                  }
                })
            },[])

            // useEffect(() =>{
            //   if(searchQuery !== ""){
            //     const filteredOrders = totalOrdersData?.data?.filter((order) =>
            //       order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //       order?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //       order.userId?.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
            //       order?.createdAt.includes(searchQuery)
            //     );
            //     setOrdersData(filteredOrders);
            //   }
            //   else{
            //     fetchDataFromApi(`/api/order/order-list`).then((res) =>{
            //       if(res?.error === false){
            //         setOrders(res)
            //         setOrdersData(res?.data)
            //       }
            //     })
            //   }
            // },[searchQuery])

            
useEffect(() => {
  if (searchQuery.trim() !== "") {
    const filteredOrders = totalOrdersData?.data?.filter((order) =>
      order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order?.createdAt?.includes(searchQuery)
    );
    setOrdersData(filteredOrders || []);
  } else {
    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if (res?.error === false) {
        setOrders(res);
        setOrdersData(res?.data || []);
      }
    });
  }
}, [searchQuery]);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [categoryFilterVal, setcategoryFilterVal] = useState('');

  const handleChangeCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };

  // const [chart1Data, setChart1Data] = useState([
  //   {
  //     name: 'JAN',
  //     TotalSales: 4000,
  //     TotalUsers: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'FEB',
  //     TotalSales: 3000,
  //     TotalUsers: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'MARCH',
  //     TotalSales: 2000,
  //     TotalUsers: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'APRIL',
  //     TotalSales: 2780,
  //     TotalUsers: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'MAY',
  //     TotalSales: 1890,
  //     TotalUsers: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'JUNE',
  //     TotalSales: 2390,
  //     TotalUsers: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'JULY',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: 'AUG',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: 'SEP',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: 'OCT',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: 'NOV',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: 'DEC',
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  // ])

  const [chartData,setChartData] = useState([]);
  const [year,setYear] = useState(new Date().getFullYear());

  const context = useContext(MyContext);

  //  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 const [users,setUsers] = useState([]);
 const [allReviews,setAllReviews] = useState([]);
 const [ordersCount,setOrdersCount] = useState(null)
  const [productTotalData,setProductTotalData] = useState([]);


     useEffect(() =>{
         setIsLoading(true)
     fetchDataFromApi(`/api/product/getAllProducts`).then((res) =>{
       // console.log(res?.products);
       setProductData(res?.products);
       setProductTotalData(res?.products)
       // console.log("setproduct data" , res?.products);
       // console.log("total",res?.products);
       
       
       setIsLoading(false)
       
     })
       },[])
 
 useEffect(() => {
   if (!productTotalData || productTotalData.length === 0) return; // Guard clause
 
   if (searchQuery.trim() !== "") {
     const filteredProducts = productTotalData.filter((product) =>
       product?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product?.catName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product?.subCat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product?.thirdLevelCat?.toLowerCase().includes(searchQuery.toLowerCase())
     );
 
     setProductData(filteredProducts || []);
     setIsLoading(false);
   } else {
     setIsLoading(true);
     fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
       if (res?.error === false) {
         setProductData(res?.products || []); // match 'products' key from initial API call
       }
       setIsLoading(false);
     });
   }
 }, [searchQuery, productTotalData]); // add productTotalData to dependencies

//  const getTotalSalesByYear = () =>{
// fetchDataFromApi(`/api/order/sales`).then((res)=>{
//     const sales = [];
//     res?.monthlySales?.length !== 0 && 
//     res?.monthlySales?.map((item) =>{
//       users.push({
//         name: item?.name,
//         TotalUsers: parseInt(item?.TotalSales),
//       });
//     });
//     const uniqueArr = sales.filter(
//       (obj,index,self) =>
//         index === self.findIndex((t) => t.name === obj.name)
//     );
//     setChartData(uniqueArr);
//   })
//  }

//  const getTotalUsersByYear = () =>{
//   fetchDataFromApi(`/api/order/users`).then((res)=>{
//     const users = [];
//     res?.TotalUsers?.length !== 0 && 
//     res?.TotalUsers?.map((item) =>{
//       users.push({
//         name: item?.name,
//         TotalUsers: parseInt(item?.TotalUsers),
//       });
//     });
//     const uniqueArr = users.filter(
//       (obj,index,self) =>
//         index === self.findIndex((t) => t.name === obj.name)
//     );
//     setChartData(uniqueArr);
//   })
//  }

//  const handleChangeYear = (event) =>{
//   getTotalSalesByYear(event.target.value);
//   setYear(event.target.value)
//  }

// useEffect(()=>{
//   getTotalSalesByYear();
//   getTotalUsersByYear();

//   fetchDataFromApi("/api/user/getAllUsers").then((res)=>{
//     if(res?.error === false){
//       setUsers(res?.users)
//     }
//   })
//   fetchDataFromApi("/api/user/getAllReviews").then((res) =>{
//     if(res?.error === false){
//       setAllReviews(res?.reviews)
//     }
//   })

//   // fetchDataFromApi("/api/user/count").then((res) =>{
//   //   if(res?.error === false){
//   //    setOrdersCount(res?.count)
//   //   }
//   // })
// },[])


useEffect(() => {
  getTotalSalesByYear();
  // getTotalUsersByYear();

  fetchDataFromApi("/api/user/getAllUsers").then((res) => {
    if (res?.error === false) {
      setUsers(res?.users);
    }
  });

  fetchDataFromApi("/api/user/getAllReviews").then((res) => {
    if (res?.error === false) {
      setAllReviews(res?.reviews);
    }
  });
}, []);

const getTotalSalesByYear = () => {
  fetchDataFromApi(`/api/order/sales`).then((res) => {
    console.log("Raw sales API response:", res); // 👈 Add this
    const sales = [];
    if (res?.monthlySales?.length !== 0) {
      res.monthlySales.forEach((item) => {
        sales.push({
          name: item?.name,
          TotalSales: parseInt(item?.TotalSales),
        });
      });
    }
    console.log("Processed sales array:", sales); // 👈 Add this too
    const uniqueArr = sales.filter(
      (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
    );
    setChartData(uniqueArr);
  });
};

// const getTotalUsersByYear = () => {
//   fetchDataFromApi(`/api/order/users`).then((res) => {
//     console.log("Raw users API response:", res); // 👈 Add this
//     const users = [];
//     if (res?.TotalUsers?.length !== 0) {
//       res.TotalUsers.forEach((item) => {
//         users.push({
//           name: item?.name,
//           TotalUsers: parseInt(item?.TotalUsers),
//         });
//       });
//     }
//     console.log("Processed users array:", users); // 👈 Add this too
//     const uniqueArr = users.filter(
//       (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
//     );
//     setChartData(uniqueArr);
//   });
// };




// const getTotalSalesByYear = () => {
//   fetchDataFromApi(`/api/order/sales`).then((res) => {
//     const sales = [];
//     if (res?.monthlySales?.length !== 0) {
//       res?.monthlySales?.map((item) => {
//         sales.push({
//           name: item?.name,
//           TotalSales: parseInt(item?.TotalSales),
//         });
//       });
//     }
//     const uniqueSalesArr = sales.filter(
//       (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
//     );
    
//     // Now update chartData with merged sales data.
//     setChartData((prevData) => {
//       return prevData.map((item) => {
//         const salesData = uniqueSalesArr.find((sale) => sale.name === item.name);
//         return salesData ? { ...item, TotalSales: salesData.TotalSales } : item;
//       });
//     });
//   });
// };

// const getTotalUsersByYear = () => {
//   fetchDataFromApi(`/api/order/users`).then((res) => {
//     const users = [];
//     if (res?.TotalUsers?.length !== 0) {
//       res?.TotalUsers?.map((item) => {
//         users.push({
//           name: item?.name,
//           TotalUsers: parseInt(item?.TotalUsers),
//         });
//       });
//     }
//     const uniqueUsersArr = users.filter(
//       (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
//     );
    
//     // Now update chartData with merged user data.
//     setChartData((prevData) => {
//       return prevData.map((item) => {
//         const userData = uniqueUsersArr.find((user) => user.name === item.name);
//         return userData ? { ...item, TotalUsers: userData.TotalUsers } : item;
//       });
//     });
//   });
// };

// useEffect(() => {
//   getTotalSalesByYear();
//   getTotalUsersByYear();

//   fetchDataFromApi("/api/user/getAllUsers").then((res) => {
//     if (res?.error === false) {
//       setUsers(res?.users);
//     }
//   });

//   fetchDataFromApi("/api/user/getAllReviews").then((res) => {
//     if (res?.error === false) {
//       setAllReviews(res?.reviews);
//     }
//   });
// }, []);


const getTotalUsersByYear = () => {
  fetchDataFromApi(`/api/order/users`).then((res) => {
    if (!res?.error && Array.isArray(res?.TotalUsers)) {
      const processedUsers = res.TotalUsers.map((item) => ({
        name: item?.name,
        TotalUsers: parseInt(item?.TotalUsers || 0),
      }));

      console.log("Processed users array:", processedUsers);
      setChartData(processedUsers);
    } else {
      console.warn("No user data returned from API");
      setChartData([]); // fallback to empty data
    }
  });
};


  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel])


  // Handler to toggle all checkboxes
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // Update all items' checked status
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);
    // console.log(updatedItems);


    // Update the sorted IDs state
    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      // console.log(ids);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };


  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);

    // Update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);

    // console.log(selectedIds);
  };


  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      // // console.log(res);
      // if (res?.error === false) {
      //   setProductData(res?.products)
      // }

      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false)
          // console.log(productArr);
        }, 500)

      }

    })
  }

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      // console.log(res);
      context.alertBox("success", res?.message || "Product Deleted Successfully ");

    })
  }


  const deleteMultipleProduct = () => {
    console.log(sortedIds);

    if (sortedIds.length === 0) {
      context.alertBox('error', 'Please select items to delete.');
      return;
    }

    console.log(sortedIds);

    try {
      deleteMultipleData('/api/product/deleteMultiple', {
        data: { ids: sortedIds },
      }).then((res) => {
        console.log(res);
        getProducts();
        context.alertBox("success", "Product deleted");
      });
    } catch (error) {
      context.alertBox('error', 'Error deleting items.');
    }
  };



  const [productCat, setProductCat] = useState('');
  const [productSubCat, setProductSubCat] = useState('');
  const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: []

  });

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat('');
    setProductThirdLevelCat('');

    setIsLoading(true)
    // alert(event.target.value)
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setProductData(res?.products)
        context.alertBox("success", "Data Filtered Successfully");
        setTimeout(() => {

          setIsLoading(false);
        }, 100)
      }

    })
  };

  const handleChangeProductSubCat = (event) => {
    setProductCat('');
    setProductSubCat(event.target.value);
    setProductThirdLevelCat('');


    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setProductData(res?.products)
        context.alertBox("success", "Data Filtered Successfully");
        setTimeout(() => {

          setIsLoading(false);
        }, 100)
      }
    })
  };


  const handleChangeProductThirdLevelCat = (event) => {
    setProductCat('');
    setProductSubCat('');
    setProductThirdLevelCat(event.target.value);
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByThirdLevelCat/${event.target.value}`).then((res) => {
      // console.log(res);
      if (res?.error === false) {
        setProductData(res?.products)
        context.alertBox("success", "Data Filtered Successfully");
        setTimeout(() => {

          setIsLoading(false);
        }, 100)
      }
    })
  };

  return (

    <>
      <div className="w-full py-5 px-5 bg-[#f1faff] border border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5 rounded-md">
        <div className="info">
          <h1 className='text-[28px] sm:text-[35px] font-bold leading-10 mb-3'>Welcome,<br />
          <span className='text-[#3872fa] font-bold leading-10 mb-3'> {context?.userData?.name}</span>
          </h1>
          <p>Here’s What happening on your store today. See the statistics at once.</p>
          <br />
          <Button className='btn-blue !capitalize' onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: 'Add Product'
          })}>Add Product<FaPlus /></Button>
        </div>
        <img src="./image1.webp" alt="image1" className='w-[250px]' />
      </div>
      {
        productData?.length !== 0 && users.length !== 0  && allReviews?.length !== 0 &&  <DashboardBoxes
        orders={totalOrdersData?.data?.length}
         products = {productData?.length} 
         users={users?.length} 
         category={context?.catData?.length}
         reviews={allReviews.length}/>
      }
     
     <Products />

      {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">

        <h1 className='font-[700] text-[20px] text-gray-800 '>Products</h1>

        <div className="col w-[25%] ml-auto flex items-center gap-3 justify-end">

          {
            sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm' size='small' color='error' onClick={deleteMultipleProduct}>Delete</Button>
          }
          <Button className='btn-blue !bg-green-600 btn-sm btn flex items-center gap-2'><BiExport />Export</Button>
          <Button className='btn-blue btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: 'Add Product'
          })}>Add Product</Button>
        </div>
      </div> */}

      
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row">
          <h2 className='text-[18px] font-[600] text-left mb-2 lg:mb-0'>Recent Orders</h2>
          <div className=" ml-auto w-full">
            <SearchBox 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            // setPageOrder={setPageOrder}
            />
          </div>
        </div>

        {/* <div class="relative overflow-x-auto mt-5"> */}
          <div className='relative overflow-x-auto mt-5 pb-5 overflow-y-auto max-h-[450px]'>
                                <table class="w-full text-sm text-left text-black bg-white">
                                    <thead class="text-xs text-black uppercase bg-gray-100">
                                        <tr>
                                        <th scope="col" class="px-6 py-3">
&nbsp;
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap ">
                                                Order Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Payment Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Phone Number
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Address
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                PinCode
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Total Amount
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Email
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                               User ID
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                               Order Status
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ordersData?.length > 0 && ordersData?.map((order, index) => {
                                                return(
                                                    <>
 <tr class="bg-white border-b border-gray-200"  key={order._id}>
                                            <td class="px-6 py-4 font-[500]">
                                            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderdProduct(index)}>
                                                {
                                                    isOpenOrderdProduct === index ?  <FaAngleUp className='text-[16x] text-[rgba(0,0,0,0.7)]' /> :  <FaAngleDown className='text-[16x] text-[rgba(0,0,0,0.7)]' />
                                                }
                                           </Button> 
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa]'>{order?._id}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa]'>{order?.paymentId ? order?.paymentId : 'Cash on Delivery'}</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                {order?.userId?.name}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                {order?.userId?.mobile}
                                                {/* {order?.delivery_address?.mobile} */}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'> {order?.delivery_address?.address_line1+","+
                                                    order?.delivery_address?.landmark+ ","+
                                                    order?.delivery_address?.city+ ","+
                                                    order?.delivery_address?.state+","+
                                                    order?.delivery_address?.country+" ,"+ order?.delivery_address?.mobile + "."}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                { order?.delivery_address?.pincode}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {(order?.totalAmt)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa] '>{order?.userId?.email}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {order?.userId?._id}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <Badge status={order?.order_status}/>
                                            </td>
                                            <td class="px-6 py-4 font-[500] whitespace-nowrap">
                                             {`${order?.createdAt?.split("T")[0]} ${order?.createdAt?.split("T")[1]?.replace("Z", "")}`}
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderdProduct === index &&  (
                                                <tr>
                                            <td className='pl-20' colSpan={6}>
                                            <div className="col2 w-[80%]">
                            <div class="relative overflow-x-auto ">
                                <table class="w-full text-sm text-left text-black bg-white">
                                    <thead class="text-xs text-black uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap ">
                                                Product Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Product Title
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Quantity
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        order?.products?.map((item,index)=>{
                                            return(
 <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>{item?._id}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >
                                                    <div className='w-[200px]'>
                                                        {item?.productTitle}
                                                    </div>
                                                </span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src={item?.image} alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                {item?.quantity}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                {(item?.price)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {(item?.price* item?.quantity)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            
                                        </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                                            </td>
                                        </tr>
                                            )
                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
      </div>


      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 class="text-[18px] font-[600]">Total Users and Total Sales
          </h2>
        </div>

        <div className="flex items-center gap-5 px-5 py-5 pt-1">
          <span className='flex items-center gap-1 text-[15px] '   onClick={getTotalSalesByYear}>
            <span className='block w-[8px] h-[8px] rounded-full bg-green-600 cursor-pointer'></span>Total Sales</span>


          <span className='flex items-center gap-1 text-[15px] ' onClick={getTotalUsersByYear}>
             <span className='block w-[8px] h-[8px] rounded-full bg-[#3872fa] cursor-pointer'></span>Total Users</span>

        </div>


        {/* <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='none' />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TotalUsers" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
          <Line type="monotone" dataKey="TotalSales" stroke="#82ca9d" strokeWidth={3} />
        </LineChart> */}


        {
          chartData?.length !== 0 &&
          <BarChart
         width={context?.windowWidth < 920 ? (context?.windowWidth - 160) : (context?.windowWidth - 300)}
        // width={context?.windowWidth > 920 ? (context?.windowWidth - 300) : (context?.windowWidth -50)}
          height={500}
          data={chartData}
          margin={{
            top:5,
            right: 30,
            left:20,
            bottom: 5,

          }}
          >
            <XAxis 
            dataKey="name"
           scale="point"
            padding={{left: 10 , right: 10}}
            tick={{fontSize: 12}}
            label={{position:"insideBottom",fontSize:14}}
            style={{fill: context?.theme === " dark" ? "white": "#000"}}
            />
            <YAxis 
            tick={{fontSize: 12}}
            label={{position:"insideBottom",fontSize:14}}
             style={{fill: context?.theme === " dark" ? "white": "#000"}}
            />
            <Tooltip 
            contentStyle={{
              backgroundColor: "#071739",
              color:"white",
            }}

            labelStyle={{color:"yellow"}}
            itemStyle={{color:"cyan"}}
            cursor={{fill:"white"}}
            />
            <Legend />
            <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            vertical={false}
            />
            <Bar dataKey="TotalSales" stackId="a" fill="#16a34a"/>
            <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7"/>
          </BarChart>
        }
      </div>
    </>
  )
}

export default Dashboard;