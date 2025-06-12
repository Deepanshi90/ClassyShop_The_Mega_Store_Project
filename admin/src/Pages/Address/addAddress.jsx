import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchDataFromApi, postData } from '../../utils Copy/api';
import { MyContext } from '../../App';

const AddAddress = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({
    address_line1: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    mobile: '',
    status: '',
    userId: '',
    selected: false,
    // userId: context?.userData?._id,
  });

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      userId: formFields.userId
    }))

  }, [context.userData]);


  // useEffect(() =>{
  //   // console.log(context?.userData);
  //   setFormFields((prevState) => ({
  //     ...prevState,
  //     userId: formFields.userId
  //   }))
  //   formFields.userId = context?.userData?._id

  // },[context?.userData])

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value
    }))
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.alertBox("error", "Please enter Address Properly");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "Please enter city name");
      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "Please enter state");
      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "Please enter Pincode");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "Please enter Country Name");
      return false;
    }

    if (phone === "") {
      context.alertBox("error", "Please enter Valid phone Number");
      return false;
    }

    console.log(formFields);

    postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);

        context.alertBox("success", res?.message);

        context?.setIsOpenFullScreenPanel({
          open: false
        })
        fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
          // console.log(res.data);
          context?.setAddress(res.data);

        });
        // context?.setAddress();
      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }

    }).catch((err) => {
      console.error(err);
      context.alertBox("error", "Something went wrong!");
      setIsLoading(false);
    });
  };

  return (
    <section className='p-5 bg-gray-50'>
      <form className="form p-8 py-3 " onSubmit={handleSubmit}>
        <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>


          <div className="grid grid-cols-2 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">Address Line 1</h3>
              <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name='address_line1' value={formFields.address_line1} onChange={onChangeInput} />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">City</h3>
              <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]' name='city' value={formFields.city} onChange={onChangeInput} />
            </div>
          </div>

          <div className="grid grid-cols-3 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">State</h3>
              <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]' name='state' value={formFields.state} onChange={onChangeInput} />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">Pincode</h3>
              <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name='pincode' value={formFields.pincode} onChange={onChangeInput} />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">Country</h3>
              <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]' name='country' value={formFields.country} onChange={onChangeInput} />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">Mobile No.</h3>
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

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1">Status</h3>
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                size='small'
                className='w-full'
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>


          <br />

        </div>

        <br />
        <br />
        <div className="w-[250px]">
          <Button type='submit' className='btn-blue  btn-lg w-full  flex gap-2 '><FaCloudUploadAlt className="text-[25px] text-white" />Publish and View</Button>

        </div>

      </form>

    </section>


  )
}

export default AddAddress;