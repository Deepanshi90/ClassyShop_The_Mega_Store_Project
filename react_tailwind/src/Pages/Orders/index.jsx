import React, { useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import MyListItems from '../MyList/MyListItems';
import { Button } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import { Collapse } from 'react-collapse';
import { FaAngleUp } from 'react-icons/fa6';

const Orders = () => {

    const [isOpenOrderdProduct , setIsOpenOrderdProduct ] = useState(null);

    const isShowOrderdProduct =(index) =>{
        if(isOpenOrderdProduct === index){
            setIsOpenOrderdProduct(null);
        }else{
            setIsOpenOrderdProduct(index);
        }
       
    }
    return (
        <section className="py-10 w-full ">
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSidebar />
                </div>

                <div className="col2 w-[80%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 >My List</h2>
                            <p className='mt-0'>There are <span className='font-bold text-[#ff5252]'>2</span> orders</p>

                            <div class="relative overflow-x-auto mt-5">
                                <table class="w-full text-sm text-left text-black bg-white">
                                    <thead class="text-xs text-black uppercase bg-gray-100">
                                        <tr>
                                        <th scope="col" class="px-6 py-3">
&nbsp;
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap ">
                                                Order Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Payment Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Phone Number
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Address
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                PinCode
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Total Amount
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Email
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                               User ID
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                               Order Status
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderdProduct(0)}>
                                                {
                                                    isOpenOrderdProduct === 0 ?  <FaAngleUp className='text-[16x] text-[rgba(0,0,0,0.7)]' /> :  <FaAngleDown className='text-[16x] text-[rgba(0,0,0,0.7)]' />
                                                }
                                           </Button> 
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252]'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252]'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'>jfhuebfjcdbjvbsm, vmjdbvhefkcndsmbcvkjvedjnvmd mdhsgdhnk chvas</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252] '>34567890</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <Badge status="pending"/>
                                            </td>
                                            <td class="px-6 py-4 font-[500] whitespace-nowrap">
                                                $2999
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderdProduct === 0 &&  (
                                                <tr>
                                            <td className='pl-20' colSpan={6}>
                                            <div className="col2 w-[80%]">
                            <div class="relative overflow-x-auto ">
                                <table class="w-full text-sm text-left text-black bg-white">
                                    <thead class="text-xs text-black uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap ">
                                                Product Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Product Title
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Quantity
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >A Watch</span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-medium_default/brown-bear-printed-sweater.jpg" alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                2
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            
                                        </tr>
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >A Watch</span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-medium_default/brown-bear-printed-sweater.jpg" alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                2
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                                            </td>
                                        </tr>
                                            )
                                        }
                                        
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderdProduct(1)}>
                                                {
                                                    isOpenOrderdProduct === 1 ?  <FaAngleUp className='text-[16x] text-[rgba(0,0,0,0.7)]' /> :  <FaAngleDown className='text-[16x] text-[rgba(0,0,0,0.7)]' />
                                                }
                                           </Button> 
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252]'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252]'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'>jfhuebfjcdbjvbsm, vmjdbvhefkcndsmbcvkjvedjnvmd mdhsgdhnk chvas</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#ff5252] '>34567890</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <Badge status="pending"/>
                                            </td>
                                            <td class="px-6 py-4 font-[500] whitespace-nowrap">
                                                $2999
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderdProduct === 1 &&  (
                                                <tr>
                                            <td className='pl-20' colSpan={6}>
                                            <div className="col2 w-[80%]">
                            <div class="relative overflow-x-auto ">
                                <table class="w-full text-sm text-left text-black bg-white">
                                    <thead class="text-xs text-black uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap ">
                                                Product Id
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Product Title
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Quantity
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Price
                                            </th>
                                            <th scope="col" class="px-6 py-3 whitespace-nowrap">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >A Watch</span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-medium_default/brown-bear-printed-sweater.jpg" alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                2
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            
                                        </tr>
                                        <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>23456789</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >A Watch</span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/32-medium_default/brown-bear-printed-sweater.jpg" alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                2
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                $2999
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                                            </td>
                                        </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </section>
    )
}

export default Orders;