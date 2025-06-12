import React, { useContext, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { MyContext } from '../../App';

export const ProductZoom = (props) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderSml = useRef();
    const context = useContext(MyContext);
    const goto = (index) => {
        setSlideIndex(index);
        if (zoomSliderSml.current?.swiper) {
            zoomSliderSml.current.swiper.slideTo(index);
        }
        if (zoomSliderBig.current?.swiper) {
            zoomSliderBig.current.swiper.slideTo(index);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row gap-3">
            {/* Thumbnail Swiper */}
            <div className="slider w-full lg:w-[15%] h-auto lg:h-[500px] order-2 lg:order-1">
                <Swiper
                    ref={zoomSliderSml}
                    direction={context?.windowWidth<992 ? "horizontal" : "vertical"}
                    slidesPerView={5}
                    spaceBetween={10}
                    navigation={context?.windowWidth<992 ? false : true}
                    modules={[Navigation]}
                    className={`zoomProductSliderThumbs h-auto lg:h-[500px] overflow-hidden ${props?.images?.length > 5 &&'space'}`}
                    loop={false} // disable loop to prevent infinite scroll
                >

                    {
                        props?.images?.map((item,index) =>{
                            return(
                                <SwiperSlide key={index}>
                                <div className={`item rounded-md overflow-hidden cursor-pointer group h-[100%] ${slideIndex === index ? 'opacity-50':'opacity-100'}`} onClick={() => goto(index)}>
                                    <img
                                        src={item}
                                        alt="Thumb 1"
                                        className="w-full transition-all group-hover:scale-110"
                                    />
                                </div>
                            </SwiperSlide>
                            )
                        })
                    }
                   
                    {/* <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 1 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(1)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-1-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 2 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(2)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-2-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 3 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(3)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-3-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 4 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(4)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-4-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 5 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(5)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-5-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 6 ? 'opacity-50':'opacity-100'}`} onClick={() => goto(6)}>
                            <img
                                src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-6-202405131403.jpg?im=Resize=(600,750)"
                                alt="Thumb 1"
                                className="w-full transition-all group-hover:scale-110"
                            />
                        </div>
                    </SwiperSlide> */}

                    <SwiperSlide>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Zoom Section */}
            <div className="zoomContainer  w-full lg:w-[85%] h-auto lg:h-[500px] overflow-hidden rounded-md order-1 lg:order-2">
            <Swiper
                    ref={zoomSliderBig}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={false}
                >
                     {
                        props?.images?.map((item,index) =>{
return(
    <SwiperSlide key={index}>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src={item}
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
)
                        })}
                    
                {/* <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-1-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-2-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-3-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-4-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
                
                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-5-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>
                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-6-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>

                <SwiperSlide>
                <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src="https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-7-202405131403.jpg?im=Resize=(600,750)"
                    
                    alt="Zoomed Image"
                />
                </SwiperSlide>  */}

                </Swiper>
            </div>
        </div>
    );
};


// import React, { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import InnerImageZoom from 'react-inner-image-zoom';
// import 'react-inner-image-zoom/lib/styles.min.css';

// export const ProductZoom = () => {
//     const [slideIndex, setSlideIndex] = useState(0);
//     const zoomSliderBig = useRef(null);
//     const zoomSliderSml = useRef(null);

//     const goto = (index) => {
//         setSlideIndex(index);
//         if (zoomSliderSml.current && zoomSliderSml.current.swiper) {
//             zoomSliderSml.current.swiper.slideTo(index);
//         }
//         if (zoomSliderBig.current && zoomSliderBig.current.swiper) {
//             zoomSliderBig.current.swiper.slideTo(index);
//         }
//     };

//     const imageUrls = [
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-0-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-1-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-2-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-3-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-4-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-5-202405131403.jpg?im=Resize=(600,750)",
//         "https://www.jiomart.com/images/product/original/rvmzhnmejf/keitra-klosia-women-purple-printed-cotton-blend-kurta-and-pant-set-product-images-rvmzhnmejf-6-202405131403.jpg?im=Resize=(600,750)"
//     ];

//     return (
//         <div className="flex gap-3">
//             {/* Thumbnail Swiper */}
//             <div className="slider w-[15%] h-[500px]">
//                 <Swiper
//                     ref={zoomSliderSml}
//                     direction="vertical"
//                     slidesPerView={4}
//                     spaceBetween={20}
//                     navigation={true}
//                     modules={[Navigation]}
//                     className="zoomProductSliderThumbs h-[500px] overflow-hidden"
//                     loop={false}
//                 >
//                     {imageUrls.map((url, index) => (
//                         <SwiperSlide key={index}>
//                             <div
//                                 className="item rounded-md overflow-hidden cursor-pointer group"
//                                 onClick={() => goto(index)}
//                             >
//                                 <img
//                                     src={url}
//                                     alt={`Thumb ${index + 1}`}
//                                     className="w-full transition-all group-hover:scale-110"
//                                 />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>

//             {/* Zoom Swiper */}
//             <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">
//                 <Swiper
//                     ref={zoomSliderBig}
//                     slidesPerView={1}
//                     spaceBetween={0}
//                     navigation={false}
//                     className="zoomSwiper"
//                     onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
//                 >
//                     {imageUrls.map((url, index) => (
//                         <SwiperSlide key={index}>
//                             <InnerImageZoom
//                                 zoomType="hover"
//                                 zoomScale={1.5}
//                                 src={url}
//                                 alt={`Zoomed Image ${index + 1}`}
//                             />
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </div>
//     );
// };
