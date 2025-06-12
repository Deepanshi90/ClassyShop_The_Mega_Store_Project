import React, { useContext } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';


const HomeBannerV2 = () => {
  const context = useContext(MyContext)
  return (
    <Swiper
        loop={true}
        spaceBetween={30}
        effect={'fade'}
        navigation={context?.windowWidth <992 ? false : true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 3000, // ⏱ Delay between slides (in ms)
            disableOnInteraction: false, // 👉 Keep autoplay even after interaction
          }}
        modules={[EffectFade, Navigation, Pagination,Autoplay]}
        className="homeSliderV2"
      >
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative">
          <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg" />

          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex items-center flex-col justify-center transition-all duration-700">
            {/* <h4 className='font-[500] text-[12px] lg:text-[18px] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000'>
            Big Saving Days Sale</h4> */}
         <h4 className="font-medium text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] w-full text-left mb-3 relative right-0 opacity-100 transition-all duration-1000 ease-in-out break-words">
  Big Saving Days Sale
</h4>


            {/* <h2 className='font-[700] text-[15px] sm:text-[15px] md:text-[18px] lg:text-[35px] w-full relative -right-[100%] opacity-0 duration-1000'>Women Solid Round
                Green T-Shirt
            </h2>
            <h3 className='flex items-center gap-0 lg:gap-3 font-[500] text-[12px] lg:text-[18px] w-full text-left mt-3 mb-0 lg:mb-3 relative -right-[100%] flex-col lg:flex-row opacity-0 duration-1000 '>
              <span className=' w-full lg:w-max hidden lg:block'>Starting At Only </span>
                <span className='text-[#ff5252] text-[16px] mt-0 lg:mt-3 lg:text-[30px] font-[700] block lg:inline w-full lg:w-max'>Rs.100</span>
            </h3>
            <div className='w-full relative -right-[100%] opacity-0 duration-1000 btn_'>
           <Link to="/productListing"> */}
           {/* <Link to={`/product/${item?._id}`}></Link> */}
            {/* <Button className='btn-org btn-sm'>Shop Now</Button></Link>
            </div> */}
<h2 className="font-bold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[35px] w-full text-left relative right-0 opacity-100 transition-all duration-1000 ease-in-out break-words leading-snug">
  Women Solid Round Green T-Shirt
</h2>

<h3 className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-3 font-medium text-[11px] sm:text-[12px] lg:text-[18px] w-full text-left mt-2 lg:mt-3 mb-0 lg:mb-3 relative right-0 opacity-100 transition-all duration-1000 ease-in-out">
  <span className="block lg:inline w-full lg:w-max hidden lg:block">Starting At Only</span>
  <span className="text-[#ff5252] text-[14px] sm:text-[16px] lg:text-[30px] font-bold block lg:inline w-full lg:w-max">
    Rs.100
  </span>
</h3>

<div className="w-full relative right-0 opacity-100 transition-all duration-1000 ease-in-out flex justify-start">
  <Link to="/productListing">
    <Button className="btn-org btn-sm text-[12px] px-3 py-1">Shop Now</Button>
  </Link>
</div>


          </div>
          </div>
        </SwiperSlide>

         <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative">
          <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg" />

          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex items-center flex-col justify-center transition-all duration-700">
            <h4 className="font-medium text-[10px] sm:text-[12px] md:text-[14px] lg:text-[18px] w-full text-left mb-3 relative right-0 opacity-100 transition-all duration-1000 ease-in-out break-words">
            Big Saving Days Sale</h4>
            <h2 className="font-bold text-[12px] sm:text-[14px] md:text-[18px] lg:text-[35px] w-full text-left relative right-0 opacity-100 transition-all duration-1000 ease-in-out break-words leading-snug">Buy Modern Chair In
Black Color
            </h2>
            <h3 className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-3 font-medium text-[11px] sm:text-[12px] lg:text-[18px] w-full text-left mt-2 lg:mt-3 mb-0 lg:mb-3 relative right-0 opacity-100 transition-all duration-1000 ease-in-out">
  <span className="block lg:inline w-full lg:w-max hidden lg:block">Starting At Only</span>
  <span className="text-[#ff5252] text-[14px] sm:text-[16px] lg:text-[30px] font-bold block lg:inline w-full lg:w-max">
    Rs.100
  </span>
</h3>
           <div className="w-full relative right-0 opacity-100 transition-all duration-1000 ease-in-out flex justify-start">
  <Link to="/productListing">
    <Button className="btn-org btn-sm text-[12px] px-3 py-1">Shop Now</Button>
  </Link>
</div>
          </div>
          </div>
        </SwiperSlide>


        {/* <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative">
          <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg" />
          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex items-center flex-col justify-center transition-all duration-700">
            <h4 className='font-[500] text-[18px] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000'>
            Big Saving Days Sale</h4>
            <h2 className='font-[700] text-[35px] w-full relative -right-[100%] opacity-0 duration-1000'>Buy Modern Chair In
Black Color
            </h2>
            <h3 className='flex items-center gap-3 font-[500] text-[18px] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0 duration-1000'>Starting At Only 
                <span className='text-[#ff5252] text-[30px] font-[700]'>$99.00</span>
            </h3>
            <div className='w-full relative -right-[100%] opacity-0 duration-1000 btn_'>
            <Button className='btn-org '>Shop Now</Button>
            </div>
          </div>
          </div>
        </SwiperSlide> */}

        {/* <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden relative group">
  <img
    src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg"
    alt="Women T-Shirt"
    className="w-full h-auto object-cover"
  />

  <div className="info absolute top-0 right-0 w-full sm:w-[60%] md:w-[50%] h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center items-start
    bg-black/50 text-white opacity-0 translate-x-full group-hover:translate-x-0 group-hover:opacity-100
    transition-all duration-700 ease-in-out z-20">

    <h4 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl mb-2 transition-all duration-1000">
      Big Saving Days Sale
    </h4>

    <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-[35px] mb-2 transition-all duration-1000">
      Women Solid Round Green T-Shirt
    </h2>

    <h3 className="flex flex-wrap items-center gap-2 font-medium text-sm sm:text-base md:text-lg lg:text-xl mt-2 mb-4 transition-all duration-1000">
      Starting At Only 
      <span className="text-[#ff5252] text-base md:text-2xl font-bold">Rs.100</span>
    </h3>

    <div className="transition-all duration-1000">
      <Link to="/productListing">
        <Button className="btn-org btn text-sm sm:text-base">Shop Now</Button>
      </Link>
    </div>
  </div>
</div>

        </SwiperSlide>
         */}
      </Swiper>
  )
}

export  default HomeBannerV2;