import BlogModel from "../models/blog.model.js";

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


// create Blog
export async function addBlog(request, response) {
    try {
        let blog = new BlogModel({
            title : request.body.title,
            images: imagesArr,
            description: request.body.description,

        })

        if (!blog) {
            console.error(" Blog not created ", error);
            return response.status(500).json({
                message: error.message || error || "Blog Not Created",
                error: true,
                success: false
            });
        }

        blog = await blog.save();
        imagesArr = [];

        return response.status(200).json({
            message: "Blog created",
            error: false,
            success: true,
            blog: blog
        })


    } catch (error) {
        console.error("Blog created Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }

}

export async function getBlog(request, response) {
    try {
        const blog = await BlogModel.findById(request.params.id);
        if (!blog) {
            response.status(500).json({
                message: "The blog with the given id was not found",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            blog : blog,
            message: "Blog Created successfully"
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

export async function getBlogs(request, response) {
    try {
        const blogs = await BlogModel.find();
        
        if(!blogs){
              return response.status(400).json({
            message: "Blog Not found",
            error: true,
            success: false
        });
        }
        return response.status(200).json({
            error: false,
            success: true,
            blogs: blogs,
            message:"Blog Created Successfully"
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

export async function deleteBlog(request, response) {
    try {
        const blog = await BlogModel.findById(request.params.id);
        // console.log("Found category:", category);

        const images = blog.images;
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

        const deletedBlog = await BlogModel.findByIdAndDelete(request.params.id);

        if (!deletedBlog) {
            return response.status(404).json({
                message: "Blog not found",
                success: false,
                error: true
            });
        }

        response.status(200).json({
            success: true,
            message: "Blog deleted!",
            error: false
        });

    } catch (error) {
        console.error("Error in deleteBlog:", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}


export async function updateBlog(request, response) {
    console.log(imagesArr);
    
    const blog = await BlogModel.findByIdAndUpdate(
        request.params.id,
        {
             title : request.body.title,
                images: imagesArr.length>0? imagesArr[0]: request.body.images,
            description: request.body.description,
        },
        {new: true}
    );
    if(!blog){
        return response.status(500).json({
            message:"BLog cannot be updated! Please Try after sometime",
            error:true,
            success:false
        })
    }

    imagesArr = [];
    response.status(200).json({
        error:false,
        success:true,
        blog: blog,
        message: "Blog Updated Successfully!"
    })
}