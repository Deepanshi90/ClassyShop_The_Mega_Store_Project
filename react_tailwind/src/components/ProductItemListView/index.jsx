import React,{useContext} from 'react'
import "../ProductItem/style.css";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import  Button  from '@mui/material/Button';
import {FaRegHeart} from "react-icons/fa";
import {IoGitCompareOutline} from "react-icons/io5";
import {MdZoomOutMap} from "react-icons/md";
import { MdOutlineShoppingCart } from 'react-icons/md';
import {MyContext} from "../../App";


const ProductItemListView = () => {
    const context = useContext(MyContext)
  return (
    <div className="productItem rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] shadow-lg flex items-center">
        <div className=" group imagWrapper w-[25%]  overflow-hidden rounded-md relative">
            <Link to="/">
            <div className="img h-[220px] overflow-hidden">
            <img src="https://www.jiomart.com/images/product/original/rv3avveggl/trinitifab-saree-banarasi-silk-saree-traditional-banarasi-saree-wedding-banarasi-saree-party-wear-saree-banarasi-saree-with-zari-work-bridal-banarasi-saree-wine-product-images-rv3avveggl-0-202407091301.jpg?im=Resize=(330,410)" alt="F-1" className='w-full' />
            
            <img src="https://www.jiomart.com/images/product/original/443022011_gold/leaf-print-chanderi-dupatta-model-443022011_gold-0-202309061302.jpg?im=Resize=(330,410)" alt="F-1" className='w-full transition-all duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' />

            </div>
            </Link>
            

            <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]">10%</span>


            <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover-text-white  group' onClick={() => context.setOpenProductDetailsModal(true)}><MdZoomOutMap  className='text-[18px] !text-black  group-hover:text-white hover:!text-white'/></Button>

                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover-text-white  group'><IoGitCompareOutline className='text-[18px] !text-black  group-hover:text-white hover:!text-white'/></Button>

                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff5252] hover-text-white  group'><FaRegHeart  className='text-[18px] !text-black  group-hover:text-white hover:!text-white'/></Button>
            </div>
        </div>
        <div className="info p-3 px-8 py-5 w-[75%] ">
            <h6 className='text-[15px]  !font-[400]'><Link to = "/"  className='link transition-all'>TRINITIFAB</Link></h6>
            <h3 className='text-[18px] title mt-3  font-[500] mb-3 text-[#000]'><Link to = "/"  className='link transition-all'>Bridal Banarasi saree -(Wine)</Link></h3>
            <p className='text-[14px] mb-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam dolorem commodi et beatae alias fugit expedita eius numquam sequi sed hic, eum reprehenderit quam corporis molestias? Molestias et ipsam cumque molestiae saepe!</p>
            <Rating name="size-medium" defaultValue={4} readOnly/>
            <div className="flex items-center gap-4">
                <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>$58.00</span>
                <span className='price text-[#ff5252] text-[15px] font-[600]'>$58.00</span>
            </div>

            <div className="mt-3">
            <Button className='btn-org flex gap-2'>< MdOutlineShoppingCart  className='text-[20px]'/>Add to Cart</Button>
            </div>
        </div>
    </div>
  )
}

export  default ProductItemListView;