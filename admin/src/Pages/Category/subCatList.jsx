import { Button } from '@mui/material';
import React, { useState, PureComponent, useContext, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaAngleDown, FaAngleUp, FaRegEye } from 'react-icons/fa6';
import { GoTrash } from "react-icons/go";
import TooltipMUI from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import { BiExport } from "react-icons/bi";
import { MyContext } from '../../App';
import Chip from '@mui/material/Chip';
import EditSubCatBox from './EditSubCatBox';

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


const SubCategoryList = () => {
  //  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const context = useContext(MyContext);
  //   const isShowOrderdProduct = (index) => {
  //     if (isOpenOrderdProduct === index) {
  //       setIsOpenOrderdProduct(null);
  //     } else {
  //       setIsOpenOrderdProduct(index);
  //     }

  //   }

  //       useEffect(() =>{
  //         fetchDataFromApi("/api/category").then((res) => {
  //           context.setCatData(res?.data);
  //         });
  //       },[context?.IsOpenFullScreenPanel])


  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  //   const [categoryFilterVal, setcategoryFilterVal] = useState('');

  //   const handleChangeCatFilter = (event) => {
  //     setcategoryFilterVal(event.target.value);
  //   };

  const [isOpen, setIsOpen] = useState(0);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen);
    }
    else {
      setIsOpen(index);
    }
  }

  return (
    <>
      {/* <div className="card bg-white shadow-md rounded-md p-5 flex items-center justify-between">

        <h1 className='font-[700] text-[20px] text-gray-800 '> Sub Category List</h1>

        <div className="col w-[30%] ml-auto flex items-center gap-3 justify-end">
          <Button className='btn-blue !bg-green-600 btn-sm btn flex items-center gap-2'><BiExport />Export</Button>
          <Button className='btn-blue btn-sm' onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: 'Add New Sub Category'
          })}>Add New Sub Category</Button>
        </div>
      </div> */}
      <div className="card bg-white shadow-md rounded-md p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <h1 className="font-bold text-[20px] text-gray-800">Sub Category List</h1>

  <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-auto md:justify-end">
    {/* <Button className="btn-blue !bg-green-600 btn-sm flex items-center gap-2 w-full sm:w-auto">
      <BiExport />
      Export
    </Button> */}
    <Button
      className="btn-blue btn-sm w-full sm:w-auto"
      onClick={() =>
        context.setIsOpenFullScreenPanel({
          open: true,
          model: "Add New Sub Category",
        })
      }
    >
      Add New Sub Category
    </Button>
  </div>
</div>


      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {
          context?.catData?.length !== 0 &&
          <ul className="w-full">
            {
              context?.catData?.map((firstLevelCat, index) => {
                return (
                  <li className="w-full mb-1" key={index}>
                    <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                      <span className="font-[500]  flex items-center gap-4 text-[14px]">
                        {firstLevelCat?.name}
                      </span>

                      <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto ' onClick={() => expend(index)}>{isOpen === index ? <FaAngleUp/> : <FaAngleDown />}</Button>
                    </div>

                    {
                      isOpen === index &&
                      <>
                       {
                        firstLevelCat?.children?.length !== 0 &&
                        <ul className="w-full">
                          {
                            firstLevelCat?.children?.map((subCat,index_) =>{
                              return(
                                <li className="w-full py-1" key={index_}>
                                  <EditSubCatBox name={subCat?.name} id={subCat?._id} catData={context?.catData} index={index_} selectedCat={subCat?.parentId} selectedCatName={subCat?.parentCatName}/>

                                  {
                                    subCat?.children?.length !== 0 && 
                                    <ul className="pl-4">
                                      {subCat?.children?.map(
                                        (thirdLevel, index__) =>{
                                          return(
                                            <li key={index__}
                                            className='w-full hover:bg-[#f1f1f1]'>
                                              <EditSubCatBox  name={thirdLevel.name} catData={firstLevelCat?.children} index={index__} 
                                              selectedCat={thirdLevel?.parentId} selectedCatName={thirdLevel?.parentCatName} id={thirdLevel?._id}/>

                                            </li>
                                          )
                                        }
                                      )}
                                    </ul>
                                  }
                                </li>
                              )
                            })
                          }
                        </ul>
                       }
                      </>
                    }
                  </li>
                )
              })
            }
          </ul>
        }

      </div>

      {/* <div className="card my-4 shadow-md sm:rounded-lg bg-white">

        <div class="relative overflow-x-auto mt-5 pb-5">
          <table class="w-full text-sm text-left text-black bg-white" >
            <thead class="text-xs text-black uppercase bg-gray-100" >
              <tr>
                <th scope="col" className="px-6 py-3 pr-0 w-[10%]">
                <div className="w-[60px]">
                <Checkbox {...label} size='small' />
                </div>
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  Category Image
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  Category Name
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                 Sub Category Name
                </th>
                <th scope="col" class="px-6 py-3 whitespace-nowrap">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              <tr className="odd:bg-white odd:dark:bg-gray-50 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-300">
                <td className="px-6 pr-0 py-2">
                <div className="w-[60px]">
                <Checkbox {...label} size='small'/>
                </div>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center gap-4 w-[80px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                    <Link to="/product/45745">
                      <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" alt="image1" className='w-full group-hover:scale-105 transition-all'/></Link>
                    </div>

                  </div>
                </td>

                <td className="px-6 pr-0 py-2">
                <Chip label="Fashion" />
                </td>

                <td className="px-6 pr-0 py-2">
                <div className=" flex items-center gap-3 ">
                <Chip label="Men" color='primary'/>
                <Chip label="Woman" color='primary'/>
                <Chip label="Kids" color='primary'/>
                </div>
                </td>

                <td className="px-6 py-2">
                  <div className="flex items-center gap-1">
                  <TooltipMUI title="Edit Product" placement="top"> 
                    <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' >
                      <AiOutlineEdit className='text-[rgba(0,0,0,0.7) !text-[20px] '/></Button>
                      </TooltipMUI>

                     

                      <TooltipMUI title="Remove Product" placement="top"> 
                      <Button className='!w-[30px] !h-[30px] !min-w-[30px] !bg-[#f1f1f1] !rounded-full !text-[#000] !border !border-[rgba(0,0,0,0.3)] hover:!bg-[rgba(0,0,0,0.4)]' >
                      <GoTrash className='text-[rgba(0,0,0,0.7) !text-[18px] '/></Button>
                      </TooltipMUI>
                  </div>
                </td>
                
              </tr>


              
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

      {/* </div> */}
    </>
  )

}


export default SubCategoryList;


// catData={firstLevelCat?.children} index={index_}