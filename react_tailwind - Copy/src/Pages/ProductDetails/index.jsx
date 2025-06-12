import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { ProductZoom } from "../../components/ProductZoom";
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { QtyBox } from '../../components/QtyBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import ProductsSlider from '../../components/ProductsSlider';
import  {ProductDetailsComponents}  from '../../components/ProductDetails';
import { fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Reviews from './reviews';
import { useRef } from 'react';



const ProductDetails = () => {

  const [ activeTab ,setActiveTab] = useState(0);
  const [productData,setProductData] = useState();
  const [isLoading , setIsLoading] = useState(false);
  const [reviewsCount , setReviewsCount] = useState(0);
  const [relatedProductData , setRelatedProductData] = useState([]); 

  const { id } = useParams();
// console.log(id);

useEffect(()=>{
// setReviewsCount(reviewsCount)

 fetchDataFromApi(`/api/user/getReview?productId=${id}`).then((res) => {
    if (res?.error === false) {
     setReviewsCount(res?.reviews?.length);
    }
  });

},[reviewsCount])

const reviewSec = useRef();

useEffect(() => {
  setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) =>{
      // console.log(res);
      if(res?.error === false){
        setProductData(res?.product);

        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`).then((res) =>{
          // console.log(res?.products);
           if(res?.error === false){
          
          const filteredData = res?.products?.filter((item) => item._id !== id);
setRelatedProductData(filteredData);
           }
        })
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
        
      }
    })

    window.scrollTo(0,0);
}, [id]);

const gotoReviews = () =>{
  window.scrollTo({
    top: reviewSec?.current.offsetTop-170,
    behavior: 'smooth'
  })
  // alert()
  setActiveTab(1)
}

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" className='link transition !text-[14px]'>
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Fashion
            </Link>

            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">

        {
          isLoading === true? <div className="flex items-center justify-center min-h-[300px]">
  <CircularProgress />
</div> :
 <>
   <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[40%] ">
            <ProductZoom images={productData?.images}/>
          </div>

          <div className="productContent w-[60%] pr-10 pl-10">
<ProductDetailsComponents  item={productData} reviewsCount={reviewsCount} gotoReviews={gotoReviews}/>


          </div>
        </div>
 </>
        }
        

      

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(0)}>Description</span>
            {/* <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(1)}>Product Details</span> */}
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(1)}
              ref={reviewSec}
              >Reviews ({reviewsCount})</span>
          </div>

          {
            activeTab === 0 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
                {
                  productData?.description
                }

          </div>
            )
          }

          {/* {
            activeTab === 1 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
<div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left text-black bg-white">
    <thead class="text-xs text-black uppercase bg-gray-100">
      <tr>
        <th scope="col" class="px-6 py-3">
          Product name
        </th>
        <th scope="col" class="px-6 py-3">
          Color
        </th>
        <th scope="col" class="px-6 py-3">
          Category
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">
          Silver
        </td>
        <td class="px-6 py-4">
          Laptop
        </td>
        <td class="px-6 py-4">
          $2999
        </td>
      </tr>
      <tr class="bg-white border-b border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Microsoft Surface Pro
        </th>
        <td class="px-6 py-4">
          White
        </td>
        <td class="px-6 py-4">
          Laptop PC
        </td>
        <td class="px-6 py-4">
          $1999
        </td>
      </tr>
      <tr class="bg-white">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Magic Mouse 2
        </th>
        <td class="px-6 py-4">
          Black
        </td>
        <td class="px-6 py-4">
          Accessories
        </td>
        <td class="px-6 py-4">
          $99
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
            )
          }
           */}
          {
            activeTab === 1 && 
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
              {
                productData?.length!==0 && <Reviews productId={productData?._id} setReviewsCount={setReviewsCount}/>
              }
          
            </div>
          }
        </div>

{
  relatedProductData?.length !== 0 && 
     <div className="container pt-8">
        <h2 className='text-[20px] font-[600] pb-0'>Releated Products</h2>
      <ProductsSlider items={5} data={relatedProductData}/>
        </div>
}

     
      </section>



    </>
  )
}


export default ProductDetails;