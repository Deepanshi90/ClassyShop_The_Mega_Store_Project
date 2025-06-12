import { Button, Rating } from '@mui/material';
import React, { useState, PureComponent, useContext, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";

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
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { fetchDataFromApi, deleteData, deleteMultipleData } from '../../utils Copy/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CircularProgress from '@mui/material/CircularProgress';


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
    id: 'rating',
    label: 'RATING',
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


const Products = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [productTotalData,setProductTotalData] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
const [sortedIds ,setSortedIds] = useState([]);
const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

//     useEffect(() => {
//       if (searchQuery.trim() !== "") {
//         const filteredProducts = productTotalData?.filter((product) =>
//     product?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product?.catName?.toLowerCase().includes(searchQuery.toLowerCase())  ||
//     product?.subCat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product?.thirdLevelCat?.toLowerCase().includes(searchQuery.toLowerCase()) 
//   );
//         setProductData(filteredProducts || []);
//       } else {
//   setIsLoading(true); // <--- Add this line
//   fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
//     if (res?.error === false) {
//       setProductData(res?.product || []);
//     }
//     setIsLoading(false); // <--- Also move this here so it ends loading
//   });
// }
//     }, [searchQuery]);




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
        for(let i =0 ; i< res?.products?.length ; i++){
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() =>{
          setProductData(productArr);
          setIsLoading(false)
        // console.log(productArr);
        },500)
        
      }

    })
  }


  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }

  }

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

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat('');
    setProductThirdLevelCat('');

    setIsLoading(true)
    // alert(event.target.value)
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) =>{
// console.log(res);
if(res?.error === false){
  setProductData(res?.products)
  context.alertBox("success","Data Filtered Successfully");
  setTimeout(() =>{
    
  setIsLoading(false);
  },100)
}

    })
    // formFields.catId = event.target.value;
    // formFields.category = event.target.value;
    // const value = event.target.value;
    // setProductCat(value);
    // setFormFields(prev => ({
    //   ...prev,
    //   catId: value,
    //   category: value
    // }));

    // alert(event.target.value)
  };

  // const selectCatByName = (name) => {
  //   // formFields.catName =name;
  //   // alert(name);
  //   setFormFields(prev => ({
  //     ...prev,
  //     catName: name
  //   }));
  // }

  const handleChangeProductSubCat = (event) => {
    setProductCat('');
     setProductSubCat(event.target.value);
    setProductThirdLevelCat('');

   
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) =>{
      // console.log(res);
      if(res?.error === false){
        setProductData(res?.products)
        context.alertBox("success","Data Filtered Successfully");
        setTimeout(() =>{
        
        setIsLoading(false);
        },100)
      }})
    // formFields.subCatId = event.target.value;
    // const value = event.target.value;
    // setProductSubCat(value);
    // setFormFields(prev => ({
    //   ...prev,
    //   subCatId: value
    // }));
  };

  // const selectSubCatByName = (name) => {
  //   // formFields.subCat =name;
  //   // alert(name);
  //   setFormFields(prev => ({
  //     ...prev,
  //     subCat: name
  //   }));

  // }

  const handleChangeProductThirdLevelCat = (event) => {
    setProductCat('');
    setProductSubCat('');
    setProductThirdLevelCat(event.target.value);
    setIsLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByThirdLevelCat/${event.target.value}`).then((res) =>{
      // console.log(res);
      if(res?.error === false){
        setProductData(res?.products)
        context.alertBox("success","Data Filtered Successfully");
        setTimeout(() =>{
          
        setIsLoading(false);
        },100)
      }})
  };


  // const selectSubCatByThirdLevel = (name) => {
  //   setFormFields(prev => ({
  //     ...prev,
  //     thirdsubCat: name
  //   }));
  // };


  return (
    <>
      {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">

        <h1 className='font-[700] text-[20px] text-gray-800 '>Products</h1>

        <div className="col w-[25%] ml-auto flex items-center gap-3 justify-end">

          {
            sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm' size='small' color='error' onClick={deleteMultipleProduct}>Delete</Button>
          } */}
          {/* <Button className='btn-blue !bg-green-600 btn-sm btn flex items-center gap-2'><BiExport />Export</Button> */}
          {/* <Button className='btn-blue btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: 'Add Product'
          })}>Add Product</Button>
        </div>
      </div> */}

<div className="card bg-white shadow-md rounded-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  {/* Heading */}
  <h1 className="font-bold text-[18px] sm:text-[20px] text-gray-800">Products</h1>

  {/* Buttons */}
  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 justify-end">
    {sortedIds?.length !== 0 && (
      <Button
        variant="contained"
        className="btn-sm w-full sm:w-auto"
        size="small"
        color="error"
        onClick={deleteMultipleProduct}
      >
        Delete
      </Button>
    )}

    {/* Add Product button */}
    <Button
      className="btn-blue btn-sm w-full sm:w-auto"
      onClick={() =>
        context.setIsOpenFullScreenPanel({
          open: true,
          model: 'Add Product',
        })
      }
    >
      Add Product
    </Button>
  </div>
</div>


      <div className="card my-4 shadow-md sm:rounded-lg bg-white">

        {/* <div className="flex items-center w-full px-5 justify-between gap-4 dashboardFilters"> */}
        <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 w-full px-5 justify-between gap-4'>
          {/* <div className="col w-[15%] "> */}
<div className='col'>
            <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
                style={{ zoom: '80%' }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className='w-full '
                size='small'
                value={productCat}
                label="Product Category"
                onChange={handleChangeProductCat}
              >
                {
                  context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem value={cat?._id} >{cat?.name}</MenuItem>
                    )
                  })
                }
              </Select>
            }
          </div>

          <div className="col  ">

            <h4 className='font-[600] text-[13px] mb-2'>Sub Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
              style={{ zoom: '80%' }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className='w-full '
                size='small'
                value={productSubCat}
                label="Product Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {
                  context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem value={subCat?._id} >{subCat?.name}</MenuItem>
                        )
                      }
                      ))
                  }

                  )
                }
              </Select>
            }
          </div>

          <div className="col ">

            <h4 className='font-[600] text-[13px] mb-2'>Third Level Sub Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
              style={{ zoom: '80%' }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className='w-full '
                size='small'
                value={productThirdLevelCat}
                label="Product Sub Category"
                onChange={handleChangeProductThirdLevelCat}
              >
                {
                  context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirdLevelCat, index) => {
                            return (
                              <MenuItem value={thirdLevelCat?._id} key={index}>
                                {thirdLevelCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })
                }
              </Select>
            }
          </div>
          <div className="col w-full ml-auto flex items-center">
            <div style={{alignSelf:'end'}} className='w-full'>
              <SearchBox 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>

        <div class="relative overflow-x-auto mt-5 pb-5 overflow-y-auto max-h-[500px]">
          <table class="w-full text-sm text-left text-black bg-white" >
            <thead class="text-xs text-black uppercase bg-gray-100" >
              <tr>
                <th scope="col" className="px-6 py-3 pr-0 w-[10%]">
                  <div className="w-[60px]">
                    <Checkbox {...label} size='small' onChange={handleSelectAll} 
                    checked={productData?.length >0 ? productData.every((item ) => item.checked) : false }
                    />
                  </div>
                </th>
                <th scope="col" class="px-2 py-3 whitespace-nowrap ">
                  Product
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  CATEGORY
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  SUB CATEGORY
                </th>

                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                 Third Level SUB CATEGORY
                </th>

                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  PRICE
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  Rating
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>
{

productData?.length !== 0 ? <>
{
                productData?.length !== 0 && productData?.map((product, index) => {
                  return (
                    <tr className="odd:bg-white odd:dark:bg-gray-50 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-300" key={index}>
                      <td className="px-6 pr-0 py-2">
                        <div className="w-[60px]">
                          <Checkbox {...label} size='small'  checked={product.checked === true ? true : false}
                          onChange={(e) => handleCheckboxChange(e,product._id,index)}
                          />
                        </div>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to={`/product/${product?._id}`}>
                              <LazyLoadImage
                                className='w-full h-full object-cover group-hover:scale-105 transition-all'
                                effect="blur"
                                wrapperProps={{
                                  // If you need to, you can tweak the effect transition using the wrapper style.
                                  style: { transitionDelay: "1s" },
                                }}
                                alt="image"
                                src={product?.images[0]}

                              />
                            </Link>
                          </div>

                          <div className="info w-[75%]">
                            <h3 className='font-[600] text-[12px] leading-4 hover:text-[#3872fa]' >
                              <Link to={`/product/${product?._id}`}>{product?.name}
                              </Link></h3>

                            <span className='text-[12px]'>{product?.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2">{product?.catName}</td>
                      <td className="px-6 py-2">{product?.subCat} </td>
                      <td className="px-6 py-2">{product?.thirdsubCat} </td>
                      <td className="px-6 py-2">
                        <div className="flex gap-1 flex-col">
                          <span className='oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]'>&#x20b9;{product?.oldPrice}</span>
                          <span className="price text-[#3872fa] text-[15px] font-[600]">&#x20b9;{product?.price}</span>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <p className='text-[14px] w-[100px]'><span className='font-[600]'>{product?.sale}</span> sale</p>
                        {/* <Progress value={80} type="warning" /> */}
                      </td>

                      <td className="px-6 py-2">
                        <p className='text-[14px] w-[100px]'>
                          {/* <span className='font-[600]'>{product?.sale}</span> sale */}
                          <Rating name="half-rating" readOnly size='small' defaultValue={product?.rating} precision={0.5}  />
                          </p>
                        {/* <Progress value={80} type="warning" /> */}
                      </td>


                      <td className="px-6 py-2">
                        <div className="flex items-center gap-1">
                          <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: 'Edit Product',
                                id: product?._id
                              })
                            } >
                              <AiOutlineEdit className='text-[rgba(0,0,0,0.7) !text-[20px] ' /></Button>
                          </TooltipMUI>
<Link to={`/product/${product?._id}`}>
                          <TooltipMUI title="View Product Details" placement="top">
                            <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' >
                              <FaRegEye className='text-[rgba(0,0,0,0.7) !text-[18px] ' /></Button>
                          </TooltipMUI>
                          </Link>

                          <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' onClick={() => deleteProduct(product?._id)}>
                              <GoTrash className='text-[rgba(0,0,0,0.7) !text-[18px] ' /></Button>
                          </TooltipMUI>
                        </div>
                      </td>

                    </tr>
                  )
                })
              }

</>:  
<>
<tr>
  <td colSpan={8}>
  <div className="flex items-center justify-center w-full min-h-[400px]"><CircularProgress color="inherit" /></div>
  </td>
</tr>
</>


}
              





            </tbody>
          </table>
        </div>


        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

        {/* <div className="flex items-center justify-end pt-5 pb-5 px-4">
        <Pagination count={10} color="primary" />
        </div> */}

      </div>
    </>
  )

}


export default Products;