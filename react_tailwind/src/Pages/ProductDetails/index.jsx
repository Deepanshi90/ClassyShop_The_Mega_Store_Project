import React, { useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ProductZoom } from "../../components/ProductZoom";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { QtyBox } from '../../components/QtyBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import ProductsSlider from '../../components/ProductsSlider';
import  {ProductDetailsComponents}  from '../../components/ProductDetails';

const ProductDetails = () => {

  const [ activeTab ,setActiveTab] = useState(0);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" className='link transition !text-[14px]'>
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Fashion
            </Link>

            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>


      <section className="bg-white py-5">
        <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[40%] ">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%] pr-10 pl-10">
<ProductDetailsComponents  />


          </div>
        </div>

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(0)}>Description</span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(1)}>Product Details</span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 2 && 'text-[#ff5252]'} `} onClick={() =>setActiveTab(2)}>Reviews</span>
          </div>

          {
            activeTab === 0 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
            <p>Symbol of lightness and delicacy, the hummingbird evokes curiosity and joy. Studio Design' PolyFaune collection features classic products with colorful patterns, inspired by the traditional japanese origamis. To wear with a chino or jeans. The sublimation textile printing process provides an exceptional color rendering and a color, guaranteed overtime.</p>

              <h4>The standard Lorem Ipsum passage, used since the 1500</h4>

              <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which has since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance.</p>

              <h4>Contrary to popular belief, Lorem Ipsum is not simply random text.</h4>

              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

              <h4>Contrary to popular belief, Lorem Ipsum is not simply random text.</h4>

              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

              <h4>Contrary to popular belief, Lorem Ipsum is not simply random text.</h4>

              <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

          </div>
            )
          }

          {
            activeTab === 1 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
<div class="relative overflow-x-auto">
  <table class="w-full text-sm text-left text-black bg-white">
    <thead class="text-xs text-black uppercase bg-gray-100">
      <tr>
        <th scope="col" class="px-6 py-3">
          Product name
        </th>
        <th scope="col" class="px-6 py-3">
          Color
        </th>
        <th scope="col" class="px-6 py-3">
          Category
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">
          Silver
        </td>
        <td class="px-6 py-4">
          Laptop
        </td>
        <td class="px-6 py-4">
          $2999
        </td>
      </tr>
      <tr class="bg-white border-b border-gray-200">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Microsoft Surface Pro
        </th>
        <td class="px-6 py-4">
          White
        </td>
        <td class="px-6 py-4">
          Laptop PC
        </td>
        <td class="px-6 py-4">
          $1999
        </td>
      </tr>
      <tr class="bg-white">
        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
          Magic Mouse 2
        </th>
        <td class="px-6 py-4">
          Black
        </td>
        <td class="px-6 py-4">
          Accessories
        </td>
        <td class="px-6 py-4">
          $99
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
            )
          }
          
          {
            activeTab === 2 && 
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
            <div className="w-full productReviewContainer">
              <h2 className='text-[18px]'>Customer Question and answers</h2>

              <div className="reviewScroll pr-5 w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5">
                <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s" alt="testi-1"  className='w-full '/>
                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>Rinku Verma</h4>
                      <h5 className='text-[13px] mb-0'> 2025-10-01</h5>
                      <p className='mt-0 mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo hic blanditiis explicabo suscipit vel esse soluta aperiam odit. Est porro nisi rem mollitia!</p>
                    </div>
                  </div>
                  <Rating name="size-medium" defaultValue={4} readOnly/>
                </div>

                <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s" alt="testi-1"  className='w-full '/>
                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>Rinku Verma</h4>
                      <h5 className='text-[13px] mb-0'> 2025-10-01</h5>
                      <p className='mt-0 mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo hic blanditiis explicabo suscipit vel esse soluta aperiam odit. Est porro nisi rem mollitia!</p>
                    </div>
                  </div>
                  <Rating name="size-medium" defaultValue={4} readOnly/>
                </div>

                <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s" alt="testi-1"  className='w-full '/>
                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>Rinku Verma</h4>
                      <h5 className='text-[13px] mb-0'> 2025-10-01</h5>
                      <p className='mt-0 mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo hic blanditiis explicabo suscipit vel esse soluta aperiam odit. Est porro nisi rem mollitia!</p>
                    </div>
                  </div>
                  <Rating name="size-medium" defaultValue={4} readOnly/>
                </div>


                <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s" alt="testi-1"  className='w-full '/>
                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>Rinku Verma</h4>
                      <h5 className='text-[13px] mb-0'> 2025-10-01</h5>
                      <p className='mt-0 mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo hic blanditiis explicabo suscipit vel esse soluta aperiam odit. Est porro nisi rem mollitia!</p>
                    </div>
                  </div>
                  <Rating name="size-medium" defaultValue={4} readOnly/>
                </div>

                <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFvMZo1QSlAqX5ev0feXSZX-6zVLoPYffzQ&s" alt="testi-1"  className='w-full '/>
                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>Rinku Verma</h4>
                      <h5 className='text-[13px] mb-0'> 2025-10-01</h5>
                      <p className='mt-0 mb-0'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo hic blanditiis explicabo suscipit vel esse soluta aperiam odit. Est porro nisi rem mollitia!</p>
                    </div>
                  </div>
                  <Rating name="size-medium" defaultValue={4} readOnly/>
                </div>
                
              </div>

              <br />

              <div className="reviewForm  bg-[#fafafa] p-4 rounded-md">
                <h2 className='text-[18px]'>Add a review</h2>
                <form className="w-full mt-5">
        <TextField
          id="outlined-multiline-flexible"
          label="Write a Review"
          className='w-full'
          multiline
          rows={5}
        />
        <br />
        <br />
        <Rating name="size-medium" defaultValue={4} />
        <div className="flex items-center mt-5">
          <Button className='btn-org'>Submit Review</Button>
        </div>
                </form>
              </div>
            </div>
            </div>
          }
        </div>


        <div className="container pt-8">
        <h2 className='text-[20px] font-[600] pb-0'>Releated Products</h2>
      <ProductsSlider items={5}/>
        </div>
      </section>



    </>
  )
}


export default ProductDetails;