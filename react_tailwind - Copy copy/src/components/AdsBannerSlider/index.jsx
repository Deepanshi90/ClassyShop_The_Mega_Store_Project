// import React, { useContext } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/free-mode';
// import { Navigation, FreeMode } from 'swiper/modules';
// import BannerBox from '../BannerBox';
// import { MyContext } from '../../App';


// const AdsBannerSlider = (props) => {
//     const context = useContext(MyContext);
//   return (
//     <div className='py-5 w-full'>
//     <Swiper
//               slidesPerView={props.items}
//               spaceBetween={20}
//               navigation={context?.windowWidth < 992 ? false : true}
//                 modules={[Navigation, FreeMode]}
//       freeMode={true}
//       breakpoints={{
//         300: { slidesPerView: 1, spaceBetween: 5 },
//         450: { slidesPerView: 2, spaceBetween: 5 },
//         750: { slidesPerView: 3, spaceBetween: 5 },
//         900: { slidesPerView: 4, spaceBetween: 5 },
//         1100: { slidesPerView: 5, spaceBetween: 5 }
//       }}
//               className="smlBtn"
//             >
//                  <SwiperSlide>
//                     <BannerBox img={"https://www.jiomart.com/images/cms/aw_rbslider/slides/1747417712_1.jpg?im=Resize=(768,448)"} link={'/productListing'}/>
//                 </SwiperSlide>
//                  <SwiperSlide>
//                     <BannerBox img={"https://www.jiomart.com/images/cms/aw_rbslider/slides/1744469612_grocery_super_saver.jpg?im=Resize=(768,448)"} link={'/productListing'}/>
//                 </SwiperSlide>
//                  <SwiperSlide>
//                     <BannerBox img={"https://www.jiomart.com/images/cms/aw_rbslider/slides/1747331351_5.jpg?im=Resize=(768,448)"} link={'/productListing'}/>
//                 </SwiperSlide>
//                  <SwiperSlide>
//                     <BannerBox img={"https://www.jiomart.com/images/cms/aw_rbslider/slides/1747417770_2.jpg?im=Resize=(768,448)"} link={'/productListing'}/>
//                 </SwiperSlide>
                
//                 <SwiperSlide>
//                     <BannerBox img={"https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg"} link={'/productListing'}/>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBox img={"https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg"} link={'/productListing'}/>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBox img={"https://api.spicezgold.com/download/file_1734525620831_NewProject(3).jpg"} link={'/productListing'}/>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <BannerBox img={"https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg"} link={'/productListing'}/>
//                 </SwiperSlide>
               
//             </Swiper>
//     </div>
//   )
// }

// export default AdsBannerSlider;



import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import BannerBox from '../BannerBox';
import { MyContext } from '../../App';

const AdsBannerSlider = (props) => {
  const context = useContext(MyContext);

  const banners = [
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1747417712_1.jpg?im=Resize=(768,448)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1744469612_grocery_super_saver.jpg?im=Resize=(768,448)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1747331351_5.jpg?im=Resize=(768,448)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1747417770_2.jpg?im=Resize=(768,448)",
    "https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg",
    "https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg",
    "https://api.spicezgold.com/download/file_1734525620831_NewProject(3).jpg",
    "https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg",
  ];

  return (
    <div className="py-5 w-full">
      <Swiper
        spaceBetween={10}
        freeMode={true}
        navigation={(context?.windowWidth || 1024) >= 992}
        modules={[Navigation, FreeMode]}
        breakpoints={{
          300: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: props.items || 5 }, // fallback to props.items
        }}
        className="smlBtn"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <BannerBox img={img} link="/productListing" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
