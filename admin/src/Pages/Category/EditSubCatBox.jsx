import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';
import { MyContext } from '../../App';
import { deleteData, editData } from '../../utils Copy/api';

const EditSubCatBox = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [selectVal, setSelectVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);
    const [formFields, setFormFields] = useState({
        name: '',
        parentCatName: null,
        parentId: null
    })

    // useEffect(() =>{
    //     formFields.name = props?.name;
    //     formFields.parentCatName= props?.selectedCatName;
    //     formFields.parentId = props?.selectedCat;
    //     setSelectVal(props?.selectedCat)
    // },[])


    // const handleChange = (event) => {
    //     setSelectVal(EventKeys.target.value);
    //     formFields.parentId = event.target.value;

    // }

    useEffect(() => {
        formFields.name = props?.name;
        formFields.parentCatName = props?.selectedCatName;
        formFields.parentId = props?.selectedCat;
        setSelectVal(props?.selectedCat);
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        const catId = selectVal;
        setSelectVal(catId);
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    };

    const handleChange = (event) => {
        setSelectVal(event.target.value);
        formFields.parentId = event.target.value;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        if (formFields.name === "") {
          context.alertBox("error", "Please enter category name");
          return false;
        }
    
        editData(`/api/category/${props?.id}`, formFields).then((res) => {
            console.log(res);
            
          setTimeout(() => {
            context.alertBox("success", res?.data?.message || "Category updated successfully!");
            context?.getCat();
            setIsLoading(false);
          }, 1000);
        });
      };
    
      const deleteCat = (id) =>{
        deleteData(`/api/category/${id}`).then((res) =>{
            context?.getCat();
            context.alertBox("success","Category deleted successfully")
        })
      }
    return (
        <>
            {/* <form  className="w-100 flex items-center gap-3 p-0 px-4" >
    <span className="font-[500] text-[14px] ">{props.name}</span>
    <div className="flex items-center ml-auto gap-2">
        <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black' onClick={() =>{
            setEditMode(true);
            setSelectVal(props.selectedCat)
        }}><MdOutlineModeEdit /></Button>
    </div>

</form> */}


{/* <form
  className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-0 px-4"
  onSubmit={handleSubmit}
>
  {editMode === true ? (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
      <div className="w-full sm:w-[150px]">
        <Select
          style={{ zoom: '75%' }}
          className="w-full"
          size="small"
          value={selectVal}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {props?.catData?.length !== 0 &&
            props?.catData?.map((item, index) => (
              <MenuItem
                value={item?._id}
                key={index}
                onClick={() => {
                  formFields.parentCatName = item?.name;
                }}
              >
                {item?.name}
              </MenuItem>
            ))}
        </Select>
      </div>

      <input
        type="text"
        className="w-full sm:w-auto flex-grow h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
        name="name"
        value={formFields?.name}
        onChange={onChangeInput}
      />

      <div className="flex gap-2 flex-shrink-0">
        <Button size="small" className="btn-sml" type="submit" variant="contained">
          {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Edit'}
        </Button>
        <Button size="small" variant="outlined" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <>
      <span className="font-[500] text-[14px] break-words">{props.name}</span>
      <div className="flex gap-2">
        <Button
          className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
          onClick={() => {
            setEditMode(true);
            // setSelectVal(props.selectedCat);
          }}
        >
          <MdOutlineModeEdit />
        </Button>

        <Button
          className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this category?')) {
              deleteCat(props.id);
            }
          }}
        >
          <FaRegTrashAlt />
        </Button>
      </div>
    </>
  )}
</form> */}

            <form className="w-full flex justify-between items-start gap-3 p-0 px-4" onSubmit={handleSubmit}>

                {
                    editMode === true &&
                    <>
                        <div className="flex items-center justify-between py-2 gap-4 whitespace-nowrap overflow-x-scroll">
                            <div className="w-[180px] md:w-[150px]">
                                <Select
                                    style={{ zoom: '75%' }}
                                    className='w-full'
                                    size='small'
                                    value={selectVal}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {
                                        props?.catData?.length !== 0 && props?.catData?.map((item, index) => {
                                            return (
                                                <MenuItem value={item?._id} key={index} onClick={() => {
                                                    formFields.parentCatName = item?.name
                                                }}>{item?.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </div>

                            <input
                                type="text"
                                className='w-[150px] md:w-full h-[30px] border border-[rgba(0,0,0,0.2)] 
             focus:outline-none focus:border-[rgba(0,0,0,0.4)] 
             rounded-sm p-3 text-sm'
                                name="name"
                                value={formFields?.name}
                                onChange={onChangeInput}
                            />

                            <div className="flex items-center gap-2">
                                <Button size="small" className="btn-sml" type="submit" variant="contained">
                                    {
                                        isLoading === true ? <CircularProgress color="inherit" /> : <>Edit</>
                                    }
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => setEditMode(false)}>
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </>
                }
                {
                    editMode === false &&
                    <>
                        <span className="font-[500] text-[14px]">{props.name}</span>
                        <div className="flex items-start gap-2">
                            <Button
                                className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black'
                                onClick={() => {
                                    setEditMode(true);
                                    // setSelectVal(props.selectedCat);
                                }}
                            >
                                <MdOutlineModeEdit />
                            </Button>

                            <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black' onClick={() => {
  if (window.confirm("Are you sure you want to delete this category?")) {
    deleteCat(props.id);
  }
}}><FaRegTrashAlt /></Button>
                        </div>
                    </>
                }

            </form>



        </>
    )
}


export default EditSubCatBox; 