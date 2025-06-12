import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from 'react-icons/go';
import Rating from '@mui/material/Rating';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const CartItems = (props) => {
    const [sizeanchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setCartItems] = useState(props.selected)
    // const [selectedSize, setSelectedSize] = useState(props.selected)
    const openSize = Boolean(sizeanchorEl);
const context = useContext(MyContext);
    const [qtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props.qty)
    const openQty = Boolean(qtyanchorEl);


    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if(value != null){
            setCartItems(value);
        }

    }; 

    // const handleCloseSize = (value) => {
    //     setSizeAnchorEl(null);
    //     if (value != null) {
    //         setSelectedSize(value); // was setCartItems
    //     }
    // };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value != null) {
            setSelectedQty(value);
            const cartObj={
    _id: props?.item?._id,
    qty:value,
    subTotal: props?.item?.price * value
}
editData(`/api/cart/update-qty`,cartObj).then((res)=>{
    console.log(res);
    if(res?.data?.error === false){ 

        context.alertBox("success",res?.data?.message)
        context?.getCartItems();
    }
})
        }

    };

    const updateCart = (selectedVal,qty,field) =>{
handleCloseSize(selectedVal)
console.log(selectedVal);
console.log(qty);

const cartObj={
    _id: props?.item?._id,
    qty:qty,
    subTotal: props?.item?.price * qty,
    size: props?.item?.size!=="" ? selectedVal :'',
weight: props?.item?.weight!=="" ? selectedVal :'',
ram: props?.item?.ram!=="" ? selectedVal :'',
}

// if productt size available

// if(field === "size"){
//     // alert(props?.item?.productId)
//     console.log(props?.item?.productId);
//     fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) =>{
//         const product = res?.product;
//         console.log(product);
        
//           const item = product?.size?.filter((size) =>
//         size?.includes(selectedVal)
//     )

//     if(item?.length !==0){

//     }
//     console.log(item);
//  editData(`/api/cart/update-qty`,cartObj).then((res)=>{
//     console.log(res);
//     if(res?.data?.error === false){ 

//         context.alertBox("success",res?.data?.message)
//         context?.getCartItems();
//     }
//     else{
//         context.alertBox("error",`Product not available with the size of ${selectedVal}`)
//     }
// })
//     })   
// }

if (field === "size") {
    console.log(props?.item?.productId);
    
    fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;
        console.log(product);
        
        const item = product?.size?.filter((size) =>
            size?.includes(selectedVal)
        );

        console.log(item);

        if (!item || item.length === 0) {
            context.alertBox("error", `Product not available with the size of ${selectedVal}`);
            return; // ⛔ Stop here if size is invalid
        }

        // ✅ Only update cart if size exists
        editData(`/api/cart/update-qty`, cartObj).then((res) => {
            console.log(res);
            if (res?.data?.error === false) {
                context.alertBox("success", res?.data?.message);
                context?.getCartItems();
            } else {
                context.alertBox("error", `Failed to update cart`);
            }
        });
    });
}


// if product weight available
// if(field === "weight"){
//     // alert(props?.item?.productId)
//     console.log(props?.item?.productId);
//     fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) =>{
//         const product = res?.product;
//         console.log(product);
        
//           const item = product?.productWeight?.filter((weight) =>
//         weight?.includes(selectedVal)
//     )

//     if(item?.length !==0){

//     }
//     console.log(item);
//  editData(`/api/cart/update-qty`,cartObj).then((res)=>{
//     console.log(res);
//     if(res?.data?.error === false){ 

//         context.alertBox("success",res?.data?.message)
//         context?.getCartItems();
//     }
//     else{
//         context.alertBox("error","Product not available!")
//     }
// })
//     })    
// }

// // if product ram avaiable
// if(field === "ram"){
//     // alert(props?.item?.productId)
//     console.log(props?.item?.productId);
//     fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) =>{
//         const product = res?.product;
//         console.log(product);
        
//           const item = product?.productRam?.filter((ram) =>
//         ram?.includes(selectedVal)
//     )

//     if(item?.length !==0){

//     }
//     console.log(item);
//  editData(`/api/cart/update-qty`,cartObj).then((res)=>{
//     console.log(res);
//     if(res?.data?.error === false){ 

//         context.alertBox("success",res?.data?.message)
//         context?.getCartItems();
//     }
//     else{
//         context.alertBox("error","Product not available!")
//     }
// })
//     })    
// }


if (field === "weight") {
    console.log(props?.item?.productId);

    fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;
        console.log(product);

        const item = product?.productWeight?.filter((weight) =>
            weight?.includes(selectedVal)
        );

        if (!item || item.length === 0) {
            context.alertBox("error", `Product not available with the weight of ${selectedVal}`);
            return; // ⛔ Don't proceed
        }

        // ✅ Proceed only if weight is available
        editData(`/api/cart/update-qty`, cartObj).then((res) => {
            console.log(res);
            if (res?.data?.error === false) {
                context.alertBox("success", res?.data?.message);
                context?.getCartItems();
            } else {
                context.alertBox("error", "Product not available!");
            }
        });
    });
}

