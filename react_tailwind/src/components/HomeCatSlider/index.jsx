import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Product data array
// const products = [
//   {
//     name: 'Smart Tablet',
//     image: 'https://api.spicezgold.com/download/file_1734525204708_fash.png',
//   },
//   {
//     name: 'Laptops',
//     image: 'https://api.spicezgold.com/download/file_1734525218436_ele.png',
//   },
//   {
//     name: 'Phones',
//     image: 'https://api.spicezgold.com/download/file_1734525231018_bag.png',
//   },
//   {
//     name: 'Gaming',
//     image: 'https://api.spicezgold.com/download/file_1734525239704_foot.png',
//   },
//   {
//     name: 'Watches',
//     image: 'https://api.spicezgold.com/download/file_1734525248057_gro.png',
//   },
//   {
//     name: 'Accessories',
//     image: 'https://api.spicezgold.com/download/file_1734525255799_beauty.png',
//   },
//   {
//     name: 'Home Tech',
//     image: 'https://api.spicezgold.com/download/file_1734525275367_well.png',
//   },
// ];

const HomeCatSlider = (props) => {
  return (
    
    <div className="py-8 bg-gray-50 pt-4 ">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          
          {          
          props?.data?.map((cat, index) => (
            <SwiperSlide key={index}>
              <Link to="/">
                <div className="item py-6 px-4 bg-white rounded-lg text-center flex items-center justify-center flex-col shadow hover:shadow-lg transition duration-300">
                  <img
                    src={cat?.images}
                    alt="category images"
                    className="w-[60px] h-[100px] object-contain"
                  />
                  <h3 className="text-sm font-medium mt-2">{cat?.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}

{/* {console.log("HomeCatSlider received data:", props?.data) ||
Array.isArray(props?.data) && props.data.length > 0 ? (
  props.data.map((cat, index) => (
    <SwiperSlide key={index}>
      <Link to="/">
        <div className="item py-6 px-4 bg-white rounded-lg text-center flex items-center justify-center flex-col shadow hover:shadow-lg transition duration-300">
          <img
            src={cat?.image || cat?.images?.[0]}
            alt={cat?.name}
            className="w-[60px] h-[100px] object-contain"
          />
          <h3 className="text-sm font-medium mt-2">{cat?.name}</h3>
        </div>
      </Link>
    </SwiperSlide>
  ))
) : (
  <p className="text-center">No categories to display</p>
)} */}

        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
