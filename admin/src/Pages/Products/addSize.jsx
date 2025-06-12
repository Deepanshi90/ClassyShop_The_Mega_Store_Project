import { Button, Checkbox, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from 'react-icons/go';
import TooltipMUI from '@mui/material/Tooltip';
import { use } from 'react';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils Copy/api';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const AddSize = () => {
    const [isLoading , setIsLoading] = useState(false);

    // const [formFields, setFormFields] = useState({
    //        name: "",})

    const [name, setName] = useState();
const [data,setData] = useState([]);
const [editId , seteditId] = useState('');
    const context = useContext(MyContext);

useEffect(() =>{
  getData();
},[])

const  getData = () =>{
  fetchDataFromApi("/api/product/productSize/get").then((res) =>{
    console.log(res);
    if(res?.error === false){
      setData(res?.data);
    }
  })
}

    const handleSubmit = (e) =>{
        e.preventDefault();
setIsLoading(true)
        if(name === ""){
            context.alertBox("error","Please enter product RAM");
            return false;
        }

if(editId === "" ){
  postData("/api/product/productSize/create",{
    name: name
}).then((res) =>{
  if(res?.error === false){
// console.log(res);
setIsLoading(false);
getData();
context.alertBox("success",res?.message)  
setName("")
  }else{
    setIsLoading(false);
    context.alertBox("error",res?.message)  
   
  }
             
})
}

if(editId !== "") {
  editData(`/api/product/productSize/${editId}`,{
    name: name
}).then((res) =>{
  if(res?.data?.error === false){
    context.alertBox("success",res?.data?.message)  
// console.log(res?.data?.message);
setTimeout(() =>{
  setIsLoading(false);
  getData();
  setName("")
  seteditId("");
},[300])

  }else{
    setIsLoading(false);
    context.alertBox("error",res?.data?.message)  
   
  }
             
})
}        
    }

    const deleteItem = (id) => {
      deleteData(`/api/product/productSize/${id}`).then((res) => {
        getData();
        // console.log(res);
        context.alertBox("success", res?.message || "Item Deleted Successfully ");
  
      })
    }

    const editItem = (id) =>{
      fetchDataFromApi(`/api/product/productSize/${id}`).then((res) =>{
        console.log(res);
        setName(res?.data?.name)
        seteditId(res?.data?._id);
      })
    }
    return (<>
        {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">

            <h1 className='font-[700] text-[20px] text-gray-800 '> Add Product Size</h1>
        </div> */}
        <div className="card bg-white shadow-md rounded-md px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-[100%] sm:w-[100%] lg:w-[65%] ">
  <h1 className="font-bold text-[18px] sm:text-[20px] text-gray-800">
    Add Product Size
  </h1>
</div>


        <div className="card my-4 pb-5 shadow-md sm:rounded-lg bg-white w-[100%] sm:w-[100%] lg:w-[65%]">
                <form className="form py-3 p-6 " onSubmit={handleSubmit}>
                    <div className="col mb-4">
                        <h3 className="text-[14px] font-[500] mb-1">Product Weight</h3>
                        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name='name' onChange={(e) =>setName(e.target.value)} value={name}/>
                    </div>

                      <Button type='submit' className='btn-blue  btn-lg w-full  flex gap-2'><FaCloudUploadAlt className="text-[25px] text-white" />
                                        {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}</Button>

                </form>
            </div>

{
  data?.length !== 0 && 
  <div className="card my-4 pb-5 shadow-md sm:rounded-lg bg-white w-[100%] sm:w-[100%] lg:w-[65%]">
  <div class="relative overflow-x-auto mt-5 pb-5">
<table class="w-full text-sm text-left text-black bg-white" >
  <thead class="text-xs text-black uppercase bg-gray-100" >
    <tr>
      {/* <th scope="col" className="px-6 py-3 pr-0 w-[10%]">
      <div className="w-[60px]">
      <Checkbox {...label} size='small' />
      </div>
      </th> */}
      <th scope="col" class="px-2 py-3 whitespace-nowrap w-[60%] ">
        Product Size 
      </th>
      <th scope="col" class="px-6 py-3 whitespace-nowrap w-[30%]">
        ACTION
      </th>

    </tr>
  </thead>

  <tbody>
{
  data?.map((item,index) =>{
    return(
      <tr className="odd:bg-white odd:dark:bg-gray-50 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-300" key={index}>
      {/* <td className="px-6 pr-0 py-2">
          <div className="w-[60px]">
          <Checkbox {...label} size='small'/>
          </div>
          </td> */}
    
          <td className="px-6 py-2">
            <span className='font-[600]'>{item?.name}</span>
          </td>
    
          <td className="px-6 py-2">
            <div className="flex items-center gap-2">
            <TooltipMUI title="Edit Product" placement="top"> 
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' onClick={() => editItem(item?._id)} >
                <AiOutlineEdit className='text-[rgba(0,0,0,0.7) !text-[20px] '/></Button>
                </TooltipMUI>
    
                <TooltipMUI title="Remove Product" placement="top"> 
                <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' onClick={() => deleteItem(item?._id)}>
                <GoTrash className='text-[rgba(0,0,0,0.7) !text-[18px] '/></Button>
                </TooltipMUI>
            </div>
          </td>
      </tr>  
    )
  })
}
            
  </tbody>
</table>
</div></div> 
}
          
    </>
    )
}


export default AddSize;