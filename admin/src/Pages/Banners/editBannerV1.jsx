import React, { useEffect } from 'react'
import UploadBox from '../../Components/UploadBox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { deleteImages, editData, fetchDataFromApi, postData } from '../../utils Copy/api';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';


const EditBannerV1 = () => {

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [previews, setPreviews] = useState([]);
    const context = useContext(MyContext);
    
    const [isLoading, setIsLoading] = useState(false);
      const [productThirdLevelCat, setProductThirdLevelCat] = useState('');

      const history = useNavigate();
       const [alignInfo, setAlignInfo] = useState('');
    const [formFields, setFormFields] = useState({
        catId: '',
        // category: '',
        bannerTitle: '',
        subCatId: '',
        // subCat: '',
        // thirdLevelCat: '',
        thirdLevelCatId: '',
        price:'',
          alignInfo:'',

    })
 
 useEffect(() => {
        const id = context?.isOpenFullScreenPanel?.id;
    
        fetchDataFromApi(`/api/bannerV1/${id}`).then((res) => {
            // const category = res?.category;
    
            // if (category) {
            //     setFormFields({
            //         name: category.name || "",
            //         images: category.images || []
            //     });
            //     setPreviews(category.images || []);
            // }

            console.log(res);
            formFields.bannerTitle  = res?.banner?.bannerTitle
            setPreviews(res?.banner?.images);
            formFields.images = res?.banner?.images;
            setProductCat(res?.banner?.catId);
            formFields.catId = res?.banner?.catId;
            setProductSubCat(res?.banner?.subCatId);
            formFields.subCatId = res?.banner?.subCatId;
            setProductThirdLevelCat(res?.banner?.thirdsubCatId);
            formFields.thirdLevelCatId = res?.banner?.thirdsubCatId;
            formFields.price = res?.banner?.price;
            setAlignInfo(res?.banner?.alignInfo)
            formFields.alignInfo  = res?.banner?.alignInfo;
            
        });
    }, [context?.isOpenFullScreenPanel]);

    const handleChangeAlignInfo = (event) =>{
        setAlignInfo(event.target.value)
        formFields.alignInfo  = event.target.value
    }

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value;
        // formFields.category = event.target.value;
        // const value = event.target.value;
        // setProductCat(value);
        // setFormFields(prev => ({
        //     ...prev,
        //     catId: value,
        //     category: value
        // }));

        // alert(event.target.value)
    };

    const handleChangeProductSubCat = (event) => {
        // setProductSubCat(event.target.value);
        // formFields.subCatId = event.target.value;
        const value = event.target.value;
        setProductSubCat(value);
        setFormFields(prev => ({
            ...prev,
            subCatId: value
        }));
    };

    const handleChangeProductThirdLevelCat = (event) => {
        const selectedId = event.target.value;
        setProductThirdLevelCat(selectedId);

        // Find the third-level category object from catData
        let selectedCategory = null;

        context?.catData?.forEach((cat) => {
            cat?.children?.forEach((subCat) => {
                subCat?.children?.forEach((thirdLevelCat) => {
                    if (thirdLevelCat?._id === selectedId) {
                        selectedCategory = thirdLevelCat;
                    }
                });
            });
        });

        if (selectedCategory) {
            setFormFields(prev => ({
                ...prev,
                thirdsubCat: selectedCategory.name,
                thirdsubCatId: selectedCategory._id
            }));
        }
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const setPreviewsFun = (newPreviewsArr) => {
        setPreviews((prev) => {
            // Remove duplicates using Set or simple filtering
            const merged = [...prev, ...newPreviewsArr.filter(img => !prev.includes(img))];
            setFormFields((formFields) => ({
                ...formFields,
                images: merged

            }));

            return merged;
        });
        context.alertBox("success", "Image Uploaded Successfully");
    };

    const removeImg = (image, index) => {
        deleteImages(`/api/bannerV1/deleteImage?img=${image}`)
            .then((res) => {
                const imageArr = [...previews];
                imageArr.splice(index, 1);
                setPreviews(imageArr);
                setFormFields((prev) => ({
                    ...prev,
                    images: imageArr
                }));
                context.alertBox("success", res?.data?.message);
            })
            .catch((err) => {
                context.alertBox("error", "Failed to delete image. Please try again.");
            });

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formFields);
 if (formFields.bannerTitle === "") {
            context.alertBox("error", "Please enter Banner Tittle");
            setIsLoading(false)
            return false;
        }
        if (previews?.length === 0) {
            context.alertBox("error", "Please select atleat one Banner image");
            setIsLoading(false)
            return false;
        }
     
        if (formFields.price === "") {
            context.alertBox("error", "Please enter Price");
            setIsLoading(false)
            return false;
        }

        setIsLoading(true);
        console.log(formFields);

        // editData("/api/bannerV1/update", formFields).then((res) => {
        //     console.log(res);

        //     if (res?.error === false) {
        //         context.alertBox("success", res?.message);
        //         setTimeout(() => {

        //             setIsLoading(false);
        //             context.setIsOpenFullScreenPanel({ open: false });
        //             context?.getCat();
        //             history("/bannerV1/list");

        //         }, 1000)


        //         // navigate("/products");
        //     }
        //     else {
        //         setIsLoading(false);
        //         context.alertBox("error", res?.message);
        //     }


        // })

          editData(`/api/bannerV1/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
                  
                    if (!res?.error) {
                        context.alertBox("success", res?.message || "Edit Data Successfully ");
                        setFormFields({ bannerTitle: "",catId:'',subCatId:"",thirdsubCatId:"" ,price:"",alignInfo:"",images: [] });
                        setPreviews([]);
        
                        setTimeout(() =>{
                            setIsLoading(false);
                            context.setIsOpenFullScreenPanel({
                                open: false,
                             
                            })
                            context?.getCat();
                    history("/bannerV1/list");
                        },500)
        
                    } else {
                        context.alertBox("error", res?.message || "Not able to edit data now Please try in some time");
                    }
                });

    }

    return (
//         <section className='p-5 bg-gray-50'>
//             <form className="form p-8 py-3" onSubmit={handleSubmit}>
//                 <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>
//                     <div className="grid grid-cols-5 mb-3 gap-5">
//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Banner Tittle</h3>
//                             <input
//                                 type="text"
//                                 className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]'
//                                 name='bannerTitle'
//                                 value={formFields.bannerTitle}
//                                 onChange={onChangeInput}
//                             />
//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Banner Category</h3>
//                             {
//                                 context?.catData?.length !== 0 &&
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="productCatDrop"
//                                     className='w-full '
//                                     size='small'
//                                     value={productCat}
//                                     label="Product Category"
//                                     onChange={handleChangeProductCat}
//                                 >
//                                     {
//                                         context?.catData?.map((cat, index) => {
//                                             return (
//                                                 <MenuItem value={cat?._id} key={index}>{cat?.name}</MenuItem>
//                                             )
//                                         })
//                                     }
//                                 </Select>
//                             }
//                         </div>


//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Product Sub Category</h3>


//                             {
//                                 context?.catData?.length !== 0 &&
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="productCatDrop"
//                                     className='w-full '
//                                     size='small'
//                                     value={productSubCat}
//                                     label="Product Sub Category"
//                                     onChange={handleChangeProductSubCat}
//                                 >
//                                     {
//                                         context?.catData?.map((cat, index) => {
//                                             return (
//                                                 cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
//                                                     return (
//                                                         <MenuItem value={subCat?._id} key={index}>{subCat?.name}</MenuItem>
//                                                     )
//                                                 }
//                                                 ))
//                                         }

//                                         )
//                                     }
//                                 </Select>
//                             }

//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Product Third Level Category</h3>


//                             {
//                                 context?.catData?.length !== 0 &&
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="productCatDrop"
//                                     className='w-full '
//                                     size='small'
//                                     value={productThirdLevelCat}
//                                     label="Product Sub Category"
//                                     onChange={handleChangeProductThirdLevelCat}
//                                 >
//                                     {
//                                         context?.catData?.map((cat) => {
//                                             return (
//                                                 cat?.children?.length !== 0 &&
//                                                 cat?.children?.map((subCat) => {
//                                                     return (
//                                                         subCat?.children?.length !== 0 &&
//                                                         subCat?.children?.map((thirdLevelCat, index) => {
//                                                             return (
//                                                                 <MenuItem value={thirdLevelCat?._id} key={index} >
//                                                                     {thirdLevelCat?.name}
//                                                                 </MenuItem>
//                                                             );
//                                                         })
//                                                     );
//                                                 })
//                                             );
//                                         })
//                                     }

//                                 </Select>
//                             }

//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Price</h3>
//                             <input
//                                 type="number"
//                                 className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]'
//                                 name='price'
//                                 value={formFields.price}
//                                 onChange={onChangeInput}
//                             />
//                         </div>


// <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">AlignMent Of text</h3>


//                             {
//                                 context?.catData?.length !== 0 &&
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="productCatDrop"
//                                     className='w-full '
//                                     size='small'
//                                     value={alignInfo}
//                                     label="Product Sub Category"
//                                     onChange={handleChangeAlignInfo}
//                                 >
//                                 <MenuItem value={'left'}  >                                                     Left
//                                                                 </MenuItem>

//                                 <MenuItem value={'right'}  >Right                                                               </MenuItem>
//                                 </Select>
//                             }

//                         </div>
                        
//                     </div>

//                     <br />
//                     <h3 className="text-[14px] mb-0 font-[500]"> Image</h3>
//                     <br />
//                     <div className="grid grid-cols-7 gap-4">
//                         {
//                             previews.length > 0 && previews.map((image, index) => (
//                                 <div className="uploadBoxWrapper relative" key={index}>
//                                     <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
//                                         <IoMdClose className='text-white text-[17px]' />
//                                     </span>
//                                     <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
//                                         <img src={image} alt="product" className='w-full ' />
//                                     </div>
//                                 </div>
//                             ))
//                         }

//                         <UploadBox multiple={true} name="images" url="/api/bannerV1/uploadImages" setPreviewsFun={setPreviewsFun} />
//                     </div>
//                 </div>

//                  <br />
//                                 <Button type='submit' className='btn-blue  btn-lg w-full  flex gap-2'><FaCloudUploadAlt className="text-[25px] text-white" />
//                                     {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}</Button>


//             </form>
//         </section>

<section className='p-5 bg-gray-50'>
  <form className="form p-4 sm:p-6" onSubmit={handleSubmit}>
    <div className='scroll max-h-[75vh] overflow-y-scroll pr-2 pt-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-3 gap-5">
        
        {/* Banner Title */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Banner Title</h3>
          <input
            type="text"
            className='w-full h-10 border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-500'
            name='bannerTitle'
            value={formFields.bannerTitle}
            onChange={onChangeInput}
          />
        </div>

        {/* Banner Category */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Banner Category</h3>
          {
            context?.catData?.length !== 0 &&
            <Select
              className='w-full'
              size='small'
              value={productCat}
              onChange={handleChangeProductCat}
            >
              {context?.catData?.map((cat, index) => (
                <MenuItem value={cat?._id} key={index}>{cat?.name}</MenuItem>
              ))}
            </Select>
          }
        </div>

        {/* Product Sub Category */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Product Sub Category</h3>
          {
            context?.catData?.length !== 0 &&
            <Select
              className='w-full'
              size='small'
              value={productSubCat}
              onChange={handleChangeProductSubCat}
            >
              {context?.catData?.flatMap((cat) =>
                cat?.children?.map((subCat, index_) => (
                  <MenuItem value={subCat?._id} key={index_}>{subCat?.name}</MenuItem>
                ))
              )}
            </Select>
          }
        </div>

        {/* Third Level Category */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Product Third Level Category</h3>
          {
            context?.catData?.length !== 0 &&
            <Select
              className='w-full'
              size='small'
              value={productThirdLevelCat}
              onChange={handleChangeProductThirdLevelCat}
            >
              {context?.catData?.flatMap((cat) =>
                cat?.children?.flatMap((subCat) =>
                  subCat?.children?.map((thirdLevelCat, index) => (
                    <MenuItem value={thirdLevelCat?._id} key={index}>{thirdLevelCat?.name}</MenuItem>
                  ))
                )
              )}
            </Select>
          }
        </div>

        {/* Price */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Price</h3>
          <input
            type="number"
            className='w-full h-10 border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-500'
            name='price'
            value={formFields.price}
            onChange={onChangeInput}
          />
        </div>

        {/* Alignment */}
        <div className="col">
          <h3 className="text-sm font-medium mb-1">Alignment of Text</h3>
          <Select
            className='w-full'
            size='small'
            value={alignInfo}
            onChange={handleChangeAlignInfo}
          >
            <MenuItem value={'left'}>Left</MenuItem>
            <MenuItem value={'right'}>Right</MenuItem>
          </Select>
        </div>

      </div>

      {/* Image Section */}
      <div>
        <h3 className="text-sm font-medium mb-2">Image</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {
            previews.length > 0 && previews.map((image, index) => (
              <div className="uploadBoxWrapper relative" key={index}>
                <span
                  className='absolute w-5 h-5 rounded-full bg-red-700 -top-1 -right-1 flex items-center justify-center z-50 cursor-pointer'
                  onClick={() => removeImg(image, index)}
                >
                  <IoMdClose className='text-white text-sm' />
                </span>
                <div className="uploadBox h-[150px] w-full bg-gray-100 hover:bg-gray-200 rounded-md overflow-hidden border border-dashed border-gray-400 flex items-center justify-center">
                  <img src={image} alt="product" className='w-full h-full object-cover' />
                </div>
              </div>
            ))
          }

          <UploadBox
            multiple={true}
            name="images"
            url="/api/bannerV1/uploadImages"
            setPreviewsFun={setPreviewsFun}
          />
        </div>
      </div>

    </div>

    {/* Submit Button */}
    <div className='mt-6'>
      <Button type='submit' className='btn-blue w-full flex justify-center items-center gap-2'>
        <FaCloudUploadAlt className="text-2xl text-white" />
        {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
      </Button>
    </div>
  </form>
</section>


    )
}


export default EditBannerV1;