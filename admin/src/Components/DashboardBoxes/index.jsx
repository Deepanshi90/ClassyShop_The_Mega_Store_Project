import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode"
import { Navigation , FreeMode} from 'swiper/modules';
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import {AiTwotonePieChart} from "react-icons/ai"
import {BsBank} from "react-icons/bs"
import {RiProductHuntLine} from "react-icons/ri"
import { FiPieChart } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { MdOutlineReviews } from "react-icons/md";
import { useContext } from 'react';
import { MyContext } from '../../App';


const DashboardBoxes = (props) => {

    const context = useContext(MyContext);
    return (
        <>
        {/* // <div className="w-full px-4 py-8"> */}
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                // navigation={context?.windowWidth<992?false: true}
                modules={[Navigation , FreeMode]}
                freeMode={true}

        //            breakpoints={{
        //   300: {
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        // navigation:false
        //   },
        //   650: {
        //     slidesPerView: 2,
        //     spaceBetween: 10,
        //  navigation:false
        //   },
        //   768: {
        //     slidesPerView: 3,
        //     spaceBetween: 10,
        //  navigation:false
        //   },
        //   992: {
        //     slidesPerView: 4,
        //     spaceBetween: 10,
        //  navigation:false
        //   },
        // }}

                className="dashboardBoxesSlider mb-3"
            >

                <SwiperSlide>
                    <div className="box bg-[#10b981] p-5 py-6 cursor-pointer hover:bg-[#289974] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <FiPieChart className='text-[50px] text-[#fff]'/>
                        <div className="info w-[70%]">
                            
                            <h3 className='text-white'>Total Users</h3>
                            <b className='text-white text-20px'>{props.users}</b>

                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
                    </div>
                    
                </SwiperSlide>
               
               <SwiperSlide>
                    <div className="box p-5 bg-[#3872fa] py-6 cursor-pointer hover:bg-[#346ae8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <GoGift className='text-[40px] text-[#fff] '/>
                        <div className="info w-[70%]">
                            
                                                        <h3 className='text-white'>Total Orders</h3>
                            <b className='text-white text-20px'>{props?.orders}</b>

                        </div>
                        <FiPieChart className='text-[50px] text-[#fff]'/>
                    </div>
                    
                </SwiperSlide>

                <SwiperSlide>
                    <div className="box p-5 bg-[#312be1d8] py-6 cursor-pointer hover:bg-[#423eadd8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <RiProductHuntLine className='text-[40px] text-[#fff]'/>
                        <div className="info w-[70%]">
                            
                                                         <h3 className='text-white'>Total Pro & Cat </h3>
                            <b className='text-white text-20px'>{props?.products} & {props?.category}</b>

                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
                    </div>
                    
                </SwiperSlide>
                
                <SwiperSlide>
                    <div className="box p-5 bg-[#f22c61] py-6 cursor-pointer hover:bg-[#d52c59] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <MdOutlineReviews className='text-[40px] text-[#fff]'/>
                        <div className="info w-[70%]">
                            
                             <h3 className='text-white'>Total Reviews</h3>
                            <b className='text-white text-20px'>{props?.reviews}</b>

                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#fff]'/>
                    </div>
                    
                </SwiperSlide>
            </Swiper>
        {/* </div> */}
        </>
    );
};

export default DashboardBoxes;


