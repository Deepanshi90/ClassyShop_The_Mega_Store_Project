import { fail } from "assert";
import CategoryModel from "../models/category.model.js";

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

// create category
export async function createCategory(request, response) {
    try {
        let category = new CategoryModel({
            name: request.body.name,
            images: imagesArr,
            parentCatName: request.body.parentCatName,
            parentId: request.body.parentId
        })

        if (!category) {
            console.error(" Category not created ", error);
            return response.status(500).json({
                message: error.message || error || "Category Not Created",
                error: true,
                success: false
            });
        }

        category = await category.save();
        imagesArr = [];

        return response.status(200).json({
            message: "Category created",
            error: false,
            success: true,
            category: category
        })


    } catch (error) {
        console.error("Category created Error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }

}

// get categories
// export async function getCategories(request, response) {
//     try {
//         const categories = await CategoryModel.find();
//         const categoryMap = {};

//         categories.forEach(cat => {
//             categoryMap[cat._id] = { ...cat._doc, children: [] };
//         })
//         const rootCategories = [];
//         categories.forEach(cat => {
//             if (cat.parentId) {
//                 categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
//             }
//             else {
//                 rootCategories.push(categoryMap[cat._id]);
//             }
//         })

//         return response.status(200).json({
//             error: false,
//             success: true,
//             data: rootCategories
//         });


//     } catch (error) {
//         console.error("Category Loding  Error ", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function getCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat._doc, children: [] };
        });

        const rootCategories = [];
        categories.forEach(cat => {
            if (cat.parentId && categoryMap[cat.parentId]) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
        });

        return response.status(200).json({
            error: false,
            success: true,
            data: rootCategories
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


// get category count
export async function getCategoriesCount(request, response) {
    try {
        const categoryCount = await CategoryModel.countDocuments({ parentId: undefined });

        if (!categoryCount) {
            return response.status(500).json({ success: false, error: true });
        } else {
            return response.send({
                categoryCount: categoryCount,
                success: true,
                error: false
            });
        }
    } catch (error) {
        console.error("Category Count Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get sub Category count
export async function getSubCategoriesCount(request, response) {
    try {
        const categories = await CategoryModel.find();

        if (!categories) {
            return response.status(500).json({ success: false, error: true });
        } else {
            const subCatList = [];

            categories.forEach(cat => {
                if (cat.parentId !== undefined && cat.parentId !== null) {
                    subCatList.push(cat);
                }
            });

            return response.send({
                SubCategoryCount: subCatList.length,
                success: true,
                error: false
            });
        }
    } catch (error) {
        console.error("Category Count Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get single Category
export async function getCategory(request, response) {
    try {
        const category = await CategoryModel.findById(request.params.id);
        if (!category) {
            response.status(500).json({
                message: "The category with the given id was not found",
                error: true,
                success: false
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            category: category
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


// export async function deleteCategory(request, response) {
//     const category = await CategoryModel.findById(request.params.id);
//     const images = category.images;

//     const imgUrl = img;
//     const urlArr = imgUrl.split("/");
//     const image = urlArr[urlArr.length - 1];

//     const imageName = image.split(".")[0];
//     if (imageName) {
//         cloudinary.uploader.destroy(imageName, (error, result) => {
//             // console.log(error,result);

//         })
//     }
//     const subCategory = await CategoryModel.find({
//         parentId: request.params.id
//     });
    
//     for (let i = 0; i < subCategory.length; i++) {
//         console.log(subCategory[i]._id);
    
//         const thirdsubCategory = await CategoryModel.find({
//             parentId: subCategory[i]._id
//         });
    
//         for (let i = 0; i < thirdsubCategory.length; i++) {
//             const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
//         }
    
//         const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
//     }
    
//     const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    
//     if (!deletedCat) {
//         res.status(404).json({
//             message: "Category not found",
//             success: false,
//             error: true
//         });
//     }
    
//     response.status(200).json({
//         success:true,
//         message:"Category deleted!",
//         error:false
//     })
// }

export async function deleteCategory(request, response) {
    try {
        console.log("Deleting category ID:", request.params.id);

        const category = await CategoryModel.findById(request.params.id);
        console.log("Found category:", category);

        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                success: false,
                error: true
            });
        }

        const images = category.images;
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

        // Delete subcategories and their subcategories
        const subCategories = await CategoryModel.find({ parentId: request.params.id });
        console.log("Subcategories found:", subCategories.length);

        for (let subCat of subCategories) {
            const thirdSubCategories = await CategoryModel.find({ parentId: subCat._id });
            console.log(`Third-level subcategories for ${subCat._id}:`, thirdSubCategories.length);

            for (let thirdSubCat of thirdSubCategories) {
                console.log("Deleting third-level subcategory:", thirdSubCat._id);
                await CategoryModel.findByIdAndDelete(thirdSubCat._id);
            }

            console.log("Deleting subcategory:", subCat._id);
            await CategoryModel.findByIdAndDelete(subCat._id);
        }

        console.log("Deleting main category:", request.params.id);
        await CategoryModel.findByIdAndDelete(request.params.id);

        response.status(200).json({
            success: true,
            message: "Category deleted!",
            error: false
        });

    } catch (error) {
        console.error("Error in deleteCategory:", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}


export async function updateCategory(request, response) {
    console.log(imagesArr);
    
    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        {
            name: request.body.name,
            images: imagesArr.length>0? imagesArr[0]: request.body.images,
            parentId: request.body.parentId,
            parentCatName: request.body.parentCatName
        },
        {new: true}
    );
    if(!category){
        return response.status(500).json({
            message:"Category cannot be updated!",
            error:true,
            success:false
        })
    }

    imagesArr = [];
    response.status(200).json({
        error:false,
        success:true,
        category:category
    })
}