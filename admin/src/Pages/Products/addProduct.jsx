import React, { useContext, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from 'react-icons/io';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, fetchDataFromApi, postData } from '../../utils Copy/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRef } from 'react';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}

const AddProduct = () => {

    const history = useNavigate();
    // const navigate = useNavigate();

    const context = useContext(MyContext);
    const [previews, setPreviews] = useState([]);
    const [formFields, setFormFields] = useState({
        name: "",
        description: "",
        images: [],
        brand: "",
        price: "",
        oldPrice: "",
        category: "",
        catName: "",
        catId: "",
        subCatId: "",
        subCat: "",
        thirdsubCat: "",
        thirdsubCatId: "",
        countInStock: "",
        rating: "",
        isFeatured: false,
        discount: "",
        productRam: [],
        size: [],
        productWeight: [],
        // bannerTitleName : "",
        // bannerimages: []

    });

    const [isLoading, setIsLoading] = useState(false);

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productRams, setProductRams] = useState([]);
    const [productRamsData, setProductRamsData] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);
    const [productSize, setProductSize] = useState([]);
    const [productSizeData, setProductSizeData] = useState([]);
    const [productThirdLevelCat, setProductThirdLevelCat] = useState('');
    const [bannerPreviews , setBannerPreviews] = useState([]);

