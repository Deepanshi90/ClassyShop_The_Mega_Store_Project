import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Radio from '@mui/material/Radio';
import { MyContext } from '../../App';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, CircularProgress } from '@mui/material';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { fetchDataFromApi, postData, deleteData, editData } from '../../utils/api';
import { FaRegTrashAlt } from 'react-icons/fa';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';


import { HiOutlineDotsVertical } from "react-icons/hi";
import AddressBox from './addressBox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const Address = () => {
    const [address, setAddress] = useState([]);
    const context = useContext(MyContext);
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [isOpenModel, setisOpenModel] = useState(false);
    const [addressType, setAddressType] = useState("");
    const [mode,setMode] = useState("add");
const [addressId,setAddressId] = useState('')

    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        userId: '',
        addressType: "",
        landmark: "",
        // userId: context?.userData?._id,
    });

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    };

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            // fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
            //     // console.log(res.data);
            //     setAddress(res.data);
            //     // context?.setAddress(res.data);
                

            // });

            setAddress(context?.userData?.address_details);
        }
    }, [context?.userData])



    // useEffect(() => {
    //     if (context?.userData?._id !== undefined) {
    //         setFormFields((prevState) => ({
    //             ...prevState,
    //             //   userId: formFields.userId
    //             userId: context?.userData?._id
    //         }))
    //     }

    //     // console.log(context?.userData?._id);


    // }, [context.userData]);



    const handleClose = () => {
        //   onClose(selectedValue);
        setisOpenModel(false);
    };

    // const onChangeInput = (e) => {
    //     const { name, value } = e.target;
    //     setFormFields(() => {
    //         return {
    //             ...formFields,
    //             [name]: value
    //         }
    //     })
    // };

    // const handleChangeAddressType = (event) => {
    //     setAddressType(event.target.value);
    //     // alert(event.target.value)
    //     setFormFields(() => ({
    //         ...formFields,
    //         addressType: event.target.value
    //     }))
    // }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         if (formFields.address_line1 === "") {
//             context.alertBox("error", "Please enter Address Properly");
//             return false;
//         }

//         if (formFields.city === "") {
//             context.alertBox("error", "Please enter city name");
//             return false;
//         }

//         if (formFields.state === "") {
//             context.alertBox("error", "Please enter state");
//             return false;
//         }

//         if (formFields.pincode === "") {
//             context.alertBox("error", "Please enter Pincode");
//             return false;
//         }

//         if (formFields.country === "") {
//             context.alertBox("error", "Please enter Country Name");
//             return false;
//         }

//         if (phone === "") {
//             context.alertBox("error", "Please enter Valid phone Number");
//             return false;
//         }

//         if (formFields.landmark === "") {
//             context.alertBox("error", "Please enter Valid Landmark");
//             return false;
//         }

//         if (formFields.addressType === "") {
//             context.alertBox("error", "Please select the address type");
//             return false;
//         }

//         if(mode==="add" ){
// postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
//             console.log(res);

//             if (res?.error !== true) {
//                 setTimeout(()=>{
//                     setIsLoading(false);
//                     setisOpenModel(false);
//                 },500)

//                 context.alertBox("success", res?.message);

                
//                 fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
//                     // console.log(res.data);
//                     setAddress(res.data);
//                     // context?.setAddress(res.data);
//                     setFormFields({
//                          address_line1: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: '',
//         mobile: '',
//         userId: '',
//         addressType: "",
//         landmark: "",
//                     })
//                     setAddressType("");
//                     setPhone("")

//                 });
//                 // context?.setAddress();
//             } else {
//                 context.alertBox("error", res?.message);
//                 setIsLoading(false);
//             }

//         }).catch((err) => {
//             console.error(err);
//             context.alertBox("error", "Something went wrong!");
//             setIsLoading(false);
//         });
//         }
//         // console.log(formFields);
// if(mode==="edit"){
//     setIsLoading(true);
//     editData(`/api/address/${addressId}`,formFields,{withCredentials: true}).then((res)=>{
        

//         // console.log(res?.data?.address);
    
//          fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
//                 // console.log(res.data);
//                 setAddress(res.data);
//                 // context?.setAddress(res.data);
//                 setTimeout(()=>{
//                     setIsLoading(false);
//                     setisOpenModel(false);
//                 },500)
                     
//                 setFormFields({
//                          address_line1: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: '',
//         mobile: '',
//         userId: '',
//         addressType: "",
//         landmark: "",
//                     })
//                     setAddressType("");
//                     setPhone("")


//             });
//          context.alertBox("success",res?.data?.message);

//     })
// }
        
//     };

//      const editAddress = (id) => {
//         // e.preventDefault();
//         setMode("edit")

