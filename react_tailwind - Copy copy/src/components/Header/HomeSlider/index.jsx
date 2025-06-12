import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { MyContext } from '../../../App';

const HomeSlider = (props) => {
  const context = useContext(MyContext)
  return (
    <div className="homeSlider pb-2 pt-3 lg:pt-5 lg:pb-5 relative z-[99]">
      <div className="container">
        <Swiper
          spaceBetween={10}
          navigation={context?.windowWidth< 992? false : true}
          loop={true} // 🔁 Enable infinite loop
          autoplay={{
            delay: 2000, // ⏱ Delay between slides (in ms)
            disableOnInteraction: false, // 👉 Keep autoplay even after interaction
          }}
          modules={[Navigation, Autoplay]}
          className="sliderHome"
        >
          {
            props?.data?.length !== 0 && props?.data?.map((item,index) =>{
              return(
                <SwiperSlide key={index}>
                <div className="item rounded-[10px] overflow-hidden">
                  <img
                    src={item?.images[0]}
                    alt="Banner1"
                    className="w-full"
                  />
                </div>
              </SwiperSlide>
              )
            })
          }
          {/* <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg"
                alt="Banner1"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg"
                alt="Banner2"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg"
                alt="Banner3"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg"
                alt="Banner4"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
                alt="Banner5"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://api.spicezgold.com/download/file_1734525014348_NewProject(7).jpg"
                alt="Banner6"
                className="w-full"
              />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
