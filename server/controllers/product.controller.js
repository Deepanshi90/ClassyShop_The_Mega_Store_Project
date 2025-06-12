import ProductModel from "../models/product.model.js";

import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";
import { parse } from "path";

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

// create product
export async function createProduct(request, response) {
    try {

        let product = new ProductModel({
            name: request.body.name,
            description: request.body.description,
            images: imagesArr,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            discount: request.body.discount,
            productRam: request.body.productRam,
            size: request.body.size,
            productWeight: request.body.productWeight,

        })

        product = await product.save();

        if (!product) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Not created"
            })
        }

        imagesArr = [];

        response.status(200).json({
            message: "Product created successfully",
            error: false,
            success: true,
            product: product
        })
    } catch (error) {
        console.error("ICreate Product Error :", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get all products
export async function getAllProducts(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        const productListArr = await ProductModel.find()
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        // for (let i = 0; i < productListArr.length; i++) {
        //     for (let j = 0; j < productListArr[i].location.length; j++) {
        //         if (productListArr[i].location[j].value === req.query.location) {
        //             productList.push(productListArr[i]);
        //         }
        //     }
        // }
        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get product by id
export async function getAllProductsByCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        const productListArr = await ProductModel.find({
            catId: request.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        // for (let i = 0; i < productListArr.length; i++) {
        //     for (let j = 0; j < productListArr[i].location.length; j++) {
        //         if (productListArr[i].location[j].value === req.query.location) {
        //             productList.push(productListArr[i]);
        //         }
        //     }
        // }
        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get product by category name
export async function getAllProductsByCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        console.log(request.query.catName);

        const productListArr = await ProductModel.find({
            catName: request.query.catName
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get sub cat product by id
export async function getAllProductsBySubCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        const productListArr = await ProductModel.find({
            subCatId: request.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        // for (let i = 0; i < productListArr.length; i++) {
        //     for (let j = 0; j < productListArr[i].location.length; j++) {
        //         if (productListArr[i].location[j].value === req.query.location) {
        //             productList.push(productListArr[i]);
        //         }
        //     }
        // }
        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get sub Cat product by category name
export async function getAllProductsBySubCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        console.log(request.query.catName);

        const productListArr = await ProductModel.find({
            subCat: request.query.subCat
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get third level cat product by id
export async function getAllProductsByThirdLevelCatId(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        // for (let i = 0; i < productListArr.length; i++) {
        //     for (let j = 0; j < productListArr[i].location.length; j++) {
        //         if (productListArr[i].location[j].value === req.query.location) {
        //             productList.push(productListArr[i]);
        //         }
        //     }
        // }
        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get third level Cat product by category name
export async function getAllProductsByThirdLevelCatName(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        console.log(request.query.catName);

        const productListArr = await ProductModel.find({
            thirdsubCat: request.query.thirdsubCat
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        const products = await ProductModel.find();

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get all product by price
export async function getAllProductsByPrice(request, response) {
    let productList = [];

    if (request.query.catId !== "" && request.query.catId !== undefined) {
        const productListArr = await ProductModel.find({
            catId: request.query.catId,
        }).populate("category");

        productList = productListArr;
    }
    if (request.query.subCatId !== "" && request.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({
            subCatId: request.query.subCatId,
        }).populate("category");
        productList = productListArr;
    }
    if (request.query.thirdsubCatId !== "" && request.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.query.thirdsubCatId,
        }).populate("category");
        productList = productListArr;
    }

    const filteredProducts = productList.filter((product) => {
        if (request.query.minPrice && product.price < parseInt(+request.query.minPrice)) {
            return false;
        }
        if (request.query.maxPrice && product.price > parseInt(+request.query.maxPrice)) {
            return false;
        }
        return true;
    })
    return response.status(200).json({
        products: filteredProducts,
        totalPages: 0,
        page: 0,
        error: false,
        success: true
    })
}

// export async function getAllProductsByPrice(request, response) {
//     try {
//         let productList = [];

//         const { catId, subCatId, thirdsubCatId, minPrice, maxPrice } = request.query;

//         // Find products based on category IDs
//         if (catId) {
//             productList = await ProductModel.find({ catId });
//         } else if (subCatId) {
//             productList = await ProductModel.find({ subCatId });
//         } else if (thirdsubCatId) {
//             productList = await ProductModel.find({ thirdsubCatId });
//         } else {
//             productList = await ProductModel.find(); // No category provided, return all
//         }

//         // Filter by price
//         const filteredProducts = productList.filter((product) => {
//             if (minPrice && product.price < parseInt(minPrice)) {
//                 return false;
//             }
//             if (maxPrice && product.price > parseInt(maxPrice)) {
//                 return false;
//             }
//             return true;
//         });

//         // Pagination variables
//         const page = parseInt(request.query.page) || 1;
//         const limit = parseInt(request.query.limit) || 10;
//         const totalProducts = filteredProducts.length;
//         const totalPages = Math.ceil(totalProducts / limit);

//         // Paginate the products manually
//         const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

//         return response.status(200).json({
//             products: paginatedProducts,
//             totalPages,
//             page,
//             error: false,
//             success: true
//         });

//     } catch (error) {
//         console.error(error);
//         return response.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: true
//         });
//     }
// }





// get product by rating
export async function getAllProductsByRating(request, response) {
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }
        // console.log(request.query.catName);
        // console.log(request.query.rating);
        // console.log(request.query.catId);
        // console.log(request.query.subCatId);
        // console.log(request.query.thirdsubCatId);

        let products = [];

       if(request.query.catId !== undefined){
        products = await ProductModel.find({
            rating: request.query.rating,
            catId: request.query.catId
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
       }

       if(request.query.subCatId !== undefined){
        products = await ProductModel.find({
            rating: request.query.rating,
            subCatId: request.query.subCatId
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
       }

       if(request.query.thirdsubCatId !== undefined){
        products = await ProductModel.find({
            rating: request.query.rating,
            thirdsubCatId: request.query.thirdsubCatId
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
       }
        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// get all products count
export async function getProductsCount(request,response) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if(!productsCount){
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            productsCount:productsCount
        })
    } catch (error) {
        console.error("get product count :", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
    
}

// get featured products
export async function getAllFeaturedProducts(request, response) {
    try {


        const products = await ProductModel.find({
            isFeatured:true
        })
            .populate("category");

        if (!products) {
            response.status(500).json({
                error: true,
                success: false
            })
        }
        return response.status(200).json({
            error: false,
            success: true,
            products: products
        })
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// delete product
export async function deleteProduct(request, response) {
   try {
    const product = await ProductModel.findById(request.params.id).populate("category");
    if (!product) {
        response.status(500).json({
            message:"Product Not found",
            error: true,
            success: false
        })
    }

    const images = product.images;
    let img;
    for (img of images){
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length-1];

        const imageName = image.split(".")[0];
        if(imageName){
            cloudinary.uploader.destroy(imageName,(error,result)=>{
                // console.log(error,result);
                
            })
        }
        // console.log(imageName);
        
    }

    const deleteProduct = await ProductModel.findByIdAndDelete(request.params.id);

    if(!deleteProduct){
        response.status(404).json({
            message:"Product not deleted",
            error: true,
            success:false
        })
    }

    return response.status(200).json({
        message:"Product deleted",
        success:true,
        error:false
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

// get single product
export async function getProduct(request, response) {
    try {
        const product = await ProductModel.findById(request.params.id).populate("category");
        if (!product) {
            response.status(500).json({
                message:"The Product Not found",
                error: true,
                success: false
            })
        }  
        return response.status(200).json({
            error: false,
            success: true,
            product:product
        })

    } catch (error) {
        console.error("Single product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}

// delete images
export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;
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

// update products
export async function updateProduct(request, response) {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            request.params.id,
            {
            name: request.body.name,
            description: request.body.description,
            images: request.body.images,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            discount: request.body.discount,
            productRam: request.body.productRam,
            size: request.body.size,
            productWeight: request.body.productWeight,

        },{new:true})

        if (!product) {
            return response.status(500).json({
                message:"The Product can Not be updated",
                error: true,
                success: false
            })
        } 

        imagesArr =[];

        return response.status(200).json({
            message:"Product updated",
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Update product", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}