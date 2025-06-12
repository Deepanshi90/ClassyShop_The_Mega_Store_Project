import React, { useContext } from 'react'
import "../ProductItem/style.css";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { MyContext } from '../../App';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteData, editData, postData } from '../../utils/api';
import { CircularProgress } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { IoMdHeart } from 'react-icons/io';


const ProductItem = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isAddedInMyList, setIsAddedInMyList] = useState(false);
    const [cartItem, setCartItem] = useState([]);

    const [activeTab,setActiveTab] = useState(null);
    const [isShowTabs, setIsShowTabs] = useState(false);
    const context = useContext(MyContext);
    const [selectedTabName, setSelectedTabName] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    const addToCart = (product, userId, quantity) => {

        const productItem={
            _id:product?._id,
            name: product?.name,
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

        setIsLoading(true);

        if(props?.item?.size?.length !== 0 || props?.item?.productRam?.length !== 0 || props?.item?.productWeight?.length !== 0 ){
            setIsShowTabs(true)
        }
        else{
                    setIsAdded(true);
        setIsShowTabs(false)
        setTimeout(() =>{
              setIsLoading(false);
        },500)
            context?.addToCart(product, userId, quantity);

        }

        if(activeTab !== null ){

        context?.addToCart(productItem, userId, quantity);
        setIsAdded(true);
        setIsShowTabs(false)
         setTimeout(() =>{
              setIsLoading(false);
        },500)
        }
    }

    const handleClickActiveTab = (index,name) =>{
        setActiveTab(index)
        setSelectedTabName(name)
    }

    useEffect(() => {
        const item = context?.cartData?.filter((cartItem) =>
            cartItem.productId.includes(props?.item?._id)
        );


         const myListItem = context?.myListData?.filter((item) =>
            item.productId.includes(props?.item?._id)
        );

// console.log(myListItem);



        if (item?.length !== 0) {
            setCartItem(item);
            // console.log(item);
            setQuantity(item[0]?.quantity);
            setIsAdded(true);
        }
        else {
            setQuantity(1);
        }

        if (myListItem?.length !== 0) {
           setIsAddedInMyList(true);

        }
        else {
             setIsAddedInMyList(false);
        }
    }, [context?.cartData]);

    const minusQty = () => {
        if (quantity !== 0 && quantity > 1) {
            setQuantity(quantity - 1)
        }
        else {
            setQuantity(0)
        }

        if (quantity === 1) {
            deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
                // console.log(res);
                setIsAdded(false);
                context.alertBox("success", res?.message || "Item removed from cart Successfully!");
                context?.getCartItems();
                setIsShowTabs(false)
                setActiveTab(null)
            })
        }
        else {
            const obj = {
                _id: cartItem[0],
                qty: quantity - 1,
                subTotal: props?.item?.price * (quantity - 1),
            }
            editData(`/api/cart/update-qty`, obj).then((res) => {
                // console.log(res);
                context?.alertBox("success", res?.data?.message || "Cart Updated Successfully!")
                context?.getCartItems();
            })
        }
    }
    const addQty = () => {
        setQuantity(quantity + 1)
        const obj = {
            _id: cartItem[0],
            qty: quantity + 1,
            subTotal: props?.item?.price * (quantity + 1),
        }
        editData(`/api/cart/update-qty`, obj).then((res) => {
            // console.log(res);
            context?.alertBox("success", res?.data?.message || "Cart Updated Successfully!")
            context?.getCartItems();
        })
    }

     const handleAddToMyList=(item) =>{
      // console.log(userData);
    //   console.log(item);
      
      if(context?.userData===null){
        context?.alertBox("error","You are not login. Please login first!");
        return false;
      }
      else{
const obj={
        productId: item?._id,
        userId: context?.userData?._id,
        productTitle: item?.name,
        image: item?.images[0],
        rating: item?.rating,
        price: item?.price,
        oldPrice: item?.oldPrice,
        brand: item?.brand,
        discount: item?.discount
      }

      postData(`/api/myList/add`,obj).then((res) =>{
        if(res?.error === false){
          context?.alertBox("success",res?.message);
          setIsAddedInMyList(true);
          context?.getMyListData();
        }
        else{
          context?.alertBox("error",res?.message ||"Please try in sometime.")
        }
      })
      return true;
      }
      
    }

    return (
        <div className="productItem rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] shadow-lg">
            <div className=" group imagWrapper w-[100%]  overflow-hidden rounded-md relative">
                <Link to={`/product/${props.item?._id}`}>
                    <div className="img h-[220px] overflow-hidden">
                        {/* <img src={props?.item?.images[0]} alt="F-1" className='w-full' />
            
            <img src={props?.item?.images[1]} alt="F-1" className='w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' /> */}
                        <img src={props?.item?.images[0]} alt="Product Front" className="w-full" />
                        <img src={props?.item?.images[1] || props?.item?.images[0]} alt="Product Hover" className="w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105" />
                    </div>
                </Link>

{
    isShowTabs === true 
    &&    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2">

        <Button className='!absolute !top-[10px] !right-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !h-[30px] !rounded-full !bg-[rgba(255,255,255,1)] text-black' onClick={() => setIsShowTabs(false)}><MdClose className=' text-black z-90 text-[25px] cursor-pointer'/></Button>
                    {
                        props?.item?.size?.length !== 0 && props?.item?.size?.map((item,index) =>{
                            return(
                                 <span key={index}
                        className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] max-w-[35px] px-2 h-[25px] rounded-sm cursor-pointer  hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'
                            }`}
                        onClick={() => handleClickActiveTab(index,item)}
                    >
                        {item}
                    </span>
                            )
                        })
                    }


                      {
                        props?.item?.productRam?.length !== 0 && props?.item?.productRam?.map((item,index) =>{
                            return(
                                 <span key={index}
                        className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] max-w-[45px] px-2 h-[25px] rounded-sm cursor-pointer  hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'
                            }`}
                        onClick={() => handleClickActiveTab(index,item)}
                    >
                        {item}
                    </span>
                            )
                        })
                    }


