import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, colors } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MyContext } from "../../App"
import { FaPlus } from 'react-icons/fa6';
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET;

const VITE_PAYPAL_CLIENT_ID_TEST = import.meta.env.VITE_PAYPAL_CLIENT_ID_TEST;
const VITE_API_URL = import.meta.env.VITE_API_URL;

// const VITE_PAYPAL_CLIENT_ID_TEST = process.env.VITE_PAYPAL_CLIENT_ID_TEST;
//   const VITE_API_URL = process.env.VITE_API_URL;

const Checkout = () => {

    const history = useNavigate();
    const [userData, setUserData] = useState(null);
    const context = useContext(MyContext);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState();
    const [isChecked, setIsChecked] = useState(0);
    useEffect(() => {
        window.scrollTo(0,0)
        setUserData(context?.userData);
        // console.log(context?.userData);
        setSelectedAddress(
            context?.userData?.address_details[0]?._id);

        // fetchDataFromApi(`/api/order/order-list`).then((res) => {
        //     console.log(res);
        // })

    }, [context?.userData])

    
// alert(`${PAYPAL_CLIENT_ID_TEST}`)
// console.log(`${PAYPAL_CLIENT_ID_TEST}`);




//     useEffect(() => {
// // console.log("PayPal Client ID:", VITE_PAYPAL_CLIENT_ID_TEST);
//     const script = document.createElement("script");
    
//         script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_PAYPAL_CLIENT_ID_TEST}&currency=USD&disable-funding=card
// `;
//         script.async = true;
//         script.onload = () => {
//             window.paypal.Buttons({
//                     createOrder: async () => {
//                         const resp = await fetch(
//                             "https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR"
//                         );
//                         const respData = await resp.json();

//                         var convertedAmount = 0;

//                         if (respData.result === "success") {
//                             const usdToInrRate = respData.conversion_rates.USD;
//                             convertedAmount = (totalAmount * usdToInrRate).toFixed(2);
// //                             const usdToInrRate = respData.conversion_rates.INR; // or get USD properly
// // convertedAmount = (totalAmount / usdToInrRate).toFixed(2);

//                         }
//                         const headers = {
//                             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//                             'Content-Type': 'application/json',
//                         }
//                         const data = {
//                             userId: context?.userData?._id,
//                             totalAmount: convertedAmount
//                         }
//                         console.log(data);
                        
//                         const response = await axios.get(
//                             VITE_API_URL + `/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`, { headers }
//                         )
//                         console.log("response from create-order-paypal", response?.data);
//                         return response?.data?.id;

// //                         const response = await axios.get(
// //   `${VITE_API_URL}/api/order/create-order-paypal?userId=${data.userId}&totalAmount=${convertedAmount}`
// // );

// // console.log("response from create-order-paypal", response?.data);
// // return response?.data?.id;

//                     },
//                    onApprove: async (data, actions) => {
//   try {
//     const capture = await actions.order.capture();
//     console.log("Capture success:", capture);
//     onApprovePayment(capture); // your function
//   } catch (error) {
//     console.error("Capture error:", error);
//   }
// },
//                     onError: (err) => {
//                         console.error("PayPal checkout on Error", err);
//                     },

//                 })
//                 .render("#paypal-button-container");
//         };
//         document.body.appendChild(script);

//     }, [context?.cartData, context?.userData, selectedAddress])





//     useEffect(() => {
//     const script = document.createElement("script");

//     script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_APP_PAYPAL_CLIENT_ID}&disable-funding=card`;
//     script.async = true;

//     script.onload = () => {
//         window.paypal
//             .Buttons({
//                 createOrder: async () => {
//                     // Fetch USD to INR conversion rate
//                     const resp = await fetch(
//                         "https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR"
//                     );
//                     const respData = await resp.json();

//                     let convertedAmount = 0;

//                     if (respData.result === "success") {
//                         const usdToInrRate = respData.conversion_rate.USD;
//                         convertedAmount = (totalAmount * usdToInrRate).toFixed(2);
//                     }

//                     const headers = {
//                         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//                         'Content-Type': 'application/json',
//                     };

//                     const data = {
//                         userId: context?.userData?._id,
//                         totalAmount: convertedAmount
//                     };

//                     const response = await axios.get(
//                         `${VITE_API_URL}/api/order/create-order-paypal?userId=${data.userId}&totalAmount=${data.totalAmount}`,
//                         { headers }
//                     );

//                     return response?.data?.id;
//                 },

//                 onApprove: async (data) => {
//                     onApprovePayment(data);
//                 },

//                 onError: (err) => {
//                     console.error("PayPal checkout on Error", err);
//                 }
//             })
//             .render("#paypal-button-container");
//     };

//     document.body.appendChild(script);

//     // Clean-up to avoid multiple script tags
//     return () => {
//         document.body.removeChild(script);
//     };
    
// }, [context?.cartData, context?.userData, selectedAddress]);




// const onApprovePayment = async (data) => {
//         const user = context?.userData;

//         const info = {
//             userId: user?._id,
//             products: context?.cartData,
//             payment_status: "COMPLETE",
//             delivery_address: selectedAddress,
//             totalAmount: totalAmount,
//             date: new Date().toLocaleString("en-US", {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             })
//         }

//         const headers = {
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//             'Content-Type': 'application/json',
//         }

//         const response = await axios.post(VITE_API_URL + "/api/order/capture-order-paypal",{
//             ...info,
//             paymentId: data.orderId
//         },{headers}).then((res)=>{
//             deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then((res) =>{
//                 context?.getCartItems();
//                 console.log(res);
                
//             })
//         })
//         if(response.data.success){
//             context.alertBox("success","Order completed and saved to database!");
//         }else{
//             context.alertBox("error","Payment Failed")
//         }
//     }



  useEffect(() => {
    // Load PayPal SDK script dynamically
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_PAYPAL_CLIENT_ID_TEST}&currency=USD`;
    script.async = true;

    // Load PayPal button once the script is loaded
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: async () => {
          // Fetch USD to INR conversion rate
          const resp = await fetch("https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR");
          const respData = await resp.json();

          let convertedAmount = 0;

          if (respData.result === "success") {
            const usdToInrRate = respData.conversion_rates.USD;
            convertedAmount = (totalAmount * usdToInrRate).toFixed(2);
          }

          // Prepare request data for creating PayPal order
          const headers = {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          };

          const data = {
            userId: context?.userData?._id,
            totalAmount: convertedAmount
          };

          console.log(data);

          // Make a call to your backend to create the PayPal order
          const response = await axios.get(
            `${VITE_API_URL}/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`, 
            { headers }
          );
          console.log("response from create-order-paypal", response?.data);
          return response?.data?.id; // Return the order id
        },

        onApprove: async (data, actions) => {
             const { orderID } = data;
               try {
    const response = await axios.post('http://localhost:8000/api/order/capture-order-paypal', {
      orderID,
      userId,
      totalAmount,
    });
    console.log("Capture success:", response.data);
  } catch (error) {
    console.error("Error capturing order:", error);
  }

          try {
            // Capture the order once approved
            const capture = await actions.order.capture();
            console.log("Capture success:", capture);
            onApprovePayment(capture); // Call function to handle post-payment actions
          } catch (error) {
            console.error("Capture error:", error);
          }
        },

        onError: (err) => {
          console.error("PayPal checkout on Error", err);
        },

      }).render("#paypal-button-container");
    };

    // Append script to body
    document.body.appendChild(script);

    // Clean up by removing the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [context?.cartData, context?.userData, selectedAddress, totalAmount]);

  const onApprovePayment = async (data) => {
    const user = context?.userData;

    // Collect data to save the order
    const info = {
      userId: user?._id,
      products: context?.cartData,
      payment_status: "COMPLETE",
      delivery_address: selectedAddress,
      totalAmount: totalAmount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    };

    // Headers for API request
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    };

    // Send request to backend to capture the payment and save order
    const response = await axios.post(
      `${VITE_API_URL}/api/order/capture-order-paypal`,
      {
        ...info,
        paymentId: data.orderId
      },
      { headers }
    ).then((res) => {
      // Empty the cart after order is placed
      context?.alertBox("success",res?.data?.message);
      history("/order/success");
      deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then(() => {
        context?.getCartItems();
        console.log(res);
      });
    });

    // Show success or error message based on the response
    if (response.data.success) {
      context.alertBox("success", "Order completed and saved to database!");
    } else {
      context.alertBox("error", "Payment Failed");
    }
  };



    const editAddress = (id) => {
        context?.setOpenAddressPanel(true)
        context?.setAddressMode("edit")
        context?.setAddressId(id)
        // context?.editAddress(id);
        // 
    }

    const handleChange = (e, index) => {
        if (e.target.checked) {
            setIsChecked(index)
            setSelectedAddress(e.target.value);
        }
    }

    useEffect(() => {
        setTotalAmount(
            context.cartData?.length !== 0
                ? context.cartData
                    .map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                    ?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                : 0
        );
        const rawAmount = context.cartData?.reduce(
            (total, item) => total + parseInt(item.price) * item.quantity,
            0
        );

        setTotalAmount(rawAmount); // This should be a number, not a formatted string
        //   localStorage.setItem(
        //     "totalAmount",
        //     context.cartData?.length !== 0
        //       ? context.cartData
        //           .map((item) => parseInt(item.price) * item.quantity)
        //           .reduce((total, value) => total + value, 0)
        //           ?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
        //       : 0
        //   );
    }, [context.cartData]);


    const checkout = (e) => {
        e.preventDefault();

        if(userData?.address_details?.length!==0){
var options = {
            key: VITE_APP_RAZORPAY_KEY_ID,
            key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
            amount: parseInt(totalAmount * 100),
            currency: "INR",
            order_receipt: "order_rcptid_" + context?.userData?.name,
            name: "E-Commerce",
            description: "for testing purpose",
            handler: function (response) {
                console.log(response);

                const paymentId = response.razorpay_payment_id;

                const user = context?.userData

                const payLoad = {
                    userId: user?._id,
                    products: context?.cartData,
                    paymentId: paymentId,
                    payment_status: "COMPLETED",
                    delivery_address: selectedAddress,
                    totalAmt: totalAmount,
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                }

                console.log(payLoad);

                //       postData(`/api/order/create`,payLoad).then((res) =>{
                //         console.log(res);

                //         context.alertBox("success",res?.message);
                // if(res?.error === false){
                //     deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) =>{
                //         context?.getCartItems();
                //     })
                //     history("/");
                // }
                // else{
                //     context.alertBox("error",res?.message)
                // }
                //       })  
                //     },

                //     theme:{


                console.log("Calling create order API with payload:", payLoad);

                postData(`/api/order/create`, payLoad).then((res) => {
                    console.log(res);
                    context.alertBox("success", res?.message);

                    if (res?.error === false) {
                        deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
                            context?.getCartItems();
                            history("/order/success");
                        });
                    } else {
                        history("/order/failed");
                        context.alertBox("error", res?.message);
                    }
                });
            },
            theme: {
                color: "#ff5252"
            }
        }
        // console.log(options);
        var pay = new window.Razorpay(options);
        pay.open();
        }
        else{
            context.alertBox("error","Please add address details!")
        }

    }


    const cashOnDelivery = () => {
        const user = context?.userData

        if(userData?.address_details?.length !== 0 ){
const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: '',
            payment_status: "Cash On Delivery",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        }

        postData(`/api/order/create`, payLoad).then((res) => {
            console.log(res);
            context.alertBox("success", res?.message);

            if (res?.error === false) {
                deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
                    context?.getCartItems();
                  
                });
            } else {
                context.alertBox("error", res?.message);
            }
             history("/order/success");
        });
        }
        else{
            context.alertBox("error" , "Please add address details!")
        }

        


    }




    // const options = {
    //     key: VITE_APP_RAZORPAY_KEY_ID,
    //     key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
    //     amount: parseInt(totalAmount * 100),
    //     currency: "INR",
    //     order_receipt: "order_rcptid_" + context?.userData?.name,
    //     name: "E-Commerce",
    //     description: "for testing purpose",
    //     order_id: response.id, // Razorpay order ID from backend
    //     handler: function (response) {
    //         console.log("Payment Successful:", response);

    //         const payLoad = {
    //             userId: context?.userData?._id,
    //             products: context?.cartData,
    //             paymentId: response.razorpay_payment_id,
    //             orderId: response.razorpay_order_id,
    //             signature: response.razorpay_signature,
    //             paymentStatus: "COMPLETED"
    //         };

    //         postData(`/api/order/create`, payLoad).then((res) => {
    //             if (res?.error === false) {
    //                 context.alertBox("success", res?.message);
    //             } else {
    //                 context.alertBox("error", res?.message);
    //             }
    //         });
    //     },
    //     theme: {
    //         color: "#3399cc"
    //     }
    // };



    return (
        <section className="py-3 lg:py-10 px-3">
            <form onSubmit={checkout}>
                <div className="w-full lg:w-[70%] m-auto flex flex-col md:flex-row gap-5">
                    <div className="leftCol w-full md:w-[60%]">
                        <div className="card bg-white shadow-md p-5 rounded-md w-full ">

                            <div className="flex items-center justify-between">
                                <h2>Select Delivery Address</h2>
                                <Button className='btn-org btn-border btn-sm btn' onClick={() => {
                                    context?.setOpenAddressPanel(true)
                                    context?.setAddressMode("add")
                                }}><FaPlus />ADD {context?.windowWidth <767 ? '' : 'NEW ADDRESS'}</Button>
                            </div> 

                            <br />

                            <div className="flex flex-col gap-4">
                                {
                                    userData?.address_details?.length !== 0 ? userData?.address_details?.map((address, index) => {
                                        return (
                                            <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md shadow-sm relative ${isChecked === index && 'bg-[#fff2f2]'

                                                }`} key={index}>
                                                <div>
                                                    <Radio size='small' onChange={(e) => handleChange(e, index)} checked={isChecked === index} value={address?._id} />
                                                </div>
                                                <div className="info ">
                                                    <span className='inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md'>{address?.addressType}</span>
                                                    <h3>{userData?.name}</h3>
                                                    <p className='mt-0 mb-0'>{address?.address_line1 + " " +
                                                        address?.city + " " + address?.landmark + " " +
                                                        address?.state + " " + address?.country + " ," + "+"+ address?.mobile }</p>
                                                    <p className='mb-0 font-[500]'>+{userData?.mobile}</p>
                                                </div>

                                                <Button variant='text' className=' !absolute !top-[15px] !right-[15px] btn-org btn-border btn-sm' size='small' onClick={() => editAddress(address?._id)}>EDIT</Button>
                                            </label>
                                        )
                                    })
                                        :
                                        <>
                                            <div className='flex items-center justify-between flex-col p-5 mt-5'>
                                                <img src="/map.png" alt="No Address Found" width="100" />
                                                <h2 className='text-center'>No Address found in your account!</h2>
                                                <p className='mt-0'>Add a delivery Address.</p>
                                                <Button className='btn-org btn-lg' onClick={() => {
                                                    context?.setOpenAddressPanel(true)
                                                    context?.setAddressMode("add")
                                                }}>Add Address</Button>
                                            </div>
                                        </>
                                }

                            </div>

                            {/* <h1>Biling Details</h1>

                        <form className='w-full mt-5'>
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField className='w-full' label="Full Name" variant="outlined" size='small' />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField type="email" className='w-full' label="Email" variant="outlined" size='small' />
                                </div>
                            </div>

                            <h6 className='text-14px font-[500] mb-3'>Street Address</h6>
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[100%]">
                                    <TextField className='w-full' label="House Number and Street Name" variant="outlined" size='small' />
                                </div>

                            </div>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[100%]">
                                    <TextField className='w-full' label="Appartment ,suite, unit etc. (Optional)" variant="outlined" size='small' />
                                </div>

                            </div>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField className='w-full' label="Town / City" variant="outlined" size='small' />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField type="text" className='w-full' label="State / Country " variant="outlined" size='small' />
                                </div>
                            </div>

                            <h6 className='text-14px font-[500] mb-3'>Postal ZIP Code</h6>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[100%]">
                                    <TextField className='w-full' label="ZIP Code" variant="outlined" size='small' />
                                </div>

                            </div>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField className='w-full' label="Phone Number" variant="outlined" size='small' />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField className='w-full' label="Alternate Number" type="number" variant="outlined" size='small' />
                                </div>

                            </div>

                        </form> */}


                        </div>

                    </div>

                    <div className="rightCol w-full md:w-[40%] ">
                        <div className="card shadow-md bg-white p-5 rounded-md  ">
                            <h2 className='mb-4'>Your Order</h2>


                            <div className="flex items-center justify-between pt-3 border-t border-b border-[rgba(0,0,0,0.2)]">
                                <span className='text-[14px] font-[600]'>Product</span>
                                <span className='text-[14px] font-[600]'>SubTotal</span>

                            </div>
                            <div className=' mb-5 scroll max-h-[335px] overflow-y-scroll overflow-x-hidden pr-2'>

                                {
                                    context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                                        return (
                                            <div className="flex items-center justify-between py-2" key={index}>
                                                <div className="part1 flex items-center gap-3">
                                                    <div className="img w-[50px] h-[50px] overflow-hidden rounded-md object-cover group cursor-pointer">
                                                        <img src={item?.image} alt="image1" className='w-full transition-all group-hover:scale-105' />
                                                    </div>

                                                    <div className="info">
                                                        <h4 className='text-[14px]' title={item?.productTitle}>{item?.productTitle?.substr(0, 20) + "..."}</h4>
                                                        <span className='text-[13px]'>Qty : {item?.quantity}</span>
                                                    </div>

                                                </div>

                                                <span className='text-[14px] font-[500]'>{(item?.quantity * item?.price)?.toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                                })}</span>
                                            </div>
                                        )
                                    })
                                }



                            </div>

                            <div className="flex items-center gap-3 mb-2 flex-col">
                                <Button type='submit' className='btn-org btn-lg w-full flex gap-2 items-center' ><BsFillBagCheckFill className='text-[20px]' />Checkout</Button>

                                <div id="paypal-button-container" className={`${userData?.address_details?.length === 0 ? "pointer-events-none" : ''}`}></div>


                                <Button type='button' className='btn-dark btn-lg w-full gap-2 items-center' onClick={cashOnDelivery}>
                                    <BsFillBagCheckFill className='text-[20px]' />Cash On Delivery</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>

        </section>
    )
}

export default Checkout;