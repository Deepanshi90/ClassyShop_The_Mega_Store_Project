import React ,{useContext, useState} from 'react'
import { Button } from '@mui/material';
import { BsFillBagCheckFill } from "react-icons/bs"
import MyListItems from './MyListItems';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

const MyList = () => {
   const context = useContext(MyContext);

    return (

        <section className="py-10 w-full ">
        <div className="container flex gap-5">
            <div className="col1 w-[20%]">
                <AccountSidebar />
            </div>

            <div className="col2 w-[70%]">
            <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 >My List</h2>
                            <p className='mt-0'>There are <span className='font-bold text-[#ff5252]'>{context?.myListData?.length}</span> products in My List</p>
                        </div>

                        {
                            context?.myListData?.length !== 0 ? context?.myListData?.map((item,index) =>{
return(<MyListItems  item={item}/>)
                            }):
                            <div className="flex items-center justify-center flex-col py-10 px-3">
                                
                                <img src="/emptylist.png" alt="Empty list" className='w-[100px] mb-3'/>
                                <h3 className='mb-3'>My List is currently empty</h3>
                                <Link to='/'>
      <Button className='btn-org btn-sm mt-4' >Continue Shopping</Button>
      </Link>
                            </div>
                        }
                        
                    </div>
            </div>

        </div>
    </section>
    )
}

export default MyList;