//         setisOpenModel(true);
//         setAddressId(id)
//         fetchDataFromApi(`/api/address/${id}`).then((res)=>{
//             console.log(res);
//             setFormFields({
//                      address_line1: res?.address?.address_line1,
//         city: res?.address?.city,
//         state: res?.address?.state,
//         pincode: res?.address?.pincode,
//         country: res?.address?.country,
//         mobile: res?.address?.mobile,
//         userId: res?.address?.userId,
//         addressType: res?.address?.addressType,
//         landmark: res?.address?.landmark,
//                 })
//                 const ph = `"${res?.address?.mobile}"`
//                 setPhone(ph)
//                 // setPhone(res?.address?.mobile);
//                 setAddressType(res?.address?.addressType)
//         })
//         };


    const [selectedValue, setSelectedValue] = useState('Subhash Nagar');

    const handleChange = (event) => {
        // alert(event.target.value)
        setSelectedValue(event.target.value);
    };

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            // console.log(res);
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                console.log(res.data);
                setAddress(res.data);
                context?.getUserDetails();
                // context?.setAddress(res.data);

            });
            context.alertBox("success", res?.data?.message || "Address deleted Successfully");
        })
    }


    
    return (
        <>
            <section className="py-5 lg:py-10 w-full ">
                <div className="container flex flex-col md:flex-row gap-5">
                    <div className="col1 w-full md:w-[30%] lg:w-[20%]">
                        <AccountSidebar />
                    </div>

                    <div className="col2 w-full md:w-[70%] lg:w-[50%]">
                        <div className="card bg-white p-5 shadow-md rounded-md mb-5">
                            <div className="flex items-center pb-3">
                                <h2 className='pb-0'>Address</h2>
                            </div>
                            <hr className='border-[rgba(0,0,0,0.1)]' />

                            <div className='flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] mb-3 bg-[#f1faff] cursor-pointer hover:bg-[#e7f3f9] rounded-md' onClick={() =>{
                                context?.setOpenAddressPanel(true)
                                context?.setAddressMode("add")
                            }}>
                                <span className='text-[14px] font-[500]' >Add Address</span>
                            </div>

                            <div className="flex gap-2 flex-col mt-4">
                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <>
                                               <AddressBox address={address} key={index} removeAddress={removeAddress }
                                                // editAddress={editAddress}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* <Dialog open={isOpenModel}>
                <DialogTitle>{mode === "add" ? 'Add Address' : 'Edit Address'} </DialogTitle>
                <form className='px-8 py-3 pb-5' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="Address Line 1" variant="outlined" size='small' name='address_line1' value={formFields.address_line1} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="City" variant="outlined" size='small' name='city' value={formFields.city} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="State" variant="outlined" size='small' name='state' value={formFields.state} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="Pincode" variant="outlined" size='small' name='pincode' value={formFields.pincode} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="Country" variant="outlined" size='small' name='country' value={formFields.country} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                disabled={isLoading === true ? true : false}
                                onChange={(phone) => {
                                    setPhone(phone); {

                                        setFormFields((prevState) => ({
                                            ...prevState,
                                            mobile: phone
                                        }))
                                    }
                                }}
                            />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="LandMark" variant="outlined" size='small' name='landmark' value={formFields.landmark} onChange={onChangeInput} />
                        </div>



                    </div>
                    <div className="flex gap-5 pb-5 flex-col">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className='flex items-center gap-5'
                                value={addressType}
                                onChange={handleChangeAddressType}
                            >
                                <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                <FormControlLabel value="Work" control={<Radio />} label="Office" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div className="flex items-center gap-5 pb-4">
                        <Button type='submit' className='btn-org btn-lg w-full flex gap-2 items-center' >
                            {
                                isLoading === true ? <CircularProgress color='inherit'/> : 'Save'
                            }
                            </Button>
                        <Button className='btn-org btn-border w-full flex gap-2 items-center' onClick={handleClose} >Cancle</Button>
                    </div>

                </form>
            </Dialog> */}


        </>
    )
}

export default Address;


//  <div className="addressBox group relative border border-dashed border-[rgba(0,0,0,0.2)] flex items-center justify-center w-full bg-[#f1f1f1] p-3 rounded-md cursor-pointer mb-4">
//                                                     <label className='mr-auto'>
//                                                         <Radio {...label} name='address' value={address._id
//                                                         } checked={selectedValue === (address._id)} onChange={handleChange} />
//                                                         <span className='text-[12px]'>{(address?.address_line1 + " " +
//                                                             address?.city + " " +
//                                                             address?.country + " " +
//                                                             address?.state + " " +
//                                                             address?.pincode + " " +
//                                                             address?.landmark + " " +
//                                                             address?.addressType + " ")}</span>
//                                                     </label>



//                                                     {/* <span className='hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto z-50' onClick={() => removeAddress(address?._id)} >
//                                                         <FaRegTrashAlt />
//                                                     </span> */}
//                                                 </div>