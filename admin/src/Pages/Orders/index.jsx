import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { FaAngleUp } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import { FaAngleDown } from 'react-icons/fa6';
import SearchBox from '../../Components/SearchBox';
import { useEffect } from 'react';
import { editData, fetchDataFromApi } from '../../utils copy/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { MyContext } from '../../App';


const Orders = () => {
    const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
     const [orders,setOrders] = useState([])
     const [totalOrdersData, setTotalOrderData] = useState([]);
     const [ordersData,setOrdersData] = useState([]);
     
      const [searchQuery,setSearchQuery] = useState('');
          const [orderStatus, setOrderStatus] = useState('');
          const context = useContext(MyContext)

      const isShowOrderdProduct = (index) => {
        if (isOpenOrderdProduct === index) {
          setIsOpenOrderdProduct(null);
        } else {
          setIsOpenOrderdProduct(index);
        }
    
      }

        useEffect(()=>{
              fetchDataFromApi("/api/order/order-list").then((res) =>{
                  console.log(res);
                  if(res?.error === false){
       setOrders(res?.data);
                  }
                 
              })
          },[orderStatus])


            useEffect(()=>{
                          fetchDataFromApi("/api/order/order-list").then((res) =>{
                              console.log(res);
                              if(res?.error === false){
                   setOrders(res?.data);
                              }
                             
                          })
          
                          fetchDataFromApi(`/api/order/order-list`).then((res) =>{
                           
                            if(res?.error === false){
                              setTotalOrderData(res);
                              //  console.log(res);
                            }
                          })
                      },[])
          

          useEffect(() => {
            if (searchQuery.trim() !== "") {
              const filteredOrders = totalOrdersData?.data?.filter((order) =>
                order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order?.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                order?.createdAt?.includes(searchQuery)
              );
              setOrdersData(filteredOrders || []);
            } else {
              fetchDataFromApi(`/api/order/order-list`).then((res) => {
                if (res?.error === false) {
                  setOrders(res);
                  setOrdersData(res?.data || []);
                }
              });
            }
          }, [searchQuery]);


  const handleChange = (event , id) => {
    setOrderStatus(event.target.value);

    const obj = {
      id:id,
      order_status: event.target.value
    }
    editData(`/api/order/order-status/${id}`,obj).then((res) =>{
      console.log(res);
      if(res?.data?.error === false){
        context.alertBox("success",res?.data?.message);
      }

    })
  };

  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
                {/* <div className="flex items-center justify-between px-5 py-5 flex-col sm:flex-row">
          <h2 className='text-[18px] font-[600] w-[75%] text-center md:text-left'>Recent Orders</h2>
          <div className=" w-[75%] md:w-[25%]"><SearchBox searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}/></div>
        </div> */}

<div className="w-full px-5 py-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
  <h2 className="text-[18px] font-semibold w-full sm:w-[75%] text-center sm:text-left">
    Recent Orders
  </h2>

  <div className="w-full sm:w-[75%] md:w-[40%] lg:w-[30%]">
    <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  </div>
</div>


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
                                        {
                                           ordersData?.length > 0 && ordersData?.map((order, index) => {
                                                return(
                                                    <>
 <tr class="bg-white border-b border-gray-200"  key={order._id}>
                                            <td class="px-6 py-4 font-[500]">
                                            <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]' onClick={() => isShowOrderdProduct(index)}>
                                                {
                                                    isOpenOrderdProduct === index ?  <FaAngleUp className='text-[16x] text-[rgba(0,0,0,0.7)]' /> :  <FaAngleDown className='text-[16x] text-[rgba(0,0,0,0.7)]' />
                                                }
                                           </Button> 
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa]'>{order?._id}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa]'>{order?.paymentId ? order?.paymentId : 'Cash on Delivery'}</span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                {order?.userId?.name}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                {/* {order?.userId?.mobile} */}
                                                {order?.delivery_address?.mobile}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='block w-[400px]'> {order?.delivery_address?.address_line1+","+
                                                    order?.delivery_address?.landmark+ ","+
                                                    order?.delivery_address?.city+ ","+
                                                    order?.delivery_address?.state+","+
                                                    order?.delivery_address?.country+"."}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                { order?.delivery_address?.pincode}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {(order?.totalAmt)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-[#3872fa] '>{order?.userId?.email}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {order?.userId?._id}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                {/* <Badge status={order?.order_status}/> */}
                                                 <Select
          value={order?.order_status !== null ? order?.order_status  : orderStatus}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          onChange={(e) => handleChange(e,order?._id)}
          // displayEmpty
          label="Status"
          size='small'
          style={{zoom:'80%'}}
          className='w-full'

          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'confirm'}>Confirm</MenuItem>
          <MenuItem value={'delivered'}>Delivered</MenuItem>
         
        </Select>
                                            </td>
                                            <td class="px-6 py-4 font-[500] whitespace-nowrap">
                                             {`${order?.createdAt?.split("T")[0]} ${order?.createdAt?.split("T")[1]?.replace("Z", "")}`}
                                            </td>
                                        </tr>
                                        {
                                            isOpenOrderdProduct === index &&  (
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
                                    <tbody>{
                                        order?.products?.map((item,index)=>{
                                            return(
 <tr class="bg-white border-b border-gray-200">
                                            <td class="px-6 py-4 font-[500]">
                                                <span className='text-gray-700'>{item?._id}</span>
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                <span >
                                                    <div className='w-[200px]'>
                                                        {item?.productTitle}
                                                    </div>
                                                </span>
                                            </td>

                                            <td class="px-6 py-4 font-[500]">
                                                <img src={item?.image} alt="product_image" className='w-[40px] h-[40px] object-cover rounded-md'/>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap font-[500]">
                                                {item?.quantity}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                                {(item?.price)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            <td class="px-6 py-4 font-[500]">
                                               {(item?.price* item?.quantity)?.toLocaleString('en-Us',{style:'currency',currency:'INR'})}
                                            </td>
                                            
                                        </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                                            </td>
                                        </tr>
                                            )
                                        }
                                                    </>
                                                )
                                            })
                                        }
                                        {/* <tr class="bg-white border-b border-gray-200">
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
                                         */}
                                       
                                    </tbody>
                                </table>
                            </div>

      </div>
  )
}

export  default Orders;