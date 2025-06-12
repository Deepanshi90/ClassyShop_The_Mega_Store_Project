import HomeSliderModel from "../models/homeSlider.model.js";

import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

// image uplaoad
var imagesArr = [];

export async function uploadImages(request, response) {
    try {
        imagesArr = [];
        const image = request.files;
// console.log(image);

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        }

        for (let i = 0; i < request?.files?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    console.log(result);
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    console.log(request.files[i].filename);

                }
            )
        }

        return response.status(200).json({
            images: imagesArr
        })
    } catch (error) {
        console.error("Image Loding  Error from cloudinary:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }

}


export async function addHomeSlide(request, response) {
    try {
        let slide = new HomeSliderModel({
            images: imagesArr,
        })

        if (!slide) {
            console.error(" Slide not created ", error);
            return response.status(500).json({
                message: error.message || error || "Slide Not Created",
                error: true,
                success: false
            });
        }

        slide = await slide.save();
        imagesArr = [];

        return response.status(200).json({
            message: "Slide uploaded Successfully",
            error: false,
            success: true,
            slide: slide
        })


    } catch (error) {
        console.error("Slide created Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export async function getHomeSlides(request, response) {
    try {
        const slides = await HomeSliderModel.find();

        if(!slides){
            return response.status(500).json({
                message: "Slided not found"||error.message || error || "Something went wrong",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: slides
        });

    } catch (error) {
        console.error("Slides Loading Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}


export async function getSlide(request, response) {
    try {
        const slide = await HomeSliderModel.findById(request.params.id);
        if (!slide) {
            response.status(500).json({
                message: "The slide  with the given id was not found",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
           slide: slide
        })
    } catch (error) {
        console.error("Get category", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}


export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;
        console.log(imgUrl);
        
        const userId = request.userId;


        if (!imgUrl) {
            return response.status(400).json({
                message: "Image URL is required",
                error: true,
                success: false,
            });
        }

        // Extracting the image public ID from URL
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        if (!imageName) {
            return response.status(400).json({
                message: "Invalid image URL format",
                error: true,
                success: false,
            });
        }

        // Destroy image from Cloudinary
        const res = await cloudinary.uploader.destroy(imageName);

        if (res.result === "ok") {
            return response.status(200).json({
                message: "Image removed successfully from Cloudinary",
                success: true,
            });
        } else {
            return response.status(500).json({
                message: "Failed to remove image from Cloudinary",
                error: true,
                success: false,
            });
        }
    } catch (error) {
        console.error("Error removing image from Cloudinary:", error);
        return response.status(500).json({
            message: "Something went wrong",
            error: true,
            success: false,
        });
    }
}


export async function deleteSlide(request, response) {
  
        // console.log("Deleting Slide ID:", request.params.id);

        // const slide = await HomeSliderModel.findById(request.params.id);
        // console.log("Found Slide:", slide);

        // if (!slide) {
        //     return response.status(404).json({
        //         message: "Slide not found",
        //         success: false,
        //         error: true
        //     });
        // }

        // const images = slide.images;
        // console.log("Image URLs:", images);

        // if (images && images.length > 0) {
        //     for (const imgUrl of images) {
        //         const urlArr = imgUrl.split("/");
        //         const image = urlArr[urlArr.length - 1];
        //         const imageName = image.split(".")[0];

        //         console.log("Deleting image from Cloudinary:", imageName);
        //         await cloudinary.uploader.destroy(imageName);
        //     }
        // }

        // // Delete subcategories and their subcategories
        // // const subCategories = await HomeSliderModel.find({ parentId: request.params.id });
        // // console.log("Subcategories found:", subCategories.length);

        // // for (let subCat of subCategories) {
        // //     const thirdSubCategories = await HomeSliderModel.find({ parentId: subCat._id });
        // //     console.log(`Third-level subcategories for ${subCat._id}:`, thirdSubCategories.length);

        // //     for (let thirdSubCat of thirdSubCategories) {
        // //         console.log("Deleting third-level subcategory:", thirdSubCat._id);
        // //         await HomeSliderModel.findByIdAndDelete(thirdSubCat._id);
        // //     }

        // //     console.log("Deleting subcategory:", subCat._id);
        // //     await HomeSliderModel.findByIdAndDelete(subCat._id);
        // // }

        // console.log("Deleting main category:", request.params.id);
        // await HomeSliderModel.findByIdAndDelete(request.params.id);

        // response.status(200).json({
        //     success: true,
        //     message: "Category deleted!",
        //     error: false
        // });
        try {
        const slide = await HomeSliderModel.findById(request.params.id);
        const images = slide.images;
    let img = "";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            cloudinary.uploader.destroy(imageName, (error, result) => {
                // console.log(error, result);
            });
        }

    } 
    const deletedSlide = await HomeSliderModel.findByIdAndDelete(request.params.id);

    if(!deletedSlide){
        response.status(500).json({
            success: false,
            message: "Slide Not found",
            error: true
        });
    }

    
     return response.status(200).json({
            success: true,
            message: "Slide deleted!",
            error: false
        });
}
    catch (error) {
        console.error("Error in deleteCategory:", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}


export async function updatedSlide(request, response) {
    console.log(imagesArr);
    
    const slide = await HomeSliderModel.findByIdAndUpdate(
        request.params.id,
        {
            images: imagesArr.length>0? imagesArr[0]: request.body.images,
        },
        {new: true}
    );
    if(!slide){
        return response.status(500).json({
            message:"Slides cannot be updated!",
            error:true,
            success:false
        })
    }

    imagesArr = [];
  return  response.status(200).json({
        error:false,
        success:true,
        slide: slide,
        message:"Slide Updated successfully!"
    })
}

export async function deleteMultipleSlides(request, response) {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids)) {
        return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
    }

    for (let i = 0; i < ids.length; i++) {
        const slides = await HomeSliderModel.findById(ids[i]);

        const images = slides.images;
        let img = "";

        for (img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];
            if(imageName){
                cloudinary.uploader.destroy(imageName,(error,result)=>{
                    // console.log(error,result);
                    
                })
            }
        }

            try {
                await HomeSliderModel.deleteMany({ _id: { $in: ids } });
                return response.status(200).json({
                    message: "Slides delete successfully",
                    error: false,
                    success: true
                });
            } catch (error) {
                console.log("error from delete many product");
                
                return response.status(500).json({
                    message: error.message || error,
                    error: true,
                    success: false
                });
            }
        
    }
}