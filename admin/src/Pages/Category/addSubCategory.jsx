import React,{useContext, useState} from 'react'
import UploadBox from '../../Components/UploadBox';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { postData } from '../../utils Copy/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


const AddSubCategory = () => {
      const [productCat, setProductCat] = useState('');
      const [productCat2, setProductCat2] = useState('');
      const [formFields, setFormFields] = useState({
              name: "",
              parentCatName: null,
              parentId: null,

          });

          const [formFields2, setFormFields2] = useState({
            name: "",
            parentCatName: null,
            parentId: null,

        });
            const [isLoading, setIsLoading] = useState(false);
            const [isLoading2, setIsLoading2] = useState(false);

      const context = useContext(MyContext);

     const history = useNavigate();


    const handleChangeProductCat = (event,catName) => {
        setProductCat(event.target.value);
        // alert(event.target.value);
        formFields.parentId = event.target.value;
    };

    const handleChangeProductCat2 = (event,catName) => {
        setProductCat2(event.target.value);
        // alert(event.target.value);
        formFields2.parentId = event.target.value;
    };

    const   selectedCatFun  = (catName) =>{
        formFields.parentCatName = catName;
      } 

      const   selectedCatFun2  = (catName) =>{
        formFields2.parentCatName = catName;
      } 

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        const catId = productCat;
        setProductCat(catId);
        
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeInput2 = (e) => {
        const { name, value } = e.target;

        const catId = productCat2;
        setProductCat2(catId);
        
        setFormFields2(() => {
            return{
                ...formFields2,
                [name]: value,
            }
           
        });    };

    const handleSubmit = (e) => {
        // console.log(formFields);
        
            e.preventDefault();
            setIsLoading(true);
    
            if (formFields.name === "") {
                context.alertBox("error", "Please enter Sub Category Name");
                setIsLoading(false);
                return;
            }
    
            if (productCat === "") {
                context.alertBox("error", "Please select Parent Category");
                setIsLoading(false);
                return;
            }
    
            // postData("/api/category/create", formFields).then((res) => {
              
            //     if (!res?.error) {
            //         context.alertBox("success", res?.message);
            //         setFormFields({ name: "", images: [] });
            //         setPreviews([]);
    
            //         setTimeout(() =>{
            //             setIsLoading(false);
            //             context.setIsOpenFullScreenPanel({
            //                 open: false,
                         
            //             })
            //         },500)
    
            //     } else {
            //         context.alertBox("error", res?.message);
            //     }
            // });
    
            postData("/api/category/create", formFields).then((res) => {
                if (!res?.error) {
                    context.alertBox("success", res?.message);
                    // setFormFields({ name: "", images: [] });
                    // setPreviews([]);
            
                    setTimeout(() => {
                        setIsLoading(false);
                        context.setIsOpenFullScreenPanel({ open: false });
                        history("/subCategory/list")
                        context?.getCat();

                    }, 500);
                } else {
                    setIsLoading(false); // Add this
                    context.alertBox("error", res?.message);
                }
            }).catch(() => {
                setIsLoading(false); // Handle catch too
                context.alertBox("error", "Failed to submit category. Try again later.");
            });
        };

        const handleSubmit2 = (e) => {
            console.log(formFields2);
            
                e.preventDefault();
                setIsLoading2(true);
        
                if (formFields2.name === "") {
                    context.alertBox("error", "Please enter Sub Category Name");
                    setIsLoading2(false);
                    return;
                }
        
                if (productCat2 === "") {
                    context.alertBox("error", "Please select Parent Category");
                    setIsLoading2(false);
                    return;
                }
        
                // postData("/api/category/create", formFields).then((res) => {
                  
                //     if (!res?.error) {
                //         context.alertBox("success", res?.message);
                //         setFormFields({ name: "", images: [] });
                //         setPreviews([]);
        
                //         setTimeout(() =>{
                //             setIsLoading(false);
                //             context.setIsOpenFullScreenPanel({
                //                 open: false,
                             
                //             })
                //         },500)
        
                //     } else {
                //         context.alertBox("error", res?.message);
                //     }
                // });
        
                postData("/api/category/create", formFields2).then((res) => {
                    if (!res?.error) {
                        context.alertBox("success", res?.message);
                        // setFormFields2({ name: "", images: [] });
                        // setPreviews([]);
                
                        setTimeout(() => {
                            setIsLoading2(false);
                            context.setIsOpenFullScreenPanel({ open: false });
                            context?.getCat();
                        }, 500);
                    } else {
                        setIsLoading2(false); // Add this
                        context.alertBox("error", res?.message);
                    }
                }).catch(() => {
                    setIsLoading2(false); // Handle catch too
                    context.alertBox("error", "Failed to submit category. Try again later.");
                });
            };

        

    return (
        // <section className='p-5 bg-gray-50 grid grid-cols-2 gap-10'>
        //     <form className="form p-8 py-3 " onSubmit={handleSubmit}>
        //         <h4 className='font-[600]'>Add Sub Category </h4>
        //         <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>
        //         <div className="grid grid-cols-2 mb-3 gap-5">
        //         <div className="col">
        //                 <h3 className="text-[14px] font-[500] mb-1">Product Category</h3>
        //                 <Select
        //                     labelId="demo-simple-select-label"
        //                     id="productCatDrop"
        //                     className='w-full '
        //                     size='small'
        //                     value={productCat}
        //                     label="Product Category"
        //                     onChange={handleChangeProductCat}
        //                 >
        //                     {
        //                         context?.catData?.length !== 0 && context?.catData?.map((item,index)=>{
        //                             return(
        //                                 <MenuItem key={index} value={item?._id} onClick={() =>{
        //                                     selectedCatFun(item?.name)
        //                                 }}>{item?.name}</MenuItem>
        //                             )
        //                         })
        //                     }
        //                 </Select>
        //             </div>

        //             <div className="col">
        //                 <h3 className="text-[14px] font-[500] mb-1">Sub Catgory Name</h3>
        //                 <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="name" value={formFields.name} onChange={onChangeInput} />
        //             </div>


        //         </div>

        //         <br />
                
        //         </div>

        //     <div className="w-[250px]">
        //         <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
        //                                 <FaCloudUploadAlt className="text-[25px] text-white" />
        //                                 {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
        //                             </Button>

        //         </div>
                
        //     </form>
            

        //     <form className="form p-8 py-3 " onSubmit={handleSubmit2}>
        //     <h4 className='font-[600]'>Add Third Level Category </h4>
        //         <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>


        //         <div className="grid grid-cols-2 mb-3 gap-5">
        //         <div className="col">
        //                 <h3 className="text-[14px] font-[500] mb-1">Product Category</h3>
        //                 <Select
        //                     labelId="demo-simple-select-label"
        //                     id="productCatDrop"
        //                     className='w-full '
        //                     size='small'
        //                     value={productCat2}
        //                     label="Product Category"
        //                     onChange={handleChangeProductCat2}
        //                 >
        //                     {
        //                         context?.catData?.length !== 0 && context?.catData?.map((item,index)=>{
        //                             console.log(item);
                                    
        //                           return(
        //                             item?.children?.length !==0 && item?.children?.map((item2,index) =>{
        //                                 return(
        //                                     <MenuItem key={index} value={item2?._id} onClick={() =>{
        //                                         selectedCatFun2(item2?.name)
        //                                     }}>{item2?.name}</MenuItem>
        //                                 )
        //                             })
        //                           )
                                    
        //                         })
        //                     }
        //                 </Select>
        //             </div>

        //             <div className="col">
        //                 <h3 className="text-[14px] font-[500] mb-1">Sub Catgory Name</h3>
        //                 <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="name" value={formFields2.name} onChange={onChangeInput2} />
        //             </div>


        //         </div>

        //         <br />
                
        //         </div>

        //     <div className="w-[250px]">
        //         <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
        //                                 <FaCloudUploadAlt className="text-[25px] text-white" />
        //                                 {isLoading2 ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
        //                             </Button>

        //         </div>
                
        //     </form>



        // </section>

        <section className='p-5 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-10'>
  {/* Add Sub Category Form */}
  <form className="form p-6 sm:p-8 py-3 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
    <h4 className='font-semibold text-lg'>Add Sub Category</h4>
    <div className='scroll max-h-[75vh] overflow-y-auto pr-2 pt-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-5">
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Product Category</h3>
          <Select
            id="productCatDrop"
            className='w-full'
            size='small'
            value={productCat}
            onChange={handleChangeProductCat}
          >
            {context?.catData?.map((item, index) => (
              <MenuItem key={index} value={item?._id} onClick={() => selectedCatFun(item?.name)}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="col">
          <h3 className="text-sm font-medium mb-1">Sub Category Name</h3>
          <input
            type="text"
            className='w-full h-[40px] border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-500'
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
          />
        </div>
      </div>
    </div>

    <div className="w-full sm:w-[250px] mt-4">
      <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
        <FaCloudUploadAlt className="text-xl text-white" />
        {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
      </Button>
    </div>
  </form>

  {/* Add Third Level Category Form */}
  <form className="form p-6 sm:p-8 py-3 bg-white rounded-md shadow-md" onSubmit={handleSubmit2}>
    <h4 className='font-semibold text-lg'>Add Third Level Category</h4>
    <div className='scroll max-h-[75vh] overflow-y-auto pr-2 pt-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-5">
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Product Category</h3>
          <Select
            id="productCatDrop2"
            className='w-full'
            size='small'
            value={productCat2}
            onChange={handleChangeProductCat2}
          >
            {context?.catData?.map((item, index) =>
              item?.children?.length > 0 && item?.children.map((item2, index2) => (
                <MenuItem key={index2} value={item2?._id} onClick={() => selectedCatFun2(item2?.name)}>
                  {item2?.name}
                </MenuItem>
              ))
            )}
          </Select>
        </div>

        <div className="col">
          <h3 className="text-sm font-medium mb-1">Sub Category Name</h3>
          <input
            type="text"
            className='w-full h-[40px] border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-500'
            name="name"
            value={formFields2.name}
            onChange={onChangeInput2}
          />
        </div>
      </div>
    </div>

    <div className="w-full sm:w-[250px] mt-4">
      <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
        <FaCloudUploadAlt className="text-xl text-white" />
        {isLoading2 ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
      </Button>
    </div>
  </form>
</section>


        
    )
}

export default AddSubCategory;