import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import {RiMenu2Fill} from "react-icons/ri";
import {LiaAngleDownSolid} from "react-icons/lia";
import { Link } from 'react-router-dom';
import {GoRocket} from "react-icons/go"
import CategoryPanel from './CategoryPanel';
import "../Navigation/style.css";
import { fetchDataFromApi } from '../../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../../App';
import MobileNav from './mobileNav';

 const Navigation = (props) => {

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
    const context = useContext(MyContext)
    const openCategoryPanel = () =>{
        setIsOpenCatPanel(true);
    }

    const [catData, setCatData] = useState([]);
    useEffect(() =>{
      setCatData(context?.catData);
    },[context?.catData])

    useEffect(()=>{
setIsOpenCatPanel(props?.isOpenCatPanel)
  },[props?.isOpenCatPanel])

  return (<>
    <nav className='navigation'>
        <div className="container flex items-center justify-start lg:justify-end gap-8">
          {
            context?.windowWidth > 992 &&
  <div className="col_1 w-[20%]">
                <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}>
                  <RiMenu2Fill className='text-[18px]' />Shop By Categories
                <LiaAngleDownSolid  className='text-[13px] ml-auto font-bold '  /></Button>
            </div>
          }
          
            <div className="col_2 w-full lg:w-[60%]">
                <ul className="flex items-center gap-3 nav">
                    <li className='list-none'>
                        <Link to={"/"} className='link transition text-[14px] font-[500]'>
                        <Button className='link transition !font-[500]
                        !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
                          Home</Button></Link>
                    </li>

                    {

                        catData?.length !==0 && catData?.map((cat,index) =>{
                            return(
                                <li className='list-none relative' key={index}>
                                <Link to={"/productListing"} className='link transition text-[14px] font-[500]'>
                                 {/* <Link to={`/productListing/getAllProductsByCatId/catId=${cat?._id}`}  */}
                                <Button className='link transition font-[500]
                                !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
                                    {cat.name}
                                    </Button></Link>
        {
            cat?.children?.length !== 0 &&   <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
            <ul>

                {
                    cat?.children?.map((subCat,index_) =>{
return(
    <li className="list-none"><Link to="/productListing" className='w-full' key={index_} >
    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]' >
        {subCat?.name}
        </Button>
{
    subCat?.children?.length !== 0 && 
    <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">

        <ul>
            {
                subCat?.children?.map((thirdLevelCat,index__) =>{
return(
    <li className="list-nonew-full" key={index__}> 
    <Link to="/productListing" className='w-full'>
    <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
        {thirdLevelCat?.name}
    </Button></Link>
</li>
)
                })
            }

        </ul>
    </div>
}
    

        </Link>
</li>
)
                    })
                }
               
            </ul>
        </div>
        }
                              
                            </li>
                            )
                        })
                    }

{/* {catData?.length !== 0 && catData?.map((cat, index) => (
  <li className='list-none relative group' key={index}>
    <Link to="/productListing">
      <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
        {cat.name}
      </Button>
    </Link>

    {cat?.children?.length > 0 && (
      <div className="submenu absolute top-full left-0 bg-white shadow-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
        <ul>
          {cat.children.map((subCat, subIndex) => (
            <li className="relative group/list" key={subIndex}>
              <Link to="/productListing">
                <Button className='w-full !text-left !rounded-none hover:!text-[#ff5252]'>
                  {subCat.name}
                </Button>
              </Link>

              {subCat.children?.length > 0 && (
                <div className="submenu absolute top-0 left-full bg-white shadow-md invisible group-hover/list:visible opacity-0 group-hover/list:opacity-100 transition-all">
                  <ul>
                    {subCat.children.map((thirdCat, thirdIndex) => (
                      <li key={thirdIndex}>
                        <Link to="/productListing">
                          <Button className='w-full !text-left !rounded-none hover:!text-[#ff5252]'>
                            {thirdCat.name}
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </li>
))} */}
                </ul>
            </div>
            <div className="col_3 w-[20%] hidden lg:block">
                <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0 '><GoRocket className='text-[18px]'/>Free International Delivery
                </p>
            </div>
        </div>
    </nav>
    {/* Category Component Panel */}
    {
        catData?.length !== 0  && 
        <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel}
        propsSetIsOpenCatPanel={props.setIsOpenCatPanel}
        data={catData}
        />
    }

{
  context?.windowWidth <992 &&  <MobileNav />
}
   
   
    </>
  )
}


export default Navigation;