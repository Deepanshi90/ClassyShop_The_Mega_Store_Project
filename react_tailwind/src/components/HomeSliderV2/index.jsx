import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Button } from '@mui/material';


const HomeBannerV2 = () => {
  return (
    <Swiper
        loop={true}
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
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
            <h4 className='font-[500] text-[18px] w-full text-left mb-3 relative -right-[100%] opacity-0 duration-1000'>
            Big Saving Days Sale</h4>
            <h2 className='font-[700] text-[35px] w-full relative -right-[100%] opacity-0 duration-1000'>Women Solid Round
                Green T-Shirt
            </h2>
            <h3 className='flex items-center gap-3 font-[500] text-[18px] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0 duration-1000'>Starting At Only 
                <span className='text-[#ff5252] text-[30px] font-[700]'>$59.0</span>
            </h3>
            <div className='w-full relative -right-[100%] opacity-0 duration-1000 btn_'>
            <Button className='btn-org '>Shop Now</Button>
            </div>
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        
      </Swiper>
  )
}

export  default HomeBannerV2;