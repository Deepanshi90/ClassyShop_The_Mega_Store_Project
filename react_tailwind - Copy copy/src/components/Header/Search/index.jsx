// import React from 'react'
// import "../Search/style.css";
// import Button from '@mui/material/Button';
// import {IoSearch} from "react-icons/io5"
// import { useState } from 'react';
// import { useContext } from 'react';
// // import { MyContext } from '../../App';
// import { fetchDataFromApi, postData } from '../../utils/api';
//  const Search = () => {

//      const [searchQuery, setSearchQuery] = useState("");
// // const context = useContext(MyContext)

//      const onChangeInput = (e) =>{
//           setSearchQuery(e.target.value);

//           if(e.target.value !== ""){
//                fetchDataFromApi(`/api/product/search/get/q=${e.target.value}`).then((res) =>{
//                     console.log(res);
                    
//                })
//           }
//      }


//   return (
//    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
//         <input type='text' placeholder='Search for Products'  className='w-100 h-[35px] focus:outline-none bg-inherit p-2 text-15px' value={searchQuery} onChange={onChangeInput}/>
//         <Button className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black'><IoSearch className='text-[#4e4e4e] tect-[22px]'/></Button>
//    </div>
//   )
// }


// export default Search;