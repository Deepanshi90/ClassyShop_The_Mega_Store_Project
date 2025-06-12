import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils Copy/api';
import { MdBrandingWatermark, MdFilterVintage, MdRateReview } from 'react-icons/md';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import {BsPatchCheckFill} from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';




const ProductDetails = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [product,setProduct] = useState();
    const zoomSliderBig = useRef();
    const zoomSliderSml = useRef();

    const {id} = useParams();


    const goto = (index) => {
        setSlideIndex(index);
        if (zoomSliderSml.current?.swiper) {
            zoomSliderSml.current.swiper.slideTo(index);
        }
        if (zoomSliderBig.current?.swiper) {
            zoomSliderBig.current.swiper.slideTo(index);
        }
    };

    useEffect(() =>{
        fetchDataFromApi(`/api/product/${id}`).then((res) =>{

            
            if(res?.error === false){
                setTimeout(() =>{
                    setProduct(res?.product)
                },2000)
              
            }
            // console.log(res?.product);
            
        })
    },[])
  return (
    <>
     <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between mb-5">

<h1 className='font-[700] text-[20px] text-gray-800 '>Products Details</h1>


</div>

<br />
{
    product?._id!== "" && product?._id !== undefined && product?._id !== null ? 
  <>
  
  <div className="productDetails flex gap-8">
    <div className="w-[40%]">
        {
            product?.images?.length !== 0 && 
            <div className="flex gap-3">
            {/* Thumbnail Swiper */}
            <div className={`slider w-[15%] h-[500px] $`}>
                <Swiper
                    ref={zoomSliderSml}
                    direction="vertical"
                    slidesPerView={5}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className={`zoomProductSliderThumbs h-[500px] overflow-hidden ${product?.images?.length >5  && 'space'} `}
                    loop={false} // disable loop to prevent infinite scroll
                >{
                    product?.images?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`item rounded-md overflow-hidden cursor-pointer group ${
                            slideIndex === index ? 'opacity-50' : 'opacity-100'
                          }`}
                          onClick={() => goto(index)}
                        >
                          <img
                            src={item} // Assuming `item` is the image URL
                            alt={`Thumb ${index + 1}`}
                            className="w-full transition-all group-hover:scale-110"
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  }
                  
                </Swiper>
            </div>

            {/* Zoom Section */}
            <div className="zoomContainer w-[85%] h-[450px] overflow-hidden rounded-md">
            <Swiper
                    ref={zoomSliderBig}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={false}
                >

{
                    product?.images?.map((item, index) => {
                        return(
                            <SwiperSlide key={index}>
                            <InnerImageZoom
                                zoomType="hover"
                                zoomScale={1}
                                src={item}
                                
                                alt="Zoomed Image"
                            />
                            </SwiperSlide>
                        )
                    })
                    }

                </Swiper>
            </div>
        </div>
        }
       
    </div>

    <div className="w-[60%]">
        <h1 className='text-[25px] font-[500] mb-4'>{product?.name}</h1>

        <div className="flex items-center py-1">
            <span className='w-[20%] font-[500] flex items-center gap-2'><MdBrandingWatermark className='opacity-65' />Brand:</span>
            <span className='text-[14px]'>{product?.brand}</span>
        </div>

        <div className="flex items-center py-1">
            <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><BiSolidCategoryAlt className='opacity-65' />Category:</span>
            <span className='text-[14px]'>{product?.catName}</span>
        </div>
{
    product?.productRam?.length > 0 && 

    <div className="flex items-center py-1">
    <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><MdFilterVintage className='opacity-65 ' />RAM:</span>

    <div className="flex items-center gap-2">
        {
            product?.productRam?.map((ram,index)=>{
                return(
                    <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]' key={index}>{ram}</span>
                )
            })
        }
   
    </div>
    
</div>

}
       

{
    product?.size?.length !== 0 && 

    <div className="flex items-center py-1">
    <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><MdFilterVintage className='opacity-65 ' />Size:</span>

    <div className="flex items-center gap-2">
        {
            product?.size?.map((size,index)=>{
                return(
                    <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]' key={index}>{size}</span>
                )
            })
        }
   
    </div>
    
