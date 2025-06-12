import React from 'react'
import HomeSlider from '../../components/Header/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider';
import { LiaShippingFastSolid } from 'react-icons/lia';
import AdsBannerSlider from '../../components/AdsBannerSlider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductsSlider from '../../components/ProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import Footer from '../../components/Footer';
import HomeBannerV2 from '../../components/HomeSliderV2';
import BannerBox from '../../components/BannerBox';
import BannerBoxV2 from '../../components/bannerBoxV2';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../utils/api';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import ProductLoading from '../../components/ProductLoading';
import BannerLoading from '../../components/LoadingSkelton/bannerLoading';

const Home = () => {
  const [value, setValue] = React.useState(0);
const [homeSlidesData , setHomeSlidesData] = useState([]);
const [popularProductsData, setPopularProductsData] = useState([]);
const [ productsData , setAllProductsData] = useState([]);
const [featuredProducts,setFeaturedProducts] = useState([]);
const [bannerV1Data , setBannerV1Data ] = useState([]);
const [blogData,setBlogData] = useState([]);
const context = useContext(MyContext);


  useEffect(() =>{
    window.scrollTo(0,0);
    fetchDataFromApi("/api/homeSlides").then((res) =>{
      // console.log(res);
      setHomeSlidesData(res?.data);
    })

    
  },[])

  useEffect(() => {
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      // console.log("getAllProducts Response:", res);
      if (res?.error === false) {
        setAllProductsData(res?.products);
      }
    });
  }, []);


  useEffect(() => {
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      console.log("getAllFeatured Response:", res);
      if (res?.error === false) {
        setFeaturedProducts(res?.products);
      }
    });
  }, []);
  


  


  useEffect(() =>{
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`).then((res) =>{
      console.log(res);
      if(res?.error === false){
        setPopularProductsData(res?.products)
      }
     
    })
  },[context?.catData])

  useEffect(() =>{
        fetchDataFromApi("/api/bannerV1").then((res) =>{
          setBannerV1Data(res?.data);
        })
  },[])

   useEffect(() =>{
        fetchDataFromApi("/api/blog").then((res) =>{
          setBlogData(res?.blogs);
        })
  },[])

  const handleChange = (event,newValue) => {
    // alert(newValue)
    // console.log(event.target);
    
    setValue(newValue);
  };

  const filterByCatId = (id) =>{
    setPopularProductsData([])
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) =>{
      console.log(res);
      if(res?.error === false){
        setPopularProductsData(res?.products)
      }
     
    })
  }
  return (
    <>
    <div  className='min-h-max lg:min-h-[65vh] relative'>
      {
      homeSlidesData?.length!== 0 &&  <HomeSlider data={homeSlidesData}/>
    }
    {/* <BannerLoading /> */}
    </div>
    
   

{  context?.catData?.length > 0 && (
    <HomeCatSlider data={context?.catData} />
  )
}
 

    <section className='pt-2 bg-white py-8'>
      <div className="container">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="leftSec w-full lg:w-[40%]">
            <h2 className='text-[14px] sm:text-[14px] md:text-[16px]  lg:text-[22px]  font-[600]'>Popular Products</h2>
            <p className='text-[12px] sm:text-[14px] md:text-[13px]  lg:text-[20px]  font-[400] mt-0 mb-0 '>Do not miss the current offers until the end of March.</p>
          </div>
          <div className="rightSec w-full lg:w-[60%]">
          <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {
          context?.catData?.length !== 0 && context.catData?.map((cat,index)=>{
            return(
              <Tab label={cat?.name} onClick={() => filterByCatId(cat?._id)}/>
            )
          })
        }
      </Tabs>
          </div>
        </div>

<div className='min-h-[60vh]'>
    {
    popularProductsData?.length === 0 &&  <ProductLoading />
}
{
  popularProductsData?.length !== 0 &&  <ProductsSlider items={6} data={popularProductsData}/>
}
</div>
       
      </div>
    </section>

    <section className='py-6 pt-0 bg-white'>
      <div className="container flex flex-col lg:flex-row  gap-5">
        <div className="part1 w-full lg:w-[70%]">
        <HomeBannerV2 />
        </div>
        <div className="part2 w-full lg:w-[30%] flex items-center gap-5 justify-between flex-row lg:flex-col">
        {/* <BannerBoxV2 info="left" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"}/>
        <BannerBoxV2 info="right" image={"https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"}/>  */}

        <BannerBoxV2 info={bannerV1Data[bannerV1Data?.length - 1]?.alignInfo} 
        image={bannerV1Data[bannerV1Data?.length - 1]?.images[0]} item={bannerV1Data[bannerV1Data?.length -1]}/>

         <BannerBoxV2 info={bannerV1Data[bannerV1Data?.length - 2]?.alignInfo} 
        image={bannerV1Data[bannerV1Data?.length - 2]?.images[0]} item={bannerV1Data[bannerV1Data?.length -2]}/>
        </div>
      </div>
    </section>

    <section className="py-16  bg-white mt-5 ">
      <div className="container">
        <div className="freeShippingw-[80%] m-auto p-4 py-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7">
          <div className="col1 flex items-center gap-4">
          <LiaShippingFastSolid  className='text-[50px]'/>
          <span className='text-[20px] font-[600] uppercase'>Free Shipping</span>
          </div>

          <div className="col2">
            <p className='mb-0 font-[500]'>Free Delivery Now On Your First Order and over $200</p>

          </div>
          <p className="font-bold text-[25px]">- Only Rs.200*</p>
        </div>
{
  bannerV1Data?.length !== 0 &&   <AdsBannerSliderV2 items={4} data={bannerV1Data}/>
}
     </div>
    </section>

    <section className="py-5  pt-0 bg-white">
      <div className="container">
      <h2 className='text-[20px] font-[600]'>Latest Products</h2>

      {
        productsData.length === 0 && <ProductLoading/>
      }
      { productsData && productsData.length > 0 ? (
  <ProductsSlider items={6} data={productsData} />
) : (
  <p>No latest products found.</p>
)}


      <AdsBannerSlider items={3} />
      </div>
    </section>

    <section className="py-5  pt-0 bg-white">
      <div className="container">
      <h2 className='text-[20px] font-[600]'>Featured Products</h2>

      {
        featuredProducts.length === 0 && <ProductLoading />
      }
      {featuredProducts && featuredProducts.length > 0 ? (
  <ProductsSlider items={6} data={featuredProducts} />
) : (
  <p>No Featured products found.</p>
)}


      <ProductsSlider items={5}/>
      <AdsBannerSlider items={3} />
      </div>
    </section>

{
  blogData?.length !== 0 && 
    <section className="py-5 pb-8 pt-0 bg-white blogSection">
      <div className="container">
      <h2 className='text-[20px] font-[600] mb-4'>From the Blogs</h2>
         <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  navigation={true}
                  modules={[Navigation]}
                  className="blogSlider"
                > {
                  blogData?.map((item,index) =>{
return(
    <SwiperSlide key={index}>
                    <BlogItem item={item}/>
                  </SwiperSlide>
)
                  })
                }
                </Swiper>
      </div>

    </section>
}

  

    <Footer />
    </>
  )
}

export default Home;
