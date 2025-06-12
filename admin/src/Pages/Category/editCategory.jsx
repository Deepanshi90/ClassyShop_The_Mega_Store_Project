// import React, { useContext, useState } from 'react'
// import UploadBox from '../../Components/UploadBox';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { IoMdClose } from 'react-icons/io';
// import { Button } from '@mui/material';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { deleteImages, postData } from '../../utils Copy/api';
// import { MyContext } from '../../App';
// import CircularProgress from '@mui/material/CircularProgress';

// const AddCategory = () => {
// const context = useContext(MyContext)
//      const [previews, setPreviews] = useState([]);
//     const [formFields, setFormFields] = useState({
//         name: "",
//         images: [],
//     })
//      const [isLoading, setIsLoading] = useState(false);

//     const onChangeInput = (e) =>{
//         const { name, value } = e.target;
//           setFormFields(() => ({
//             ...formFields,
//             [name]: value,
//           }));
//     }
// // const setPreviewsFun = (previewsArr) =>{
// //     setPreviews(previewsArr);
// //     setFormFields(() =>({
// //         ...previews,
// //         images: previewsArr
// //     }
// //     ))
// // }

// const setPreviewsFun = (newPreviewsArr) => {
//     const updatedPreviews = [...previews, ...newPreviewsArr];
//     setPreviews(updatedPreviews);

//     setFormFields((prev) => ({
//         ...prev,
//         images: updatedPreviews
//     }));
// }

// const removeImg = (image,index) =>{
//     var imageArr = [];
//     imageArr = previews;
//     if(error === false){
//         deleteImages(`/api/category/deleteImage?img=${image}`).then((res) =>{
//             // console.log(res);
//            imageArr.splice(index,1);
//            setPreviews([]);
//            setTimeout(() =>{
//             setPreviews(imageArr);
//            },100);
           
//            setFormFields((prev) => ({
//             ...prev,
//             images: imageArr
//         }));
    
//             context.alertBox("success",res?.data?.message);
//         })
//     }
//     else{
//         context.alertBox("error",res?.data?.message);
//     }
// }

// const handleSubmit = (e) =>{
//     e.preventDefault();
//     setIsLoading(true);

//     if (formFields.name === "") {
//         context.alertBox("error", "Please enter Category Name");
//         setIsLoading(false);
//         return;
//       }

//       if (previews?.length === 0 ) {
//         context.alertBox("error", "Please select atleast one image");
//         setIsLoading(false);
//         return;
//       }

     
//         postData("/api/category/create",formFields).then((res) =>{
//             if(res?.error !== true){
//             console.log(res);
//             setIsLoading(false);
//             context.alertBox("success",res?.message);        
//      }
//      else{
//         setIsLoading(false);
//         context.alertBox("error",res?.message);
//      }
//     })
     
     
// }

//     return (
//         <section className='p-5 bg-gray-50'>
//             <form className="form p-8 py-3 " onSubmit={handleSubmit}>
//                 <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>


//                     <div className="grid grid-cols-1 mb-3">
//                         <div className="col w-[25%]">
//                             <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>
//                             <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]  ' name='name' onChange={onChangeInput} />
//                         </div>
//                     </div>

//                     <br />
//                     <h3 className="text-[14px] font-[500] mb-1">Category Image</h3>
//                     <br />
//                     <div className="grid grid-cols-7 gap-4">
// {
//     console.log(previews)
    
// }
//                         {
//                             previews?.length !== 0 && previews?.map((image,index)=>{
//                                 return(
// <div className="uploadBoxWrapper relative" key={index}>
//                             <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'onClick={() => removeImg(image,index)}><IoMdClose className='text-white text-[17px] ' /></span>
//                             <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">

//                                 {/* <LazyLoadImage
//                                     className='w-full h-full object-cover'
//                                     effect="blur"
//                                     wrapperProps={{
//                                         // If you need to, you can tweak the effect transition using the wrapper style.
//                                         style: { transitionDelay: "1s" },
//                                     }}
//                                     alt="image"
//                                     src={image}

//                                 /> */}
//                                 {/* <img src={image} alt="product image" className='w-full ' /> */}
//                                 <img key={image + index} src={image} alt="product" className='w-full' />


//                             </div>

//                         </div>
//                                 )
//                             })
//                         }
                        


//                         <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPreviewsFun={setPreviewsFun}/>
//                     </div>
//                 </div>

//                 <br />
//                 <br />
//                 <div className="w-[250px]">
//                     <Button type='submit' className='btn-blue  btn-lg w-full  flex gap-2 '><FaCloudUploadAlt className="text-[25px] text-white" />
//                     {isLoading === true ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
//                     </Button>

//                 </div>

//             </form>