</div>

}


{
    product?.productWeight?.length !== 0 && 

    <div className="flex items-center py-1">
    <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><MdFilterVintage className='opacity-65 ' />Weight:</span>

    <div className="flex items-center gap-2">
        {
            product?.productWeight?.map((weight,index)=>{
                return(
                    <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500]' key={index}>{weight}</span>
                )
            })
        }
   
    </div>
    
</div>

}


<div className="flex items-center py-1">
            <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><MdRateReview className='opacity-65' />Review:</span>
            <span className='text-[14px]'>({product?.reviews?.length >0? product?.reviews?.length  : 0}) Review</span>
        </div>

        <div className="flex items-center py-1">
            <span className='w-[20%] font-[500] flex items-center gap-2  text-[14px]'><BsPatchCheckFill className='opacity-65' />Publish:</span>
            <span className='text-[14px]'>{product?.createdAt?.split("T")[0]}</span>
        </div>

        <br />

        <h2 className="text-[20px]  font-[500] mb-3">Product Description</h2>
    {
        product?.description && 
        <p className='text-[14px]'>{ product?.description}</p>
    }

    </div>
</div> 
<br />
<br />

<h2 className="text-[18px] font-[500]">Customer Reviews</h2>

<div className="reviewWrap mt-3">
    <div className="reviews w-full mb-3 h-auto p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-8 ">
            <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                <img src="https://res.cloudinary.com/duuhms1hb/image/upload/v1746637839/1746637835868_Screenshot_17.png" className="w-full h-full object-cover " alt="client image" />
            </div>

            <div className="info w-[80%] ">
               <div className="flex items-center justify-between">
               <h4 className="text-[16px] font-[500] ">ABC XYZ</h4>
               <Rating name="read-only" value={4} readOnly size='small' />
               </div>
                <span className='text-[14px] mt-2 '>2025=07-10</span>
                <p className='text-[15px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem voluptates et nam sequi, sint magni minus aspernatur deleniti labore adipisci quas tenetur perferendis molestias voluptatem quae dolor inventore cum aliquid? Quia?</p>
            </div>
        </div>

        
    </div>

    <div className="reviews w-full mb-3 h-auto p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-8 ">
            <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                <img src="https://res.cloudinary.com/duuhms1hb/image/upload/v1746637839/1746637835868_Screenshot_17.png" className="w-full h-full object-cover " alt="client image" />
            </div>

            <div className="info w-[80%] ">
               <div className="flex items-center justify-between">
               <h4 className="text-[16px] font-[500] ">ABC XYZ</h4>
               <Rating name="read-only" value={4} readOnly size='small' />
               </div>
                <span className='text-[14px] mt-2 '>2025=07-10</span>
                <p className='text-[15px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem voluptates et nam sequi, sint magni minus aspernatur deleniti labore adipisci quas tenetur perferendis molestias voluptatem quae dolor inventore cum aliquid? Quia?</p>
            </div>
        </div>

        
    </div>

    <div className="reviews w-full mb-3 h-auto p-4 bg-white shadow-md rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-8 ">
            <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                <img src="https://res.cloudinary.com/duuhms1hb/image/upload/v1746637839/1746637835868_Screenshot_17.png" className="w-full h-full object-cover " alt="client image" />
            </div>

            <div className="info w-[80%] ">
               <div className="flex items-center justify-between">
               <h4 className="text-[16px] font-[500] ">ABC XYZ</h4>
               <Rating name="read-only" value={4} readOnly size='small' />
               </div>
                <span className='text-[14px] mt-2 '>2025=07-10</span>
                <p className='text-[15px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi exercitationem voluptates et nam sequi, sint magni minus aspernatur deleniti labore adipisci quas tenetur perferendis molestias voluptatem quae dolor inventore cum aliquid? Quia?</p>
            </div>
        </div>

        
    </div>
</div>
</>

: 

<div className="flex item-center justify-center h-96">
    
    <CircularProgress color="inherit" />
    </div>
}





    </>
  )
}


export default ProductDetails;