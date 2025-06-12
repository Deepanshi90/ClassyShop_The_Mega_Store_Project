import React, { useContext, useState } from 'react'
import { FaRegImages } from 'react-icons/fa6';
import { MyContext } from '../../App';
import { uploadImage, uploadImages } from '../../utils Copy/api';
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {

  const [previews, setPreviews] = useState([]);
   const [uploading, setUploading] = useState(false);

    let selectedImages = [];
   const context = useContext(MyContext);
   
       const formdata = new FormData();
       const onChangeFile = async (e, apiEndPoint) => {
           try {
               setPreviews([]);
   
               const files = e.target.files;
               setUploading(true);
   
              //  console.log(files);
   
               for (var i = 0; i < files.length; i++) {
                   if (
                       files[i] &&
                       (
                           files[i].type === "image/jpeg" ||
                           files[i].type === "image/jpg" ||
                           files[i].type === "image/png" ||
                           files[i].type === "image/webp")
                   ) {
                       const file = files[i];
                       selectedImages.push(file);
                       formdata.append(props?.name , file);
                      //  alert(props.name)
   
                   } else {
                       context.alertBox("error", "Please select a valid JPG , PNG or WEPG image file.");
                       setUploading(false);
                       return false;
                   }
               }
               uploadImages(apiEndPoint, formdata).then((res) => {
                setUploading(false);
                // props.setPreviews(res?.data?.images)
                props.setPreviewsFun(res?.data?.images);
                console.log(res?.data?.images);
                
                
            })
   
           } catch (error) {
               console.log("Error from AccountSidebar", error);
   
   
           }
       }
  return (
    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%]] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">

        {
            uploading === true ? <>
             <CircularProgress />
             <h4 className="text-center ">Uploading...</h4>
             </> :
            <>
              <FaRegImages className='text-[40px] opacity-35 pointer-events-none' />
        <h4 className="text-[14px] pointer-events-none">Image Upload</h4>
        
        <input type="file" accept='image/*' multiple={props.multiple !== undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full z-50 opacity-0'  onChange={(e) => {
                                onChangeFile(e, props?.url)
                            }} name="images" />
            </>

        }
       
      
    </div>
  )
}

export default UploadBox;