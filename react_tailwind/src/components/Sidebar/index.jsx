import React, { useState } from 'react'
import CategoryCollapse from '../CategoryCollapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Collapse } from 'react-collapse';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import RangeSlider from "react-range-slider-input";
import 'react-range-slider-input/dist/style.css';
import Rating from "@mui/material/Rating";

import "../Sidebar/style.css"
import { Button } from '@mui/material';
 const Sidebar = () => {

  const [isOpeenCategoryFilter, setIsOpeenCategoryFilter] = useState(true);
  const [isOpeenAvailFilter, setIsOpeenAvailFilter] = useState(true);
  const [isOpeenSizeFilter, setIsOpeenSizeFilter] = useState(true);
  return (
    <aside className='sidebar py-5'>
        <div className="box">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Shop By Category
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=>setIsOpeenCategoryFilter(!isOpeenCategoryFilter)}>
                {
                  isOpeenCategoryFilter ===true ? <FaAngleUp /> : <FaAngleDown />
                }
                
              </Button>
            </h3>
            {/* <CategoryCollapse /> */}
            <Collapse isOpened={isOpeenCategoryFilter} >
            <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size='small'/>} label="Fashion" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Electronics" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Bags" className='w-full' />
            <FormControlLabel control={<Checkbox size='small'/>} label="Footwear" className='w-full' />
            <FormControlLabel control={<Checkbox size='small'/>} label="Groceries" className='w-full' />
            <FormControlLabel control={<Checkbox size='small'/>} label="Beauty" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small'/>} label="Wellness" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small'/>} label="Jewellery" className='w-full'/>
            </div>
            </Collapse>
        </div>

        <div className="box">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Availability
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=>setIsOpeenAvailFilter(!isOpeenAvailFilter)}>
                {
                  isOpeenAvailFilter ===true ? <FaAngleUp /> : <FaAngleDown />
                }
                
              </Button>
            </h3>
            {/* <CategoryCollapse /> */}
            <Collapse isOpened={isOpeenAvailFilter} >
            <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size='small'/>} label="Availiable (17)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="In Stock (10)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Not Availiable (1)" className='w-full' />
            </div>
            </Collapse>
        </div>

        <div className="box mt-3">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Availability
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=>setIsOpeenSizeFilter(!isOpeenSizeFilter)}>
                {
                  isOpeenSizeFilter ===true ? <FaAngleUp /> : <FaAngleDown />
                }
                
              </Button>
            </h3>
            {/* <CategoryCollapse /> */}
            <Collapse isOpened={isOpeenSizeFilter} >
            <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size='small'/>} label="Small (17)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Medium (10)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Large (1)" className='w-full' />
            <FormControlLabel control={<Checkbox size='small' />} label="XL (1)" className='w-full' />
            <FormControlLabel control={<Checkbox size='small' />} label="XXL (1)" className='w-full' />
            </div>
            </Collapse>
        </div>

        <div className="box mt-4 ">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Filter By Price
              
            </h3>
            <RangeSlider />
            <div className="flex pt-4 pb-2 priceRange">
              <span className='text-[13px]'>
                From: <strong className='text-dark'>Rs:{100}</strong>
              </span>
              <span className='ml-auto text-[13px]'>
                From: <strong className='text-dark'>Rs:{5000}</strong>
              </span>
            </div>
            </div>

            <div className="box mt-4 ">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Filter By Rating
            </h3>
               <div className="w-full">
                 <Rating name='size-small' defaultValue={5} size='small' readonly/>
               </div>
               <div className="w-full">
                 <Rating name='size-small' defaultValue={4} size='small' readonly/>
               </div>
               <div className="w-full">
                 <Rating name='size-small' defaultValue={3} size='small' readonly/>
               </div>
               <div className="w-full">
                 <Rating name='size-small' defaultValue={2} size='small' readonly/>
               </div>
               <div className="w-full">
                 <Rating name='size-small' defaultValue={1} size='small' readonly />
               </div>
            </div>
    </aside>

  )
}

export default Sidebar;