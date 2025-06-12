import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation, FreeMode } from 'swiper/modules';
import ProductItem from '../ProductItem';
import { MyContext } from '../../App';


const ProductsSlider = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="productsSlider py-3">
         <Swiper
                  slidesPerView={props.items}
                  spaceBetween={20}
                  navigation={context?.windowWidth <992? false : true}
                  modules={[Navigation, FreeMode]}
                          freeMode={true}
                          breakpoints={{
                            300: { slidesPerView: 2 , spaceBetween:10 },
                            550: { slidesPerView: 3 ,spaceBetween:10},
                            600: { slidesPerView: 4 ,spaceBetween:10},
                            900: { slidesPerView: 6 ,spaceBetween:10},
                            // 1100: { slidesPerView: 8 ,spaceBetween:5}
                          }}
                  className="mySwiper"
                >
                    {
                        props?.data?.map((item,index) =>{
                            return(
                                <SwiperSlide key={index}>
                                <ProductItem item={item}/>
                            </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
    </div>
  )
}

export default ProductsSlider;