{
                        props?.item?.productWeight?.length !== 0 && props?.item?.productWeight?.map((item,index) =>{
                            return(
                                 <span key={index}
                        className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] max-w-[35px] px-2 h-[25px] rounded-sm cursor-pointer  hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'
                            }`}
                        onClick={() => handleClickActiveTab(index,item)}
                    >
                        {item}
                    </span>
                            )
                        })
                    }


                </div>
}
             


                <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]">{props.item?.discount}%</span>


                {/* <div className="actions absolute top-[-200px] right-[5px]  z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover:text-white  group' onClick={() => context.handleOpenProductDetailsModal(true, props?.item)} ><MdZoomOutMap className='text-[18px] !text-black  group-hover:text-white hover:!text-white' /></Button>

                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover:text-white  group' ><IoGitCompareOutline className='text-[18px] !text-black  group-hover:text-white hover:!text-white' /></Button>

                    <Button className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover:text-white  group `} onClick={() => handleAddToMyList(props?.item)}>
                        {
                            isAddedInMyList === true ?<IoMdHeart className='text-[18px] !text-black  group-hover:text-[#ff5252]:!text-white' /> :
 <FaRegHeart className='text-[18px] !text-black  group-hover:text-white hover:!text-white' />
                        }
                       </Button>
                </div> */}

             <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
  
  <Button
    className="group !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-400 hover:!bg-[#ff5252]"
    onClick={() => context.handleOpenProductDetailsModal(true, props?.item)}
  >
    <MdZoomOutMap className="text-[18px] text-black group-hover:text-white transition-colors duration-200" />
  </Button>

  <Button
    className="group !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-400 hover:!bg-[#ff5252]"
  >
    <IoGitCompareOutline className="text-[18px] text-black group-hover:text-white transition-colors duration-200" />
  </Button>

  <Button
    className="group !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-gray-400 hover:!bg-[#ff5252]"
    onClick={() => handleAddToMyList(props?.item)}
  >
    {isAddedInMyList ? (
      <IoMdHeart className="text-[18px] text-black group-hover:text-white transition-colors duration-200" />
    ) : (
      <FaRegHeart className="text-[18px] text-black group-hover:text-white transition-colors duration-200" />
    )}
  </Button>
</div>


            </div>
            <div className="info p-3 py-5  relative pb-[50px] h-[190px]">
                <h6 className='text-[13px] !font-[400]'><span className='link transition-all'>{props.item?.brand}</span></h6>
                <h3 className='text-[14px] title mt-1 font-[500] mb-1 text-[#000]'><Link to={`/product/${props.item?._id}`} className='link transition-all'>
                    {props.item?.name?.substr(0, 30) + '....'}
                </Link></h3>
                <Rating name="size-medium" defaultValue={props.item?.rating} readOnly />
                <br />
                <div className="flex items-center gap-4">
                    <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>&#x20b9; {props.item?.oldPrice}</span>
                    <span className='price text-[#ff5252] text-[15px] font-[600]'>&#x20b9; {props.item?.price}</span>
                </div>

                {/* <div className="mt-3"> */}
                <div className="!absolute bottom-[15px] left-0 pl-3 w-full">
                    {
                        isAdded === false ?
                            <Button className='btn-org flex gap-2' onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}>
                                < MdOutlineShoppingCart className='text-[20px]' />Add to Cart</Button> 
                                :
                                <>
                                {
                                    isLoading === true ?
                                     <Button className='btn-org flex gap-2' >
                                <CircularProgress /> </Button>  :
                                <>
 <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">
                                <Button className='!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none' onClick={minusQty}><FaMinus className='text-[rgba(0,0,0,0.7)]' /></Button>
                                <span>{quantity}</span>
                                <Button className='!min-w-[35px] !w-[35px] !h-[30px] !bg-[#ff5252] !rounded-none' onClick={addQty}><FaPlus className='text-white' /></Button>
                            </div>
                                </>
                                }
                                </>
                                
                           

                    }




                </div>
            </div>
        </div>
    )
}

export default ProductItem;