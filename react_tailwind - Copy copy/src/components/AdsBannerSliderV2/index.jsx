import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import BannerBox from '../BannerBox';
import BannerBoxV2 from '../bannerBoxV2';
import { MyContext } from '../../App';


const AdsBannerSliderV2 = (props) => {

    const context = useContext(MyContext)

//   return (
//     <div className='py-2 lg:py-5 w-full resBannerSlider'>
//     <Swiper
//               slidesPerView={props.items}
//               spaceBetween={20}
//               navigation={context?.windowWidth<992 ? false : true}
//               modules={[Navigation, FreeMode]}
//                        freeMode={true}
//                        breakpoints={{
//                          300: { slidesPerView: 1 , spaceBetween:5 },
//                          450: { slidesPerView: 2 ,spaceBetween:5},
//                          750: { slidesPerView: 3 ,spaceBetween:5},
//                          900: { slidesPerView: 4 ,spaceBetween:5},
//                          1100: { slidesPerView: 5 ,spaceBetween:5}
//                        }}
//               className="smlBtn"
//             >
//                 {
//                     props?.data?.map((item,index) =>{
//                         return(
//  <SwiperSlide key={index}>
//                     <BannerBoxV2 info={item?.alignInfo} item={item} image={item?.images[0]} link={'/'}/>
//                 </SwiperSlide>
//                         )
//                     })
//                 }
               
//                 {/* <SwiperSlide>
//                     <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"} link={'/'}/> */}
//                 {/* </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"} link={'/'}/>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"} link={'/'}/>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"} link={'/'}/>
//                 </SwiperSlide> */}
//             </Swiper>
//     </div>
//   )
return (
  <div className='py-2 lg:py-5 w-full resBannerSlider'>
    <Swiper
      spaceBetween={20}
      navigation={context?.windowWidth < 992 ? false : true}
      modules={[Navigation, FreeMode]}
      freeMode={true}
      breakpoints={{
        300: { slidesPerView: 1, spaceBetween: 5 },
        450: { slidesPerView: 2, spaceBetween: 5 },
        750: { slidesPerView: 3, spaceBetween: 5 },
        900: { slidesPerView: 4, spaceBetween: 5 },
        1100: { slidesPerView: 5, spaceBetween: 5 }
      }}
      className="smlBtn"
    >
      {
        props?.data?.map((item, index) => (
          <SwiperSlide key={index}>
            <BannerBoxV2
              info={item?.alignInfo}
              item={item}
              image={item?.images[0]}
              link="/productListing"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  </div>
);

}

export default AdsBannerSliderV2;
