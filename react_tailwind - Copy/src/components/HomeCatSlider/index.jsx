// import React, { useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import "swiper/css/free-mode"
// import { Navigation , FreeMode} from 'swiper/modules';
// import { Link } from 'react-router-dom';
// import { MyContext } from '../../App';

// // Product data array
// // const products = [
// //   {
// //     name: 'Smart Tablet',
// //     image: 'https://api.spicezgold.com/download/file_1734525204708_fash.png',
// //   },
// //   {
// //     name: 'Laptops',
// //     image: 'https://api.spicezgold.com/download/file_1734525218436_ele.png',
// //   },
// //   {
// //     name: 'Phones',
// //     image: 'https://api.spicezgold.com/download/file_1734525231018_bag.png',
// //   },
// //   {
// //     name: 'Gaming',
// //     image: 'https://api.spicezgold.com/download/file_1734525239704_foot.png',
// //   },
// //   {
// //     name: 'Watches',
// //     image: 'https://api.spicezgold.com/download/file_1734525248057_gro.png',
// //   },
// //   {
// //     name: 'Accessories',
// //     image: 'https://api.spicezgold.com/download/file_1734525255799_beauty.png',
// //   },
// //   {
// //     name: 'Home Tech',
// //     image: 'https://api.spicezgold.com/download/file_1734525275367_well.png',
// //   },
// // ];

// const HomeCatSlider = (props) => {
//   const context = useContext(MyContext)
//   return (
    
//     <div className="py-8 bg-gray-50 pt-4 ">
//       <div className="container ">
//         <Swiper
//           slidesPerView={8}
//           spaceBetween={10}
//           navigation={context?.windowWidth <992 ?false : true}
//           modules={[Navigation , FreeMode]}
//                 freeMode={true}

//                    breakpoints={{
//           300: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//         navigation:false
//           },
//           650: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//          navigation:false
//           },
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 10,
//          navigation:false
//           },
//           992: {
//             slidesPerView: 4,
//             spaceBetween: 10,
//          navigation:false
//           },
//         }}


//           className="mySwiper"
//         >
          
//           {         
//           props?.data?.map((cat, index) => (
//             <SwiperSlide key={index}>
//               <Link to="/">
//                 <div className="item py-6 px-4 bg-white rounded-lg text-center flex items-center justify-center flex-col shadow hover:shadow-lg transition duration-300">
//                   <img
//                     src={cat?.images}
//                     alt="category images"
//                     className="w-[60px] h-[100px] object-contain"
//                   />
//                   <h3 className="text-sm font-medium mt-2">{cat?.name}</h3>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}

// {/* {console.log("HomeCatSlider received data:", props?.data) ||
// Array.isArray(props?.data) && props.data.length > 0 ? (
//   props.data.map((cat, index) => (
//     <SwiperSlide key={index}>
//       <Link to="/">
//         <div className="item py-6 px-4 bg-white rounded-lg text-center flex items-center justify-center flex-col shadow hover:shadow-lg transition duration-300">
//           <img
//             src={cat?.image || cat?.images?.[0]}
//             alt={cat?.name}
//             className="w-[60px] h-[100px] object-contain"
//           />
//           <h3 className="text-sm font-medium mt-2">{cat?.name}</h3>
//         </div>
//       </Link>
//     </SwiperSlide>
//   ))
// ) : (
//   <p className="text-center">No categories to display</p>
// )} */}

//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default HomeCatSlider;


import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';

const HomeCatSlider = ({ data }) => {
  const context = useContext(MyContext);
  const windowWidth = context?.windowWidth || 1200;

  return (
    <div className=" py-4 lg:py-8 bg-gray-50 pt-0 lg:pt-4">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={windowWidth >= 992}
          modules={[Navigation, FreeMode]}
          freeMode={true}
          breakpoints={{
            300: { slidesPerView: 2 , spaceBetween:5 },
            550: { slidesPerView: 3 ,spaceBetween:5},
            600: { slidesPerView: 4 ,spaceBetween:5},
            900: { slidesPerView: 5 ,spaceBetween:5},
            1100: { slidesPerView: 8 ,spaceBetween:5}
          }}
          className="mySwiper"
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((cat, index) => (
              <SwiperSlide key={index}>
                <Link to="/">
                  <div className="item py-4 lg:py-6 px-4 bg-white rounded-lg text-center flex items-center justify-center flex-col shadow hover:shadow-lg transition duration-300">
                    <img
                      src={Array.isArray(cat?.images) ? cat.images[0] : cat?.images}
                      alt={cat?.name}
                      className="w-[40px] lg:w-[60px] h-[100px] object-contain hover:scale-150"
                    />
                    <h3 className="text-[12px] lg:text-[15px] font-medium mt-2">{cat?.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center">No categories to display</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
