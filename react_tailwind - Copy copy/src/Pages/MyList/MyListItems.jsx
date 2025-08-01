import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const MyListItems = (props) => {

    // const addToCart = (productId) =>{
    //     fetchDataFromApi(`/api/product/${productId}`).then((res) =>{
    //         console.log(res?.product);
            
    //     })
    // }
const context = useContext(MyContext);
    const removeItem=(id) =>{
deleteData(`/api/myList/${id}`).then((res)=>{
    // console.log(res);
context?.alertBox("success",res?.message || "Product Removed from Mylist");
        context?.getMyListData();    
})
    }

  return (
<div className="cartItem w-full p-3  flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                            <div className="img w-[30%] sm:w-[15%] h-[150px] rounded-md overflow-hidden">
                                <Link to={`/product/${props?.item?.productId}`} className='group'>
                                    <img src={props?.item?.image} alt="image" className='w-full group-hover:scale-105 transition-all' />
                                </Link>
                            </div>

                            <div className="info w-full lg:w-[85%] relative">

                                <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => removeItem(props?.item?._id)}/>
                                <span className='text-[13px]'>{props?.item?.brand}</span>
                                <h3 className='text-[13px] sm:text-[15px]'><Link to={`/product/${props?.item?.productId}`} className='link'>{props?.item?.productTitle?.substr(0,80)+"..."}</Link></h3>

                                <Rating name="size-small" size='small' value={props?.item?.rating} readOnly />

                                <div className="flex items-center gap-4 mt-2 mb-2">
                                    <span className='price text-[14px] font-[600]'>&#x20b9; {props?.item?.price}</span>
                                    <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>&#x20b9; {props?.item?.oldPrice}</span>

                                    <span className='price text-[#ff5252] text-[14px] font-[600]'>{props?.item?.discount}%</span>
                                </div>
                                
                                {/* <Button className='btn-org btn-sm' onClick={() => addToCart(props?.item?.productId)}>Add to Cart</Button> */}
                            </div>

                            
                        </div>
  )
}

export default MyListItems;
