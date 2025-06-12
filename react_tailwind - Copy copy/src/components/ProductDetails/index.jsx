import React, { useContext } from 'react'
import { QtyBox } from '../QtyBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { IoMdHeart } from 'react-icons/io';

export const ProductDetailsComponents = (props) => {
      const [productActionIndex, setProductActionIndex] = useState(null);
      const [quantity, setQuantity] = useState(1);
       const [selectedTabName, setSelectedTabName] = useState(null);
       const [tabError, setTabError] = useState(false);
const context = useContext(MyContext)
      const handleSelectQty = (qty) =>{
        setQuantity(qty);
      }
      const [isLoading, setIsLoading] = useState(false)

      
    const addToCart = (product, userId, quantity) => {

      console.log(userId);
      // console.log(product);
if(userId === undefined){
  context?.alertBox("error","You are not login. Please login first than add the product to the cart!");
  return false;
}


        const productItem={
            _id:product?._id,
             productTitle: product?.name,
  image: product?.images[0],
  rating: product?.rating,
  price: product?.price,
  quantity: Number(quantity),
  subTotal: Number(product?.price) * Number(quantity),
  productId: product?._id,
  countInStock: product?.countInStock,
  userId: userId,
  brand: product?.brand,
  oldPrice: product?.oldPrice,
  discount: product?.discount,
  size: props?.item?.size?.length !== 0  ? selectedTabName : '',
  weight: props?.item?.productWeight?.length !== 0  ? selectedTabName : '',
  ram:props?.item?.productRam?.length !== 0  ? selectedTabName : '',
        }

        // console.log(productItem);

        if(props?.item?.size?.length !== 0  ||  props?.item?.productWeight?.length || props?.item?.productRam?.length){
       if(selectedTabName !== null ){
           setIsLoading(true)
           postData(`/api/cart/add`,productItem).then((res) =>{
           
             if(res?.error === false){
           context?.alertBox("success",res?.message);
           
           context?.getCartItems();
           setTimeout(() =>{
  setIsLoading(false)
           },500)
          
           
             }
             else{
               context?.alertBox("error",res?.message)
               setIsLoading(false)
             }
             
           })
        }
        else{
          setTabError(true);
        }
        }else{
             setIsLoading(true)
          postData(`/api/cart/add`,productItem).then((res) =>{
           
             if(res?.error === false){
           context?.alertBox("success",res?.message);
           
           context?.getCartItems();
           setTimeout(() =>{
  setIsLoading(false)
           },500)
          
           
             }
             else{
               context?.alertBox("error",res?.message)
               setIsLoading(false)
             }
             
           })
        }
         

        // console.log(productItem);
        

        // context?.addToCart(product, userId, quantity);
    }

    const handleClickActiveTab = (index,name) =>{
        setProductActionIndex(index)
        setSelectedTabName(name)
    }


  return (
   <>
               <h1 className='text-[18px] sm:text-[24px] font-[600] mb-2'>{props?.item?.name}</h1>
            <div className="flex items-start sm:items-center lg:items-center gap-3 flex-col sm:flex-row md:flex-row lg:flex-row justify-start">
              <span className='text-gray-400 text-[15px]'>
                Brands: <span className='font-[500] text-black link cursor-pointer opacity-75'>
                  {props?.item?.brand} </span></span>

              <Rating 
  name="size-small" 
  defaultValue={Number(props?.item?.rating) || 5} 
  size="small" 
  readOnly 
/>


              <span className='text-[13px] cursor-pointer' onClick={props.gotoReviews}>
                Review ({props.reviewsCount})
              </span>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-start sm:items-center gap-4 mt-4">
              <div className='flex items-center gap-4'>
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>&#x20b9; {props?.item?.oldPrice}</span>
              <span className='price text-[#ff5252] text-[20px] font-[600]'>&#x20b9; {props?.item?.price}</span>
              </div>
             <div className='flex items-center gap-4'>
               <span className='text-[14px]'>Availabe In Stock: <span className='text-green-600 text-[14px] font-bold'>
                {props?.item?.countInStock}</span></span>
             </div>
            </div>

            <p className='mt-3 pr-10 mb-5'>{props?.item?.description}</p>

{
  props?.item?.productRam?.length!== 0 && 

  <div className="flex items-center gap-3">
              <span className='text-[16px]'>RAM: </span>
              <div className="flex items-center gap-1 actions">
                {
                  props?.item?.productRam?.map((item,index) =>{
                    return(
<Button
                  className={`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''}  ${tabError=== true && 'error'}`}
                 onClick={() => handleClickActiveTab(index,item)}
                >
                  {item}
                </Button>
                    )
                  })
                }
              </div>
            </div>
}


{
  props?.item?.size?.length!== 0 && 

  <div className="flex items-center gap-3">
              <span className='text-[16px]'>Size: </span>
              <div className="flex items-center gap-1 actions">
                {
                  props?.item?.size?.map((item,index) =>{
                    return(
<Button
                  className={`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''} ${tabError=== true && 'error'}`}
                  onClick={() => handleClickActiveTab(index,item)}
                >
                  {item}
                </Button>
                    )
                  })
                }
              </div>
            </div>
}



{
  props?.item?.productWeight?.length!== 0 && 

  <div className="flex items-center gap-3">
              <span className='text-[16px]'>Weight: </span>
              <div className="flex items-center gap-1 actions">
                {
                  props?.item?.productWeight?.map((item,index) =>{
                    return(
<Button
                  className={`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''}  ${tabError=== true && 'error'}`}
                   onClick={() => handleClickActiveTab(index,item)}
                >
                  {item}
                </Button>
                    )
                  })
                }
              </div>
            </div>
}
          

            <p className='text-[14px] mt-5 mb-2 text-[#000]'>Free Shipping (Est. Delivery Time 2-3 Days) </p>
            <div className="flex items-center mt-4 gap-4 py-4 ">
              <div className="qtyBoxWrapper w-[70px]">
                <QtyBox handleSelectQty={handleSelectQty} />
              </div>
              <Button className='btn-org flex gap-2 !min-w-[150px]' onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}>
                {
                  isLoading === true ? <CircularProgress /> : 
                  <>
                    <MdOutlineShoppingCart className='text-[22px]' />
                  </>
                }
              
              
              Add To Cart </Button>
            </div>

            {/* <div className="flex items-center gap-4 mt-4">
              <span className='flex items-center gap-2 text-[14px] sm::text-[15px] link cursor-pointer font-[500]' onClick={() => handleAddToMyList(props?.item)}>
                {
                  isAddedInMyList === true ? 
                  <IoMdHeart className='text-[18px] !text-[#ff5252] group-hover:text-white hover:!text-white' />
                  :
                   <FaRegHeart className='text-[18px]' />
                }
                Add to Wishlist</span>
              <span className='flex items-center gap-2 text-[14px] sm::text-[15px]  link cursor-pointer font-[500]'><IoGitCompareOutline className='text-[18px]' />Add to Compare</span>
            </div> */}
   </>
  )
}
