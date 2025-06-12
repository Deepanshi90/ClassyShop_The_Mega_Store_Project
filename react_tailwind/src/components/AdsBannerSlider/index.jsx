import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';


const AdsBannerSlider = (props) => {
  return (
    <div className='py-5 w-full'>
    <Swiper
              slidesPerView={props.items}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="smlBtn"
            >
                <SwiperSlide>
                    <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/'}/>
                </SwiperSlide>
            </Swiper>
    </div>
  )
}

export default AdsBannerSlider;
