// import React, { useContext, useEffect, useState } from 'react'
// import UploadBox from '../../Components/UploadBox';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { IoMdClose } from 'react-icons/io';
// import { Button, CircularProgress } from '@mui/material';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { MyContext } from '../../App';
// import { deleteImages, editData, postData } from '../../utils Copy/api';
// import {useNavigate} from "react-router-dom"

// const EditHomeSlide = () => {
//      const context = useContext(MyContext);
//         const [previews, setPreviews] = useState([]);
//         const [formFields, setFormFields] = useState({
//             images: [],
//         });
//         const [isLoading, setIsLoading] = useState(false);
// const history = useNavigate();


//          // ✅ FIXED: Reset previews before setting new ones
//             const setPreviewsFun = (newPreviewsArr) => {
//                 context.alertBox("success","Image Uploaded Successfully");
//                 setPreviews((prev) => {
//                     // Remove duplicates using Set or simple filtering
//                     const merged = [...prev, ...newPreviewsArr.filter(img => !prev.includes(img))];
                    
//                     setFormFields((formFields) => ({
//                         ...formFields,
//                         images: merged
//                     }));
                   
//                     return merged;
                  
//                 });
//             };
//             const removeImg = (image, index) => {
//                 deleteImages(`/api/homeSlides/deleteImage?img=${image}`)
//           .then((res) => {
//             const imageArr = [...previews];
//             imageArr.splice(index, 1);
//             setPreviews(imageArr);
//             setFormFields((prev) => ({
//                 ...prev,
//                 images: imageArr
//             }));
//             context.alertBox("success", res?.data?.message);
//           })
//           .catch((err) => {
//             context.alertBox("error", "Failed to delete image. Please try again.");
//           });
        
//             };

//             const handleSubmit = (e) => {
//                     e.preventDefault();
//                     setIsLoading(true);
            
//                     if (previews.length === 0) {
//                         context.alertBox("error", "Please select at least one image");
//                         setIsLoading(false);
//                         return;
//                     }
            
//                    editData(`/api/homeSlides/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
//                         if (!res?.error) {
//                             context.alertBox("success", res?.message);
//                             setFormFields({ name: "", images: [] });
//                             setPreviews([]);
                    
//                             setTimeout(() => {
//                                 setIsLoading(false);
//                                 context.setIsOpenFullScreenPanel({ open: false });
//                                 // context?.getHomeSlides();

// history("/homeSlider/list")
            
//                             }, 500);
//                         } else {
//                             setIsLoading(false); // Add this
//                             context.alertBox("error", res?.message);
//                         }
//                     }).catch(() => {
//                         setIsLoading(false); // Handle catch too
//                         context.alertBox("error", "Failed to submit category. Try again later.");
//                     });
//                 };

                
//     return (
//         <section className=' bg-gray-50'>
//             <form className="form py-1 p-1 md:p-8 md:py-1" onSubmit={handleSubmit}>
//                 <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>
// <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
//                         {
//                             previews.length > 0 && previews.map((image, index) => (
//                                 <div className="uploadBoxWrapper mr-3 relative" key={index}>
//                                     <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}>
//                                         <IoMdClose className='text-white text-[17px]' />
//                                     </span>
//                                     <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
//                                         <img src={image} alt="product" className='w-full ' />
//                                     </div>
//                                 </div>
//                             ))
//                         }

//                         <UploadBox multiple={false} name="images" url="/api/homeSlides/uploadImages" setPreviewsFun={setPreviewsFun} />
//                     </div>
//                 </div>

//               <br />
//                 <br />
//                 <div className="w-[250px]">
//                                    <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
//                                        <FaCloudUploadAlt className="text-[25px] text-white" />
//                                        {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
//                                    </Button>
//                                </div>
//             </form>
//         </section>
//     )
// }

// export default EditHomeSlide;





import React, { useContext, useEffect, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, editData } from '../../utils Copy/api';
import { useNavigate } from "react-router-dom";

const EditHomeSlide = () => {
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [formFields, setFormFields] = useState({
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const modelId = context?.isOpenFullScreenPanel?.modelId;

  // ✅ Load specific slide
  useEffect(() => {
    if (!modelId) return;

    fetch('/api/homeSlides') // Get ALL slides
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          const selectedSlide = res.data.find(slide => slide._id === modelId);
          if (selectedSlide) {
            setPreviews(selectedSlide.images || []);
            setFormFields({ images: selectedSlide.images || [] });
          } else {
            context.alertBox("error", "Slide not found");
          }
        }
      })
      .catch(() => {
        context.alertBox("error", "Failed to fetch slide");
      });
  }, [modelId]);

  const setPreviewsFun = (newPreviewsArr) => {
    context.alertBox("success", "Image Uploaded Successfully");
    const merged = [...previews, ...newPreviewsArr];
    setPreviews(merged);
    setFormFields((prev) => ({
      ...prev,
      images: merged
    }));
  };

  const removeImg = (image, index) => {
    deleteImages(`/api/homeSlides/deleteImage?img=${image}`)
      .then((res) => {
        const newImages = [...previews];
        newImages.splice(index, 1);
        setPreviews(newImages);
        setFormFields((prev) => ({
          ...prev,
          images: newImages
        }));
        context.alertBox("success", res?.data?.message);
      })
      .catch(() => {
        context.alertBox("error", "Failed to delete image. Please try again.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.images.length === 0) {
      context.alertBox("error", "Please upload at least one image");
      setIsLoading(false);
      return;
    }

    editData(`/api/homeSlides/${modelId?.id}`, formFields)
      .then((res) => {
        if (!res?.error) {
          context.alertBox("success", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            context.setIsOpenFullScreenPanel({ open: false });
            navigate("/homeSlider/list");
          }, 500);
        } else {
          setIsLoading(false);
          context.alertBox("error", res?.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        context.alertBox("error", "Failed to update. Try again later.");
      });
  };

  return (
    <section className='bg-gray-50 min-h-screen p-2 md:p-6'>
      <form className="bg-white rounded-xl shadow-md p-4 md:p-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Edit Slide</h2>

        <div className='scroll max-h-[75vh] overflow-y-auto pr-2'>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {previews.map((image, index) => (
              <div className="relative" key={index}>
                <span
                  className='absolute top-[-5px] right-[-5px] w-5 h-5 bg-red-700 text-white flex items-center justify-center rounded-full z-50 cursor-pointer'
                  onClick={() => removeImg(image, index)}
                >
                  <IoMdClose size={14} />
                </span>
                <div className="uploadBox h-[150px] w-full overflow-hidden border border-dashed border-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <img src={image} alt="slide" className='object-cover w-full h-full' />
                </div>
              </div>
            ))}

            <UploadBox
              multiple={false}
              name="images"
              url="/api/homeSlides/uploadImages"
              setPreviewsFun={setPreviewsFun}
            />
          </div>
        </div>

        <div className="mt-6 w-full sm:w-[250px]">
          <Button type='submit' className='btn-blue btn-lg w-full flex gap-2 items-center justify-center !bg-blue-600 text-white'>
            <FaCloudUploadAlt className="text-[22px]" />
            {isLoading ? <CircularProgress color="inherit" size={22} /> : "Update Slide"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditHomeSlide;
