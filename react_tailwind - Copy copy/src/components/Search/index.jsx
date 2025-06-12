import React from 'react'
import "../Search/style.css";
import Button from '@mui/material/Button';
import {IoSearch} from "react-icons/io5"
import { useState } from 'react';
import { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


import { fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
 const Search = () => {

     const history = useNavigate();
     const [searchQuery, setSearchQuery] = useState("");
     const [isLoading,setIsLoading] = useState(false)
    //  const [searchData,setSeachData] = useState([]);
const context = useContext(MyContext)

     // const onChangeInput = (e) =>{
     //      setSearchQuery(e.target.value);

     //      if(e.target.value !== ""){
     //           fetchDataFromApi(`/api/product/search/get/q=${e.target.value}`).then((res) =>{
     //                console.log(res);
                    
     //           })
     //      }
     // }

     

     const onChangeInput = (e) => {
  const value = e.target.value;
  setSearchQuery(value);


};

const search = () => {
  setIsLoading(true);
    const obj = {
     query: searchQuery
}

  if (searchQuery !== "") {
    // const obj = { query: value };
    postData(`/api/product/search/get`,obj).then((res) => {
      // console.log(res);
     //  setSeachData(res?.product || []); // ✅ Fix here
      context?.setSearchData(res);
      setTimeout(() =>{
        setIsLoading(false);
        context?.setOpenSearchPanel(false)
       history('/search');
      },1000)
    });
  }
  // console.log(context?.setSearchData);
  
  // context?.setSearchData(context?.searchData); // Now only passing the array of products
};



//      const onChangeInput = (e) => {
//   const value = e.target.value;
//   setSearchQuery(value);

//   if (value !== "") {
// //     fetchDataFromApi(`/api/product/search/get?q=${value}`).then((res) => {
// //       console.log(res);

// //       // Optionally pass data to context or parent component
// //     });
// const obj = {
//      query: e.target.value
// }
//  postData(`/api/product/search/get`,obj).then((res) => {
//       console.log(res);
//      //  context?.setSearchData(res)
//      // setSeachData(res)
//      setSeachData(res?.product || []);
      
//       // Optionally pass data to context or parent component
//     });
//   }
// };

// const search = () =>{
//       context?.setSearchData(searchData);
//       setTimeout(() =>{
//  history('/search');
//       },500)
    
// }
  return (
   <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
        <input type='text' placeholder='Search for Products'  className='w-100 h-[35px] focus:outline-none bg-inherit p-2 text-15px' 
        value={searchQuery} onChange={onChangeInput}/>
        <Button className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black' onClick={search}>
          {
            isLoading === true ?  <CircularProgress /> :
  <IoSearch className='text-[#4e4e4e] tect-[22px]' />
          }
         
        </Button>
   </div>
  )
}


export default Search;