if (field === "ram") {
    console.log(props?.item?.productId);

    fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
        const product = res?.product;
        console.log(product);

        const item = product?.productRam?.filter((ram) =>
            ram?.includes(selectedVal)
        );

        if (!item || item.length === 0) {
            context.alertBox("error", `Product not available with the RAM of ${selectedVal}`);
            return; // ⛔ Don't proceed
        }

        // ✅ Proceed only if RAM is available
        editData(`/api/cart/update-qty`, cartObj).then((res) => {
            console.log(res);
            if (res?.data?.error === false) {
                context.alertBox("success", res?.data?.message);
                context?.getCartItems();
            } else {
                context.alertBox("error", "Product not available!");
            }
        });
    });
}



    }

    const removeItem = (id) =>{
        deleteData(`/api/cart/delete-cart-item/${id}`).then((res) =>{
            console.log(res);
            context.alertBox("success","Item Deleted from cart Successfully!");
            context?.getCartItems();
        })
    }

    return (
        <div className="cartItem w-full p-3  flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden">
                <Link to={`/product/${props?.item?.productId}`} className='group'>
                    <img src={props?.item?.image} alt="image" className='w-full group-hover:scale-105 transition-all' />
                </Link>
            </div>

            <div className="info  w-[70%] sm:w-[80%] lg:w-[85%] relative">
                <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => removeItem(props?.item?._id)}/>
                <span className='text-[13px]'>{props?.item?.brand}</span>
                <h3 className='text-[13px] sm:text-[15px] w-[80%]'>
                    <Link to={`/product/${props?.item?.productId}`} className='link'>
                {props?.item?.productTitle?.substr(0, context?.windowWidth<992?30: 120) + "..."}</Link></h3>

                <Rating name="size-small" size='small' value={props?.item?.rating} readOnly />

                <div className="flex items-center gap-4 mt-2">
                     {
                        props?.item?.size !== "" &&
                        <>
                        {
                            props?.productSizeData?.length !==0 &&
                            <div className='relative'>
                                
                                <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickSize}>Size: {selectedSize} < GoTriangleDown /></span>

                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeanchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >

                                    {
                                        props?.productSizeData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index}
                                                    className={`${item?.name === selectedSize && 'selected'}`}
                                                    onClick={() =>updateCart(item?.name,props?.item?.quantity,"size")}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>

                            </div>
                        }
                            
                        </>
                    }



                     {
                        props?.item?.ram !== "" &&
                        <>
                        {
                            props?.productRamsData?.length !==0 &&
                            <div className='relative'>
                                
                                <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickSize}>RAM: {selectedSize} < GoTriangleDown /></span>

                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeanchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >

                                    {
                                        props?.productRamData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index}
                                                    className={`${item?.name === selectedSize && 'selected'}`}
                                                    onClick={() =>updateCart(item?.name,props?.item?.quantity , "ram")}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>

                            </div>
                        }
                            
                        </>
                    }


                     {
                        props?.item?.weight !== "" &&
                        <>
                        {
                            props?.productWeightData?.length !==0 &&
                            <div className='relative'>
                                
                                <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickSize}> Size: {selectedSize} < GoTriangleDown /></span>

                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeanchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >

                                    {
                                        props?.productWeightData?.map((item, index) => {
                                            return (
                                                <MenuItem key={index}
                                                    className={`${item?.name === selectedSize && 'selected'}`}
                                                   onClick={() =>updateCart(item?.name,props?.item?.quantity,"weight")}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>

                            </div>
                        }
                            
                        </>
                    }


                    <div className='relative'>
                        <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickQty}> Qty:{selectedQty} < GoTriangleDown /></span>

                        <Menu
                            id="size-menu"
                            anchorEl={qtyanchorEl}
                            open={openQty}
                            onClose={() => handleCloseQty(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

{Array.from({length:15}).map((_,index) =>(
    <MenuItem key={index} onClick={() => handleCloseQty(index+1)}>{index+1}</MenuItem>
))}
                        </Menu>


                    </div>


                </div>

                <div className="flex items-center gap-4 mt-2">
                    <span className='price text-[14px] font-[600]'>&#x20b9; {props?.item?.price}</span>
                    <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>&#x20b9; {props?.item?.oldPrice}</span>

                    <span className='price text-[#ff5252] text-[14px] font-[600]'>{props?.item?.discount}%</span>
                </div>
            </div>
        </div>
    )
}

export default CartItems;
