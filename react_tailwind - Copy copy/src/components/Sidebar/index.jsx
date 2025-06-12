import React, { useContext, useEffect, useState } from 'react'
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
import { MyContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';
import { MdOutlineFilterAlt } from 'react-icons/md';
 const Sidebar = (props) => {

  const [isOpeenCategoryFilter, setIsOpeenCategoryFilter] = useState(true);
  const [filters,setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice: '',
    maxPrice: '',
    rating:'',
    page:1,
    // limit:25
     limit:5
  })

  const [price,setPrice] = useState([0,600000]);
const context = useContext(MyContext);

const location = useLocation();

// const handleCheckboxChange = (field,value) =>{

//   const currentValues = filters[field] || []
//   const updatedValues = currentValues?.includes(value) ? 
//   currentValues.filter((item) => item !== value) :
//   [...currentValues,value];


//   setFilters((prev) =>({
//     ...prev,
//     [field]: updatedValues
//   }))
//   if(field === "catId"){
//     setFilters((prev) =>({
//     ...prev,
//    subCatId: [],
//    thirdsubCatId:[],
//   }))
//   }
// }

// useEffect(() =>{
//   const url = window.location.href;
//   const queryParameters = new URLSearchParams(location.search);

//   if(url.includes("catId")){
//     const categoryId = queryParameters.get("catId");
//     const catArr = [];
//     catArr.push(categoryId)
//     filters.catId = catArr;
//     filters.subCatId = [];
//     filters.thirdsubCatId = [];
//      filters.rating = [];
//   }

//    if(url.includes("subCatId")){
//     const subcategoryId = queryParameters.get("subCatId");
//     const subcatArr = [];
//     subcatArr.push(subcategoryId)
//     filters.subCatId = subcatArr;
//     filters.catId = [];
//     filters.thirdsubCatId = [];
//     filters.rating = [];
//   }

//    if(url.includes("thirdsubCatId")){
//     const thirdcategoryId = queryParameters.get("thirdsubCatId");
//     const thirdcatArr = [];
//     thirdcatArr.push(thirdcategoryId)
//    filters.catId = [];
//     filters.subCatId = [];
//     filters.thirdsubCatId = thirdcatArr;
//      filters.rating = [];
//   }

//   filters.page = 1;

//   setTimeout(() =>{
//     filtersData();
//   },200)
// },[location])

const handleCheckboxChange = (field, value) => {

  context?.setSearchData([]);

  const currentValues = filters[field] || [];
  const updatedValues = currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];

  const newFilters = {
    ...filters,
    [field]: updatedValues,
  };

  if (field === 'catId') {
    newFilters.subCatId = [];
    newFilters.thirdsubCatId = [];
  }

  setFilters(newFilters);

  // Construct query parameters
  const query = new URLSearchParams();
  if (newFilters.catId.length === 1) query.set('catId', newFilters.catId[0]);
  if (newFilters.subCatId.length === 1) query.set('subCatId', newFilters.subCatId[0]);
  if (newFilters.thirdsubCatId.length === 1) query.set('thirdsubCatId', newFilters.thirdsubCatId[0]);

  // Update the URL
  navigate({
    pathname: '/productListing',
    search: '?' + query.toString()
  });
};


useEffect(() => {
  const url = window.location.href;
  const queryParameters = new URLSearchParams(location.search);

  let updatedFilters = { ...filters };

  if (url.includes("catId")) {
    updatedFilters = {
      ...updatedFilters,
      catId: [queryParameters.get("catId")],
      subCatId: [],
      thirdsubCatId: [],
      rating: [],
    };
      context?.setSearchData([]);
  }

  if (url.includes("subCatId")) {
    updatedFilters = {
      ...updatedFilters,
      subCatId: [queryParameters.get("subCatId")],
      catId: [],
      thirdsubCatId: [],
      rating: [],
    };
      context?.setSearchData([]);
  }

  if (url.includes("thirdsubCatId")) {
    updatedFilters = {
      ...updatedFilters,
      thirdsubCatId: [queryParameters.get("thirdsubCatId")],
      catId: [],
      subCatId: [],
      rating: [],
    };
      context?.setSearchData([]);
  }

  updatedFilters.page = 1;

  setFilters(updatedFilters);

  setTimeout(() => {
    filtersData();
  }, 200);

  // context?.setSearchData([]);
   
}, [location]);


const filtersData = () =>{
  props.setIsLoading(true);
// console.log("searchData",context?.searchData);

  if(context?.searchData?.products?.length>0){
    props.setProductsData(context?.searchData);
     props.setIsLoading(false);
     props.setTotalPages(context?.searchData?.totalPages);
     window.scrollTo(0,0);
  }
  else{
 postData("/api/product/filters",filters).then((res) =>{
    console.log(res);
    props.setProductsData(res);
     props.setIsLoading(false);
     props.setTotalPages(res?.totalPages);
     window.scrollTo(0,0);
  })
  }
 
}

