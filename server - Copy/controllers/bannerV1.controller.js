import BannerV1Model from "../models/bannerV1.model.js";

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


// add banner
export async function addBanner(request, response) {
    try {
        let banner = new BannerV1Model({
            bannerTitle: request.body.bannerTitle,
            images: imagesArr,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            thirdsubCatId: request.body.thirdsubCatId,
            price: request.body.price,
            alignInfo: request.body.alignInfo
        })

        if (!banner) {
            console.error(" Banner  not created ", error);
            return response.status(500).json({
                message: error.message || error || "Category Not Created",
                error: true,
                success: false
            });
        }

       banner = await banner.save();
        imagesArr = [];

        return response.status(200).json({
            message: "Banner created",
            error: false,
            success: true,
            banner: banner
        })


    } catch (error) {
        console.error("Banner created Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }

}

// get Banner
export async function getBanners(request, response) {
    try {
        const banners = await BannerV1Model.find();

        if(!banners){
            response.status(500).json({
                error: true,
                success: false,
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            data: banners
        });

    } catch (error) {
        console.error("Category Loading Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export async function getBanner(request, response) {
    try {
        const banner = await BannerV1Model.findById(request.params.id);
        if (!banner) {
            response.status(500).json({
                message: "The Banner with the given id was not found",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            banner: banner
        })
    } catch (error) {
        console.error("Get Banner", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export async function deleteBanner(request, response) {
    try {
        const banner= await BannerV1Model.findById(request.params.id);
        // console.log("Found category:", category);

        const images = banner.images;
        console.log("Image URLs:", images);

        if (images && images.length > 0) {
            for (const imgUrl of images) {
                const urlArr = imgUrl.split("/");
                const image = urlArr[urlArr.length - 1];
                const imageName = image.split(".")[0];

                console.log("Deleting image from Cloudinary:", imageName);
                await cloudinary.uploader.destroy(imageName);
            }
        }

        const deletedBanner = await BannerV1Model.findByIdAndDelete(request.params.id);

        if (!deletedBanner) {
            return response.status(404).json({
                message: "Banner not found",
                success: false,
                error: true
            });
        }

        response.status(200).json({
            success: true,
            message: "Banner deleted!",
            error: false
        });

    } catch (error) {
        console.error("Error in deleteBanner:", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}


export async function updateBanner(request, response) {
    console.log(imagesArr);
    
    const banner = await BannerV1Model.findByIdAndUpdate(
        request.params.id,
        {
            bannerTitle: request.body.bannerTitle,
            images: imagesArr.length>0? imagesArr[0]: request.body.images,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            thirdsubCatId: request.body.thirdsubCatId,
            price: request.body.price,
            alignInfo: request.body.alignInfo
        },
        {new: true}
    );
    if(!banner){
        return response.status(500).json({
            message:"Banner cannot be updated!",
            error:true,
            success:false
        })
    }

    imagesArr = [];
    response.status(200).json({
        error:false,
        success:true,
        banner: banner,
        message: "Banner Updated Successfully!"
    })
}


