import React, { useContext, useState } from 'react';
import UploadBox from '../../Components/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteImages, postData } from '../../utils Copy/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';


const AddBlog = () => {
    const context = useContext(MyContext);
    const [previews, setPreviews] = useState([]);
    const [html, setHtml] = useState('');
    const [formFields, setFormFields] = useState({
        title: "",
        images: [],
        description:"",

    });
    const [isLoading, setIsLoading] = useState(false);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const history = useNavigate();

    // ✅ FIXED: Reset previews before setting new ones
    const setPreviewsFun = (newPreviewsArr) => {
        setPreviews((prev) => {
            // Remove duplicates using Set or simple filtering
            const merged = [...prev, ...newPreviewsArr.filter(img => !prev.includes(img))];
            setFormFields((formFields) => ({
                ...formFields,
                images: merged
            }));
            context.alertBox("success","Image Uploaded Successfully");
            return merged;
          
        });
    };
    const removeImg = (image, index) => {
        deleteImages(`/api/blog/deleteImage?img=${image}`)
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

    const onChangeDescription = (e) =>{
        setHtml(e.target.value)
        formFields.description = e.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.title === "") {
            context.alertBox("error", "Please enter Title");
            setIsLoading(false);
            return;
        }

        if (formFields.description === "") {
            context.alertBox("error", "Please enter Description");
            setIsLoading(false);
            return;
        }

        if (previews.length === 0) {
            context.alertBox("error", "Please select at least one image");
            setIsLoading(false);
            return;
        }
 console.log(formFields);
 
        postData("/api/blog/add", formFields).then((res) => {
            if (!res?.error) {
                context.alertBox("success", res?.message);
                setFormFields({ name: "", images: [] });
                setPreviews([]);
        
                setTimeout(() => {
                    setIsLoading(false);
                    context.setIsOpenFullScreenPanel({ open: false });
                    history("/blog/list")
                    context?.getCat();

                }, 500);
            } else {
                setIsLoading(false); // Add this
                context.alertBox("error", res?.message);
            }
        }).catch(() => {
            setIsLoading(false); // Handle catch too
            context.alertBox("error", "Failed to submit Blog. Try again later.");
        });
    };

    return (
//         <section className='p-5 bg-gray-50'>
//             <form className="form p-8 py-3" onSubmit={handleSubmit}>
//                 <div className='scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4'>
//                     <div className="grid grid-cols-1 mb-3">
//                         <div className="col w-[100%]">
//                             <h3 className="text-[14px] font-[500] mb-1">Title</h3>
//                             <input
//                                 type="text"
//                                 className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-3 text-sm focus:outline-none focus:border-[rgba(0,0,0,0.4)]'
//                                 name='title'
//                                 value={formFields.title}
//                                 onChange={onChangeInput}
//                             />
//                         </div>
//                     </div>

//  <div className="grid grid-cols-1 mb-3">
//                         <div className="col w-[100%]">
//                             <h3 className="text-[14px] font-[500] mb-1">Description</h3>
//                             <Editor value={html} onChange={onChangeDescription} 
//                                 containerProps={{style:{resize:'vertical'}}}/>
                            
//                         </div>
//                     </div>


//                     <br />
//                     <h3 className="text-[14px] font-[500] mb-1">Blog Image</h3>
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

//                         <UploadBox multiple={true} name="images" url="/api/blog/uploadImages" setPreviewsFun={setPreviewsFun} />
//                     </div>
//                 </div>

//                 <br />
//                 <div className="w-[250px]">
//                     <Button type='submit' className='btn-blue btn-lg w-full flex gap-2'>
//                         <FaCloudUploadAlt className="text-[25px] text-white" />
//                         {isLoading ? <CircularProgress color="inherit" size={24} /> : "Publish and View"}
//                     </Button>
//                 </div>
//             </form>
//         </section>

<section className='p-4 sm:p-5 bg-gray-50'>
  <form className="form p-4 sm:p-6 md:p-8 py-3" onSubmit={handleSubmit}>
    <div className='max-h-[75vh] overflow-y-auto pr-2 sm:pr-4 pt-4'>
      
      {/* Title */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1 block">Title</label>
        <input
          type="text"
          className='w-full h-10 border border-gray-300 rounded-sm px-3 text-sm focus:outline-none focus:border-gray-500'
          name='title'
          value={formFields.title}
          onChange={onChangeInput}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-sm font-medium mb-1 block">Description</label>
        <Editor 
          value={html} 
          onChange={onChangeDescription} 
          containerProps={{ style: { resize: 'vertical' } }} 
        />
      </div>

      {/* Image Upload Section */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Blog Image</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {previews.length > 0 && previews.map((image, index) => (
            <div className="relative" key={index}>
              <button 
                type="button"
                className='absolute w-5 h-5 rounded-full bg-red-700 -top-1 -right-1 flex items-center justify-center z-50 text-white text-xs'
                onClick={() => removeImg(image, index)}
              >
                <IoMdClose />
              </button>
              <div className="rounded-md overflow-hidden border border-dashed border-gray-400 h-[150px] bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <img src={image} alt="preview" className='w-full h-full object-cover' />
              </div>
            </div>
          ))}

          <UploadBox multiple={true} name="images" url="/api/blog/uploadImages" setPreviewsFun={setPreviewsFun} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 w-full sm:w-[250px]">
        <Button type='submit' className='btn-blue btn-lg w-full flex gap-2 items-center justify-center'>
          <FaCloudUploadAlt className="text-xl text-white" />
          {isLoading ? <CircularProgress color="inherit" size={20} /> : "Publish and View"}
        </Button>
      </div>
    </div>
  </form>
</section>


);
};

export default AddBlog;
