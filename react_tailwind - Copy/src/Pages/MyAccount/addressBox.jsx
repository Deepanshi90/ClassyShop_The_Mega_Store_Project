import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MyContext } from '../../App';
import { editData } from '../../utils/api';

const ITEM_HEIGHT = 48;

const AddressBox = (props) => {
const context = useContext(MyContext)
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const removeAddress = (id)=>{
     setAnchorEl(null);
     props?.removeAddress(id)
}
const editAddress =(id) =>{
    setAnchorEl(null);
    context?.setOpenAddressPanel(true)
    context?.setAddressMode("edit")
    context?.setAddressId(id)
    // context?.editAddress(id);
    // 
}

  return (
     <div className="addressBox group relative border border-dashed border-[rgba(0,0,0,0.2)] w-full bg-[#fafafa] p-4 rounded-md cursor-pointer mb-4 ">
                                                    {/* <label className='mr-auto'>
                                                        <Radio {...label} name='address' value={address._id
                                                        } checked={selectedValue === (address._id)} onChange={handleChange} />
                                                       
                                                    </label> */}
                                                    <span className="inline-block pt-2 p-1 text-[12px] rounded-sm bg-[#e7e7e7]">{props?.address?.addressType}</span>
                                                    <h4 className='pt-2 flex items-center gap-4'>
                                                        <span>{context?.userData?.name}</span>
                                                        <span>+{props?.address?.mobile}</span>
                                                    </h4>
                                                    <span className='pt-0 text-[14px] block w-100' >
                                                        {(props?.address?.address_line1 + " " + "," +
                                                            props?.address?.city + " " + "," +
                                                            props?.address?.country + " " + "," + " " +
                                                            props?.address?.state + " " + "," + " " +
                                                            props?.address?.pincode + " " + "," +
                                                            props?.address?.landmark)}</span>

                                                    <div className="absolute top-[20px] right-[20px]">
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={open ? 'long-menu' : undefined}
                                                            aria-expanded={open ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={handleClick}
                                                        >
                                                            <HiOutlineDotsVertical />
                                                        </IconButton>
                                                        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
       
          <MenuItem  onClick={() => editAddress(props?.address?._id)}>
            Edit
          </MenuItem>
          <MenuItem  onClick={() => removeAddress(props?.address?._id)}>
           Delete
          </MenuItem>
      </Menu>

                                                    </div>


                                                    {/* <span className='hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto z-50' onClick={() => removeAddress(address?._id)} >
                                                        <FaRegTrashAlt />
                                                    </span> */}
                                                </div>
  )
}


export default AddressBox;