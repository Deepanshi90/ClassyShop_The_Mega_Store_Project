import React from 'react'
import "../bannerBoxV2/style.css";
import { Link } from 'react-router-dom';

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 overflow-hidden w-full rounded-md group relative">
        <img src={props.image} alt="banner1" className='w-full transition-all duration-150 group-hover:scale-105' />

        <div className={`info absolute p-5 top-0 ${props.info==="left" ?"left-0" :"right-0"} w-[50%] h-[100%] z-50 flex items-center justify-center flex-col gap-2 ${props.info ==="left"? " " : "pl-12"}`} >
            <h2 className='text-[18px] font-[600]'>{props.item?.bannerTitle || "Fantastic Products"}</h2>
            <span className='text-[20px] text-[#ff5252] font-[600] w-full'>&#x20b9; {props.item?.price || "All Ranges"}</span>
            <div className="w-full">
            <Link to="/productListing" className='text-[16px] font-[600] link'>Shop Now</Link>
            </div>
        </div>
    </div>
  )
}

export default BannerBoxV2;


//  {
//               props?.item?.subCatId !== undefined && props?.item?.subCatId !==null ?
// <Link to={`/products?subCatId=${props?.item?.subCatId}`} className='text-[16px] font-[600] link'>
//   SHOP NOW
// </Link>

//               : <Link to={`/products?catId=${props?.item?.catId}`} className='text-[16px] font-[600] link'>SHOP NOW</Link>
//             }