//         </section>


//     )
// }

// export default AddCategory;



import React, { useContext, useEffect, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImages, editData, fetchDataFromApi, postData } from '../../utils Copy/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

const EditCategory= () => {
    const context = useContext(MyContext);
    const [previews, setPreviews] = useState([]);
    const [formFields, setFormFields] = useState({
        name: "",
        images: [],
    });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const id = context?.isOpenFullScreenPanel?.id;
    
        fetchDataFromApi(`/api/category/${id}`).then((res) => {
            const category = res?.category;
    
            if (category) {
                setFormFields({
                    name: category.name || "",
                    images: category.images || []
                });
                setPreviews(category.images || []);
            }
        });
    }, [context?.isOpenFullScreenPanel]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
    };
    const removeImg = (image, index) => {
        deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
            const imageArr = [...previews];
            imageArr.splice(index, 1);
            setPreviews(imageArr);
            setFormFields((prev) => ({
                ...prev,
                images: imageArr
            }));
            context.alertBox("success", res?.data?.message);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter Category Name");
            setIsLoading(false);
            return;
        }

        if (previews.length === 0) {
            context.alertBox("error", "Please select at least one image");
            setIsLoading(false);
            return;
        }

        editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
          
            if (!res?.error) {
                context.alertBox("success", res?.message || "Edit Data Successfully ");
                setFormFields({ name: "", images: [] });
                setPreviews([]);

                setTimeout(() =>{
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({
                        open: false,
                     
                    })
                },500)

            } else {
                context.alertBox("error", res?.message || "Not able to edit data now Please try in some time");
            }
        });
    };

    return (
        // <section className='p-5 bg-gray-50'>
        //     <form className="form p-8 py-3" onSubmit={handleSubmit}>
        //         <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>
        //             <div className="grid grid-cols-1 mb-3">
        //                 <div className="col w-[25%]">
        //                     <h3 className="text-[14px] font-[500] mb-1">Category Name</h3>
        //                     <input
        //                         type="text"
        //                         className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]'
        //                         name='name'
        //                         value={formFields.name}
        //                         onChange={onChangeInput}
        //                     />
        //                 </div>
        //             </div>

        //             <br />
        //             <h3 className="text-[14px] font-[500] mb-1">Category Image</h3>
        //             <br />
        //             <div className="grid grid-cols-7 gap-4">
        //                 {
        //                     previews.length > 0 && previews.map((image, index) => (
        //                         <div className="uploadBoxWrapper relative" key={index}>
        //                             <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
        //                                 <IoMdClose className='text-white text-[17px]' />
        //                             </span>
        //                             <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
        //                                 <img src={image} alt="product" className='w-full ' />
        //                             </div>
        //                         </div>
        //                     ))
        //                 }

        //                 <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPreviewsFun={setPreviewsFun} />
        //             </div>
        //         </div>

        //         <br />
        //         <div className="w-[250px]">
        //             <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
        //                 <FaCloudUploadAlt className="text-[25px] text-white" />
        //                 {isLoading ? <CircularProgress color="inherit" size={24} /> : "Save Changes"}
        //             </Button>
        //         </div>
        //     </form>
        // </section>

        <section className="p-4 sm:p-6 md:p-8 bg-gray-50">
  <form className="form p-4 sm:p-6 md:p-8" onSubmit={handleSubmit}>
    <div className="scroll max-h-[75vh] overflow-y-scroll pr-2 sm:pr-4 pt-4 space-y-6">

      {/* Category Name Field */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="w-full">
          <h3 className="text-sm font-medium mb-1">Category Name</h3>
          <input
            type="text"
            className="w-full h-10 border border-[rgba(0,0,0,0.2)] rounded-sm px-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]"
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
          />
        </div>
      </div>

      {/* Category Image Label */}
      <div>
        <h3 className="text-sm font-medium mb-2">Category Image</h3>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {previews.length > 0 &&
            previews.map((image, index) => (
              <div className="relative" key={index}>
                <span
                  className="absolute w-5 h-5 rounded-full bg-red-700 -top-1 -right-1 flex items-center justify-center z-50 cursor-pointer"
                  onClick={() => removeImg(image, index)}
                >
                  <IoMdClose className="text-white text-xs" />
                </span>
                <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <img src={image} alt="product" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}

          {/* Upload Box Component */}
          <UploadBox
            multiple={true}
            name="images"
            url="/api/category/uploadImages"
            setPreviewsFun={setPreviewsFun}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full sm:w-[250px]">
        <Button type="submit" className="btn-blue btn-lg w-full flex items-center justify-center gap-2">
          <FaCloudUploadAlt className="text-xl text-white" />
          {isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  </form>
</section>

    );
};

export default EditCategory;