useEffect(() =>{
    fetchDataFromApi("/api/product/productRAMS/get").then((res) =>{
        if(res?.error === false){
            // console.log(res?.data);
            setProductRamsData(res?.data)
        }
       
        
    })

    fetchDataFromApi("/api/product/productWeight/get").then((res) =>{
        if(res?.error === false){
            // console.log(res?.data);
            setProductWeightData(res?.data)
        }
       
        
    })

    fetchDataFromApi("/api/product/productSize/get").then((res) =>{
        if(res?.error === false){
            // console.log(res?.data);
            setProductSizeData(res?.data)
        }
       
        
    })
},[])

    const handleChangeProductCat = (event) => {
        // setProductCat(event.target.value);
        // formFields.catId = event.target.value;
        formFields.category = event.target.value;
        const value = event.target.value;
        setProductCat(value);
        setFormFields(prev => ({
            ...prev,
            catId: value,
            category: value
        }));

        // alert(event.target.value)
    };

    const selectCatByName = (name) => {
        // formFields.catName =name;
        // alert(name);
        setFormFields(prev => ({
            ...prev,
            catName: name
        }));
    }

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

    const selectSubCatByName = (name) => {
        // formFields.subCat =name;
        // alert(name);
        setFormFields(prev => ({
            ...prev,
            subCat: name
        }));

    }

    // const handleChangeProductThirdLevelCat = (event) =>{
    //     setProductThirdLevelCat(event.target.value);
    //     formFields.thirdsubCatId = event.target.value;
    //     // alert(event.target.value)
    // }

    // const selectSubCatByThirdLevel = (name) =>{
    //     formFields.thirdsubCat =name;
    //     // alert(name);
    // }

    // const handleChangeProductThirdLevelCat = (event) => {
    //     const value = event.target.value;
    //     setProductThirdLevelCat(value);
    //     setFormFields(prev => ({
    //         ...prev,
    //         thirdsubCatId: value
    //     }));
    // };

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


    const selectSubCatByThirdLevel = (name) => {
        setFormFields(prev => ({
            ...prev,
            thirdsubCat: name
        }));
    };

    const handleChangeProductFeatured = (event) => {
        setProductFeatured(event.target.value);
        formFields.isFeatured = event.target.value;
    };
    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams(
            // on autofill we get a stringified value
            typeof value === "string" ? value.split(",") : value
        );
        formFields.productRam = value;
        // setProductRams(event.target.value);
    };
    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;
        setProductWeight(
            // on autofill we get a stringified value
            typeof value === "string" ? value.split(",") : value
        );
        formFields.productWeight = value;
    };
    const handleChangeProductSize = (event) => {
        const {
            target: { value },
        } = event;
        setProductSize(
            // on autofill we get a stringified value
            typeof value === "string" ? value.split(",") : value
        );
        formFields.size = value;
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onChangeRating = (e) => {
        setFormFields((formFields) => (
            {
                ...formFields,
                rating: e.target.value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formFields);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter product name");
            return false;
        }
        if (formFields.description === "") {
            context.alertBox("error", "Please enter description");
            return false;
        }
        if (formFields.catId === "") {
            context.alertBox("error", "Please select main  product category ");
            return false;
        }

        // if(formFields.subCatId === ""){
        //     context.alertBox("error","Please second category of the product");
        //     return false;
        // }

        if (formFields.price === "") {
            context.alertBox("error", "Please enter product price");
            return false;
        }

        if (formFields.oldPrice === "") {
            context.alertBox("error", "Please enter product old price");
            return false;
        }

        if (formFields.countInStock === "") {
            context.alertBox("error", "Please enter count in stock");
            return false;
        }

        if (formFields.brand === "") {
            context.alertBox("error", "Please enter Product Brand");
            return false;
        }

        if (formFields.rating === "") {
            context.alertBox("error", "Please enter product rating");
            return false;
        }

        if (formFields.discount === "") {
            context.alertBox("error", "Please enter product discount");
            return false;
        }

        if (previews?.length === 0) {
            context.alertBox("error", "Please select atleat one image");
            return false;
        }

        // if (bannerPreviews?.length === 0) {
        //     context.alertBox("error", "Please select atleat one Banner image");
        //     return false;
        // }

        // if (formFields.bannerTitleName === "") {
        //     context.alertBox("error", "Please enter Banner Tittle");
        //     return false;
        // }
        

        setIsLoading(true);
console.log(formFields);

        postData("/api/product/create", formFields).then((res) => {
            console.log(res);

            if (res?.error === false) {
                context.alertBox("success", res?.message);
                setTimeout(() => {

                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({ open: false });
                    history("/products");
                }, 1000)


                // navigate("/products");
            }
            else {
                setIsLoading(false);
                context.alertBox("error", res?.message);
            }


        })

    }

    // ✅ FIXED: Reset previews before setting new ones
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

    const deletedImagesRef = useRef([]); // 🔁 persists across renders

    // const removeBannerImg = (image, index) => {
    //     deleteImages(`/api/category/deleteImage?img=${image}`)
    //         .then((res) => {
    //             deletedImagesRef.current.push(image); // Track it
    
    //             const updatedArr = bannerPreviews.filter(img => img !== image);
    //             setBannerPreviews(updatedArr);
    //             setFormFields(prev => ({
    //                 ...prev,
    //                 bannerimages: updatedArr
    //             }));
    //             context.alertBox("success", res?.data?.message);
    //         })
    //         .catch(() => {
    //             context.alertBox("error", "Failed to delete image. Please try again.");
    //         });
    // };
    
// Then update setBannerImagesFun like this:
// const setBannerImagesFun = (newPreviewsArr) => {
//     const uniqueImages = [
//         ...bannerPreviews,
//         ...newPreviewsArr.filter(img =>
//             !bannerPreviews.includes(img) &&
//             !deletedImagesRef.current.includes(img)
//         )
//     ];

//     setBannerPreviews(uniqueImages);
//     setFormFields((formFields) => ({
//         ...formFields,
//         bannerimages: uniqueImages
//     }));

//     context.alertBox("success", "Image Uploaded Successfully");
// };

    // const setBannerImagesFun = (newPreviewsArr) => {
    //     // Use the latest state directly instead of merging with stale 'prev'
    //     const merged = [...bannerPreviews, ...newPreviewsArr.filter(img => !bannerPreviews.includes(img))];
    
    //     setBannerPreviews(merged);
    //     setFormFields((formFields) => ({
    //         ...formFields,
    //         bannerimages: merged
    //     }));
    
    //     context.alertBox("success", "Image Uploaded Successfully");
    // };
    

    const removeImg = (image, index) => {
        deleteImages(`/api/category/deleteImage?img=${image}`)
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


    
    // const removeBannerImg = (image, index) => {
    //     deleteImages(`/api/category/deleteImage?img=${image}`)
    //         .then((res) => {
    //             const imageArr = [...previews];
    //             imageArr.splice(index, 1);
    //             setBannerPreviews(imageArr);
    //             setFormFields((prev) => ({
    //                 ...prev,
    //                 bannerimages: imageArr
    //             }));
    //             context.alertBox("success", res?.data?.message);
    //         })
    //         .catch((err) => {
    //             context.alertBox("error", "Failed to delete image. Please try again.");
    //         });

    // };


    return (
        <section className=' bg-gray-50'>
            <form className="form py-1 p-1 md:p-8 md:py-1 " onSubmit={handleSubmit}>
                <div className='scroll max-h-[75vh] overflow-y-scroll pr-4'>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Name</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="name" value={formFields.name} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Description</h3>
                            <textarea type="text" className='w-full h-[140px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]' name="description" value={formFields.description} onChange={onChangeInput} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  mb-3 gap-4">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Category</h3>
                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    className='w-full '
                                    size='small'
                                    value={productCat}
                                    label="Product Category"
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                <MenuItem value={cat?._id} onClick={() => selectCatByName(cat?.name)}>{cat?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }

                        </div>


                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Sub Category</h3>


                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    className='w-full '
                                    size='small'
                                    value={productSubCat}
                                    label="Product Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        context?.catData?.map((cat, index) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem value={subCat?._id} onClick={() => selectSubCatByName(subCat?.name)}>{subCat?.name}</MenuItem>
                                                    )
                                                }
                                                ))
                                        }

                                        )
                                    }
                                </Select>
                            }

                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Third Level Category</h3>


                            {
                                context?.catData?.length !== 0 &&
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    className='w-full '
                                    size='small'
                                    value={productThirdLevelCat}
                                    label="Product Sub Category"
                                    onChange={handleChangeProductThirdLevelCat}
                                >
                                    {
                                        context?.catData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 &&
                                                cat?.children?.map((subCat) => {
                                                    return (
                                                        subCat?.children?.length !== 0 &&
                                                        subCat?.children?.map((thirdLevelCat, index) => {
                                                            return (
                                                                <MenuItem value={thirdLevelCat?._id} key={index} onClick={() => selectSubCatByThirdLevel(thirdLevelCat?.name)}>
                                                                    {thirdLevelCat?.name}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    );
                                                })
                                            );
                                        })
                                    }
                                    {/* 
{
    context?.catData?.map((cat) =>
        cat?.children?.length !== 0 &&
        cat?.children?.map((subCat) =>
            subCat?.children?.length !== 0 &&
            subCat?.children?.map((thirdLevelCat, index) => (
                <MenuItem value={thirdLevelCat?._id} key={index}>
                    {thirdLevelCat?.name}
                </MenuItem>
            ))
        )
    )
} */}

                                </Select>
                            }

                        </div>


                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Price</h3>
                            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)] ' name="price" value={formFields.price} onChange={onChangeInput} />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Old Price</h3>
                            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)] ' name="oldPrice" value={formFields.oldPrice} onChange={onChangeInput} />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Is Featured?</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                className='w-full '
                                size='small'
                                value={productFeatured}
                                label="Product Category"
                                onChange={handleChangeProductFeatured}
                            >

                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>


                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Stock</h3>
                            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)] ' name="countInStock" value={formFields.countInStock} onChange={onChangeInput} />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Brand</h3>
                            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)] ' name="brand" value={formFields.brand} onChange={onChangeInput} />
                        </div>



                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  mb-3 gap-4">

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Discount</h3>
                            <input type="number" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)] ' name="discount" value={formFields.discount} onChange={onChangeInput} />
                        </div>


                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product RAMS</h3>

                            {
                                productRamsData?.length !== 0 && 
                                <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                className='w-full '
                                size='small'
                                value={productRams}
                                label="Product Category"
                                onChange={handleChangeProductRams}
                                MenuProps={MenuProps}
                            >
                                {
                                    productRamsData?.map((item,index) =>{
                                        return(
                                            <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            }
                           
                        </div>


                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Weight</h3>
                            {
                                productWeightData?.length !== 0 &&  

                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                className='w-full '
                                size='small'
                                value={productWeight}
                                label="Product Category"
                                onChange={handleChangeProductWeight}
                            >
                                {
                                    productWeightData?.map((item,index) =>{
                                        return(
                                            <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>}
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Size</h3>
                            {
                                productWeightData?.length !== 0 &&   
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                className='w-full '
                                size='small'
                                value={productSize}
                                label="Product Category"
                                onChange={handleChangeProductSize}
                            >
                                 {
                                    productSizeData?.map((item,index) =>{
                                        return(
                                            <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>}
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Rating</h3>
                            <Rating name="half-rating" defaultValue={1} precision={0.5} onChange={onChangeRating} />
                        </div>




                    </div>


                    {/* <div className="col w-full p-5 px-0">
                        <h3 className='font-[700] text-[18px] mb-3 '>Media ans Images</h3>


                        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                            {
                                previews.length > 0 && previews.map((image, index) => (
                                    <div className="uploadBoxWrapper relative" key={index}>
                                        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
                                            <IoMdClose className='text-white text-[17px]' />
                                        </span>
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                            <img src={image} alt="product" className='w-full ' />
                                        </div>
                                    </div>
                                ))
                            }

                            <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPreviewsFun={setPreviewsFun} />
                        </div>
                    </div> */}

<div className="w-full px-0 sm:px-5 py-5">
  <h3 className="font-bold text-[18px] sm:text-[20px] mb-3">Media and Images</h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
    {previews.length > 0 &&
      previews.map((image, index) => (
        <div className="relative" key={index}>
          {/* Close button */}
          <span
            className="absolute w-5 h-5 rounded-full bg-red-700 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer"
            onClick={() => removeImg(image, index)}
          >
            <IoMdClose className="text-white text-sm" />
          </span>

          {/* Image preview box */}
          <div className="rounded-md overflow-hidden border border-dashed border-gray-400 h-[150px] w-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center relative">
            <img src={image} alt="product" className="w-full h-full object-cover" />
          </div>
        </div>
      ))}

    {/* UploadBox stays at the end */}
    <UploadBox
      multiple={true}
      name="images"
      url="/api/product/uploadImages"
      setPreviewsFun={setPreviewsFun}
    />
  </div>
</div>


                    <div className="col w-full p-5 px-0">
                      

{/* <div className="shadow-md bg-white p-4 w-full">
<h3 className='font-[700] text-[18px] mb-3 '>Banner Images</h3>
<div className="grid grid-cols-7 gap-4 mb-3">
                            {
                                bannerPreviews.length > 0 && bannerPreviews.map((image, index) => (
                                    <div className="uploadBoxWrapper relative" key={index}>
                                        <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeBannerImg(image, index)}>
                                            <IoMdClose className='text-white text-[17px]' />
                                        </span>
                                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                            <img src={image} alt="product" className='w-full ' />
                                        </div>
                                    </div>
                                ))
                            }

                            <UploadBox multiple={true} name="bannerimages" url="/api/product/uploadBannerImages" setPreviewsFun={setBannerImagesFun} />
                        </div>
<br />
                        <h3 className='font-[700] text-[18px] mb-3 '>Banner Title</h3>

                        <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name="bannerTitleName" value={formFields.bannerTitleName} onChange={onChangeInput} />

</div>
                        */}
                    </div>


                </div>
                <hr className='text-[rgba(0,0,0,0.1)]' />
                <br />
                <Button type='submit' className='btn-blue  btn-lg w-full  flex gap-2'><FaCloudUploadAlt className="text-[25px] text-white" />
                    {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}</Button>
            </form>

        </section>
    )
}

export default AddProduct;