useEffect(() =>{
  filters.page = props.page;
  filtersData();
},[filters, props.page])

useEffect(() =>{
  setFilters((prev) =>({
    ...prev,
    minPrice:price[0],
    maxPrice: price[1]
  }))
},[])

  return (
    <aside className='sidebar py-3 lg:py-5 static lg:sticky top-[180px] z-[50] pr-0 lg:pr-5'>
      {/* {
        console.log(filters)
      } */}

      <div className="max-h-[60vh]  lg:overflow-hidden  overflow-auto  w-full">
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

              {
                context?.catData?.length !== 0 &&
                context?.catData?.map((item,index) =>{
                  return(
 <FormControlLabel key={index} value={item?._id} control={<Checkbox size='small'/>}
 checked={filters?.catId?.includes(item?._id)}
 label={item?.name}
 onChange={() => handleCheckboxChange('catId',item?._id)}
 className='w-full'/>
                  )
                })
              }
           
            </div>
            </Collapse>
        </div>

        {/* <div className="box">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Availability
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=>setIsOpeenAvailFilter(!isOpeenAvailFilter)}>
                {
                  isOpeenAvailFilter ===true ? <FaAngleUp /> : <FaAngleDown />
                }
                
              </Button>
            </h3>
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
            <Collapse isOpened={isOpeenSizeFilter} >
            <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel control={<Checkbox size='small'/>} label="Small (17)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Medium (10)" className='w-full'/>
            <FormControlLabel control={<Checkbox size='small' />} label="Large (1)" className='w-full' />
            <FormControlLabel control={<Checkbox size='small' />} label="XL (1)" className='w-full' />
            <FormControlLabel control={<Checkbox size='small' />} label="XXL (1)" className='w-full' />
            </div>
            </Collapse>
        </div> */}

        <div className="box mt-4 ">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Filter By Price
              
            </h3>
            <RangeSlider 
            value={price}
            onInput={setPrice}
            min={100}
            max={60000}
            step={50}/>
            <div className="flex pt-4 pb-2 priceRange">
              <span className='text-[13px]'>
                From: <strong className='text-dark'>Rs:{price[0]}</strong>
              </span>
              <span className='ml-auto text-[13px]'>
                From: <strong className='text-dark'>Rs:{price[1]}</strong>
              </span>
            </div>
            </div>

            <div className="box mt-4 ">
            <h3 className=' w-full pr-5 mb-3 text-[16px] font-[600] flex items-center'>Filter By Rating
            </h3>
            <div className="flex items-center pl-2 lg:pl-1 ">
             <FormControlLabel value={5} control={<Checkbox size='small'/>}
 checked={filters?.rating?.includes(5)}

 onChange={() => handleCheckboxChange('rating',5)}
/>
<Rating name='rating' value={5} readOnly size='small' />
</div>


 <div className="flex items-center  pl-2 lg:pl-1">
             <FormControlLabel value={4} control={<Checkbox size='small'/>}
 checked={filters?.rating?.includes(4)}

 onChange={() => handleCheckboxChange('rating',4)}
/>
<Rating name='rating' value={4} readOnly size='small' />
</div>


 <div className="flex items-center pl-2 lg:pl-1">
             <FormControlLabel value={3} control={<Checkbox size='small'/>}
 checked={filters?.rating?.includes(3)}

 onChange={() => handleCheckboxChange('rating',3)}
/>
<Rating name='rating' value={3} readOnly size='small' />
</div>

 <div className="flex items-center pl-2 lg:pl-1">
             <FormControlLabel value={2} control={<Checkbox size='small'/>}
 checked={filters?.rating?.includes(2)}

 onChange={() => handleCheckboxChange('rating',2)}
/>
<Rating name='rating' value={2} readOnly size='small' />
</div>

 <div className="flex items-center pl-2 lg:pl-1">
             <FormControlLabel value={1} control={<Checkbox size='small'/>}
 checked={filters?.rating?.includes(1)}

 onChange={() => handleCheckboxChange('rating',1)}
/>
<Rating name='rating' value={1} readOnly size='small' />
</div>

            </div>

            </div>
<br/>
            <Button className=' btn-org w-full !flex lg:!hidden' onClick={() => context?.setOpenFilter(false)}>
              <MdOutlineFilterAlt size={20} className='gap-3'/>Filters</Button>
    </aside>

  )
}

export default Sidebar;