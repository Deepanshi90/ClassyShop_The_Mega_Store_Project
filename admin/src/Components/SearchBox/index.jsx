import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
const SearchBox = (props) => {

  const [searchQuery,setSearchQuery] = useState('');
  const searchInput = useRef();

  const onChangeInput = (e) =>{
    setSearchQuery(e.target.value);
    props.setSearchQuery(e.target.value);
    // if(searchInput.current.value === ''){
    //   // console.log(a);
    //   // props.setPageOrder(1);
      
    // }
  }

  return (
    <div className="w-full h-auto  bg-[#f1f1f1] relative overflow-hidden">
        <IoSearch  className='absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80'/>
        <input type="text" className='w-full h-[40px] bg-[#f1f1f1] p-2 focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.5)] pl-8 rounded-md text-[13px]' placeholder='Search here ...' value={searchQuery} ref={searchInput} onChange={onChangeInput}/>
    </div>
  )
}


export default SearchBox;