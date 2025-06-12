import { Button } from '@mui/material';
import React, { useState, PureComponent, useContext, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";

import { FaPlus } from "react-icons/fa6";
import { FaAngleUp } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import { FaAngleDown } from 'react-icons/fa6';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from "react-icons/go";
import TooltipMUI from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { BiExport } from "react-icons/bi";
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils Copy/api';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
  { id: 'image', label: 'Image', minWidth: 250 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


const BannerV1List = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const context = useContext(MyContext);

  const [slidesData, setSlidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedIds ,setSortedIds] = useState([]);

  const getData = () =>{
    fetchDataFromApi("/api/bannerV1").then((res) => {
      // console.log(res?.data);
      let arr = [];
      if (res?.error === false) {
        for(let i =0 ; i< res?.data?.length ; i++){
          arr[i] = res?.data[i];
          arr[i].checked = false;
          console.log(arr[i]);
          
        }
        setTimeout(() =>{
          setSlidesData(arr);
          setIsLoading(false)
        // console.log(productArr);
        },500)
        
        // setTimeout(() =>{
        //   console.log(slidesData);
          
        // },3000)
      }
    
    })             
  }

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
  
    // Update all items' checked status
    const updatedItems = slidesData.map((item) => ({
        ...item,
        checked: isChecked,
    }));
    setSlidesData(updatedItems);
    // console.log(updatedItems);
    
  
    // Update the sorted IDs state
    if (isChecked) {
        const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
        // console.log(ids);
        setSortedIds(ids);
    } else {
        setSortedIds([]);
    }
  };
  
  
  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = slidesData.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
    );
    setSlidesData(updatedItems);
  
    // Update the sorted IDs state
    const selectedIds = updatedItems
        .filter((item) => item.checked)
        .map((item) => item._id)
        .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  
    // console.log(selectedIds);
  };

   const deleteMultipleProduct = () => {
      console.log(sortedIds);
      
      if (sortedIds.length === 0) {
          context.alertBox('error', 'Please select items to delete.');
          return;
      }
  
      console.log(sortedIds);
  
      try {
          deleteMultipleData('/api/bannerV1/deleteMultiple', {
              data: { ids: sortedIds },
          }).then((res) => {
              console.log(res);
              getData();
              context.alertBox("success",res?.data?.message);
          });
      } catch (error) {
          context.alertBox('error', 'Error deleting items.');
      }
  };


  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel])

   const deleteSlide = (id) => {
      deleteData(`/api/bannerV1/${id}`).then((res) => {
        // getProducts();
        // console.log(res);
        context.alertBox("success", res?.message || "Slide Deleted Successfully ");
        getData();
  
      })
      setSlidesData(res?.data);
    }

  //  const context= useContext(MyContext);
  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }

  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [categoryFilterVal, setcategoryFilterVal] = useState('');

  const handleChangeCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };


  return (
    <>
      {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">

        <h1 className='font-[700] text-[20px] text-gray-800 '>Banners List</h1>

        <div className="col w-[25%] ml-auto flex items-center gap-3 justify-end">

           {
                      sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm' size='small' color='error' onClick={deleteMultipleProduct}>Delete</Button>
                    } */}
          {/* <Button className='btn-blue !bg-green-600 btn-sm btn flex items-center gap-2'><BiExport />Export</Button> */}
          {/* <Button className='btn-blue btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: 'Add BannerV1'
          })}>Add BannerV1</Button>
        </div>
      </div> */}

      <div className="card bg-white shadow-md rounded-md p-5 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
  <h1 className="font-[700] text-[20px] text-gray-800 text-center sm:text-left w-full sm:w-auto">
    Banners List
  </h1>

  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 justify-end ml-auto">
    {
      sortedIds?.length !== 0 && (
        <Button
          variant='contained'
          className='btn-sm'
          size='small'
          color='error'
          onClick={deleteMultipleProduct}
        >
          Delete
        </Button>
      )
    }

    {/* <Button className='btn-blue !bg-green-600 btn-sm btn flex items-center gap-2'><BiExport />Export</Button> */}

    <Button
      className='btn-blue btn-sm w-full sm:w-auto'
      onClick={() =>
        context.setIsOpenFullScreenPanel({
          open: true,
          model: 'Add BannerV1',
        })
      }
    >
      Add BannerV1
    </Button>
  </div>
</div>


      <div className="card my-4 shadow-md sm:rounded-lg bg-white">

        <div class="relative overflow-x-auto mt-5 pb-5">
          <table class="w-full text-sm text-left text-black bg-white" >
            <thead class="text-xs text-black uppercase bg-gray-100" >
              <tr>
                <th scope="col" className="px-6 py-3 pr-0 w-[10%]">
                  <div className="w-[60px]">
 <Checkbox {...label} size='small' onChange={handleSelectAll} 
                    checked={slidesData?.length >0 ? slidesData.every((item ) => item.checked) : false }
                    />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  Image
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              {
                slidesData?.length !== 0 && slidesData?.map((item,index) =>{
                  return(
                    <tr className="odd:bg-white odd:dark:bg-gray-50 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-300">
                 
                    <td className="px-6 pr-0 py-2">
                      <div className="w-[60px]">
                       <Checkbox {...label} size='small'  checked={item.checked === true ? true : false}
                                                onChange={(e) => handleCheckboxChange(e,item._id,index)}
                                                />
                      </div>
                    </td>
    
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-4 w-[130px] md:w-[200px]">
                        <div className="img w-full rounded-md overflow-hidden group">
                            <img src={item.images} alt="image1" className='w-full group-hover:scale-105 transition-all' />
                        </div>
    
                      </div>
                    </td>
    
                    <td className="px-6 py-2">
                      <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                          <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]'  onClick={() => context?.setIsOpenFullScreenPanel({
                open: true,
                model:'Edit BannerV1', id: item?._id
            })} >
                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7) !text-[20px] ' /></Button>
                        </TooltipMUI>
    
                        <TooltipMUI title="Remove Product" placement="top">
                          <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' onClick={() => deleteSlide(item?._id)} >
                            <GoTrash className='text-[rgba(0,0,0,0.7) !text-[18px] ' /></Button>
                        </TooltipMUI>
                      </div>
                    </td>
    
                  </tr>
                  )
                })
              
}
            </tbody>
          </table>
        </div>


        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* <div className="flex items-center justify-end pt-5 pb-5 px-4">
        <Pagination count={10} color="primary" />
        </div> */}

      </div>
    </>
  )

}


export default BannerV1List;