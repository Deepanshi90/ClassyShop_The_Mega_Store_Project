import ProductModel from "../models/product.model.js";
import ProductRAMSModel from "../models/productRAMS.js";
import ProductWEIGHTModel from "../models/productWEIGHT.js";
import ProductSIZEModel from "../models/productSIZE.js";

import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";
import { parse } from "path";
import { measureMemory } from "vm";

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
            category: request.body.category,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            thirdsubCatId: request.body.thirdsubCatId,
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


//create product ram
export async function createProductRAMS(request, response) {
    try {
        let productRAMS = new ProductRAMSModel({
            name: request.body.name
        });

        productRAMS = await productRAMS.save();

        if (!productRAMS) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Rams Not created"
            });
        }

        response.status(200).json({
            message: "Product RAMS created successfully",
            error: false,
            success: true,
            product: productRAMS
        })

    } catch (error) {
        console.error("ICreate Product Ram Error :", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}


// get all products
// export async function getAllProducts(request, response) {
//     try {

//         const page = parseInt(request.query.page) || 1;
//         const perPage = parseInt(request.query.perPage);
//         const totalPosts = await ProductModel.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (page > totalPages) {
//             return response.status(404).json({
//                 message: "Page not found",
//                 success: false,
//                 error: true
//             })
//         }
//         const productListArr = await ProductModel.find()
//             .populate("category")
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         // for (let i = 0; i < productListArr.length; i++) {
//         //     for (let j = 0; j < productListArr[i].location.length; j++) {
//         //         if (productListArr[i].location[j].value === req.query.location) {
//         //             productList.push(productListArr[i]);
//         //         }
//         //     }
//         // }
//         const products = await ProductModel.find();

//         if (!products) {
//             response.status(500).json({
//                 error: true,
//                 success: false
//             })
//         }
//         return response.status(200).json({
//             error: false,
//             success: true,
//             products: products,
//             totalPages: totalPages,
//             page: page
//         })
//     } catch (error) {
//         console.error("Get all product error", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

// get all products
// export async function getAllProducts(request, response) {
//     try {
//         const page = parseInt(request.query.page) || 1;
//         const perPage = parseInt(request.query.perPage) || 10; // add fallback
//         const totalPosts = await ProductModel.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (page > totalPages && totalPages !== 0) {
//             return response.status(404).json({
//                 message: "Page not found",
//                 success: false,
//                 error: true
//             });
//         }

//         // ✅ Populate the category field here
//         const productListArr = await ProductModel.find()
//             .populate("category") // this pulls full category document
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         if (!productListArr) {
//             return response.status(500).json({
//                 error: true,
//                 success: false,
//                 message: "Failed to fetch products"
//             });
//         }

//         return response.status(200).json({
//             error: false,
//             success: true,
//             products: productListArr, // ✅ return populated result
//             totalPages: totalPages,
//             page: page
//         });
//     } catch (error) {
//         console.error("Get all product error", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function getAllProducts(request, response) {
    try {
        // ✅ Fetch all products and populate category
        const productListArr = await ProductModel.find()
            .populate("category")
            .exec();

        if (!productListArr) {
            return response.status(500).json({
                error: true,
                success: false,
                message: "Failed to fetch products"
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: productListArr,
            totalProducts: productListArr.length
        });
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
// export async function getAllProductsByCatId(request, response) {
//     try {

//         const page = parseInt(request.query.page) || 1;
//         const perPage = parseInt(request.query.perPage) || 10000;
//         const totalPosts = await ProductModel.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (page > totalPages) {
//             return response.status(404).json({
//                 message: "Page not found",
//                 success: false,
//                 error: true
//             })
//         }
//         const productListArr = await ProductModel.find({
//             catId: request.params.id
//         })
//             .populate("category")
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         // for (let i = 0; i < productListArr.length; i++) {
//         //     for (let j = 0; j < productListArr[i].location.length; j++) {
//         //         if (productListArr[i].location[j].value === req.query.location) {
//         //             productList.push(productListArr[i]);
//         //         }
//         //     }
//         // }
//         const products = await ProductModel.find();

//         if (!products) {
//             response.status(500).json({
//                 error: true,
//                 success: false
//             })
//         }
//         return response.status(200).json({
//             error: false,
//             success: true,
//             products: products,
//             totalPages: totalPages,
//             page: page
//         })
//     } catch (error) {
//         console.error("Get all product error", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function getAllProductsByCatId(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments({ catId: request.params.id }); // count only matching category
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            });
        }

        const productListArr = await ProductModel.find({ catId: request.params.id })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!productListArr || productListArr.length === 0) {
            return response.status(404).json({
                message: "No products found for this category",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: productListArr,
            totalPages: totalPages,
            page: page
        });
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
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
// export async function getAllProductsBySubCatId(request, response) {
//     try {

//         const page = parseInt(request.query.page) || 1;
//         const perPage = parseInt(request.query.perPage) || 10000;
//         const totalPosts = await ProductModel.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (page > totalPages) {
//             return response.status(404).json({
//                 message: "Page not found",
//                 success: false,
//                 error: true
//             })
//         }
//         const productListArr = await ProductModel.find({
//             subCatId: request.params.id
//         })
//             .populate("category")
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         // for (let i = 0; i < productListArr.length; i++) {
//         //     for (let j = 0; j < productListArr[i].location.length; j++) {
//         //         if (productListArr[i].location[j].value === req.query.location) {
//         //             productList.push(productListArr[i]);
//         //         }
//         //     }
//         // }
//         const products = await ProductModel.find();

//         if (!products) {
//             response.status(500).json({
//                 error: true,
//                 success: false
//             })
//         }
//         return response.status(200).json({
//             error: false,
//             success: true,
//             products: products,
//             totalPages: totalPages,
//             page: page
//         })
//     } catch (error) {
//         console.error("Get all product error", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function getAllProductsBySubCatId(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;

        const totalPosts = await ProductModel.countDocuments({ subCatId: request.params.id });
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            });
        }

        const productListArr = await ProductModel.find({ subCatId: request.params.id })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!productListArr || productListArr.length === 0) {
            return response.status(404).json({
                message: "No products found for this sub-category",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: productListArr,
            totalPages: totalPages,
            page: page
        });
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
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
// export async function getAllProductsByThirdLevelCatId(request, response) {
//     try {

//         const page = parseInt(request.query.page) || 1;
//         const perPage = parseInt(request.query.perPage) || 10000;
//         const totalPosts = await ProductModel.countDocuments();
//         const totalPages = Math.ceil(totalPosts / perPage);

//         if (page > totalPages) {
//             return response.status(404).json({
//                 message: "Page not found",
//                 success: false,
//                 error: true
//             })
//         }
//         const productListArr = await ProductModel.find({
//             thirdsubCatId: request.params.id
//         })
//             .populate("category")
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         // for (let i = 0; i < productListArr.length; i++) {
//         //     for (let j = 0; j < productListArr[i].location.length; j++) {
//         //         if (productListArr[i].location[j].value === req.query.location) {
//         //             productList.push(productListArr[i]);
//         //         }
//         //     }
//         // }
//         const products = await ProductModel.find();

//         if (!products) {
//             response.status(500).json({
//                 error: true,
//                 success: false
//             })
//         }
//         return response.status(200).json({
//             error: false,
//             success: true,
//             products: products,
//             totalPages: totalPages,
//             page: page
//         })
//     } catch (error) {
//         console.error("Get all product error", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

export async function getAllProductsByThirdLevelCatId(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;

        const totalPosts = await ProductModel.countDocuments({ thirdsubCatId: request.params.id });
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            });
        }

        const productListArr = await ProductModel.find({ thirdsubCatId: request.params.id })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (!productListArr || productListArr.length === 0) {
            return response.status(404).json({
                message: "No products found for this third-level category",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: productListArr,
            totalPages: totalPages,
            page: page
        });
    } catch (error) {
        console.error("Get all product error", error);
        return response.status(500).json({
            message: error.message || "Something went wrong",
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

// delete multiple products
export async function deleteMultipleProduct(request, response) {
    const { ids } = request.body;

    if (!ids || !Array.isArray(ids)) {
        return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
    }

    for (let i = 0; i < ids.length; i++) {
        const product = await ProductModel.findById(ids[i]);

        const images = product.images;
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
                await ProductModel.deleteMany({ _id: { $in: ids } });
                return response.status(200).json({
                    message: "Product delete successfully",
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

export async function updateProductRam(request, response) {
    try {
        const productRam = await ProductRAMSModel.findByIdAndUpdate(
            request.params.id,
            {
            name: request.body.name,
        },{new:true})

        if (!productRam) {
            return response.status(500).json({
                message:"The Product Ram can not be updated",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            message:"Product RAM updated",
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


// delete product
export async function deleteProductRAMS(request, response) {
    try {
     const productRams = await ProductRAMSModel.findById(request.params.id);
     if (!productRams) {
         response.status(500).json({
             message:"Item Not found",
             error: true,
             success: false
         })
     }
 
     const deleteProductRams = await ProductRAMSModel.findByIdAndDelete(request.params.id);
 
     if(!deleteProductRams){
         response.status(404).json({
             message:"Item not deleted",
             error: true,
             success:false
         })
     }
 
     return response.status(200).json({
         message:"Product RAM deleted",
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
 
 // delete multiple products
//  export async function deleteMultipleProductRams(request, response) {
//      const { ids } = request.body;
 
//      if (!ids || !Array.isArray(ids)) {
//          return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
//      }
 
//      for (let i = 0; i < ids.length; i++) {
//          const productRams = await ProductRAMSModel.findById(ids[i]);
 
//              try {
//                  await ProductRAMSModel.deleteMany({ _id: { $in: ids } });
//                  return response.status(200).json({
//                      message: "Product RAMS delete successfully",
//                      error: false,
//                      success: true
//                  });
//              } catch (error) {
//                  console.log("error from deete many product");
                 
//                  return response.status(500).json({
//                      message: error.message || error,
//                      error: true,
//                      success: false
//                  });
//              }
         
//      }
//  }


 export async function getProductRams(request, response) {
    try {
        const productRam = await ProductRAMSModel.find()

        if (!productRam) {
            return response.status(500).json({
                message:"The Product Ram can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productRam,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get RAM of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }

 export async function getProductRamsById(request, response) {
    try {
        const productRam = await ProductRAMSModel.findById( request.params.id)

        if (!productRam) {
            return response.status(500).json({
                message:"The Product Ram can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productRam,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get RAM of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }



//  WEIGHT

export async function createProductWEIGHT(request, response) {
    try {
        let productWeight = new ProductWEIGHTModel({
            name: request.body.name
        });

        productWeight = await productWeight.save();

        if (!productWeight) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Weight Not created"
            });
        }

        response.status(200).json({
            message: "Product Weight created successfully",
            error: false,
            success: true,
            product: productWeight
        })

    } catch (error) {
        console.error("ICreate Product Weight Error :", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}


export async function updateProductWEIGHT(request, response) {
    try {
        const productWeight = await ProductWEIGHTModel.findByIdAndUpdate(
            request.params.id,
            {
            name: request.body.name,
        },{new:true})

        if (!productWeight) {
            return response.status(500).json({
                message:"The Product Weight can not be updated",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            message:"Product Weight updated",
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


// delete product
export async function deleteProductWEIGHT(request, response) {
    try {
     const productWeight = await ProductWEIGHTModel.findById(request.params.id);
     if (!productWeight) {
         response.status(500).json({
             message:"Item Not found",
             error: true,
             success: false
         })
     }
 
     const deleteProductWeight = await ProductWEIGHTModel.findByIdAndDelete(request.params.id);
 
     if(!deleteProductWeight){
         response.status(404).json({
             message:"Item not deleted",
             error: true,
             success:false
         })
     }
 
     return response.status(200).json({
         message:"Product weight deleted",
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
 
 // delete multiple products
//  export async function deleteMultipleProductWEIGHT(request, response) {
//      const { ids } = request.body;
 
//      if (!ids || !Array.isArray(ids)) {
//          return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
//      }
 
//      for (let i = 0; i < ids.length; i++) {
//          const productWeight = await ProductWEIGHTModel.findById(ids[i]);
 
//              try {
//                  await ProductWEIGHTModel.deleteMany({ _id: { $in: ids } });
//                  return response.status(200).json({
//                      message: "Product Weight delete successfully",
//                      error: false,
//                      success: true
//                  });
//              } catch (error) {
//                  console.log("error from delete many product");
                 
//                  return response.status(500).json({
//                      message: error.message || error,
//                      error: true,
//                      success: false
//                  });
//              }
         
//      }
//  }


 export async function getProductWEIGHT(request, response) {
    try {
        const productWeight = await ProductWEIGHTModel.find()

        if (!productWeight) {
            return response.status(500).json({
                message:"The Product Ram can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productWeight,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get RAM of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }

 export async function getProductWEIGHTById(request, response) {
    try {
        const productWeight= await ProductWEIGHTModel.findById( request.params.id)

        if (!productWeight) {
            return response.status(500).json({
                message:"The Product WEIGHT can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productWeight,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get RAM of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }




//  Size

export async function createProductSize(request, response) {
    try {
        let productSize = new ProductSIZEModel({
            name: request.body.name
        });

        productSize = await productSize.save();

        if (!productSize) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Size Not created"
            });
        }

        response.status(200).json({
            message: "Product Size created successfully",
            error: false,
            success: true,
            product: productSize
        })

    } catch (error) {
        console.error("ICreate Product Weight Error :", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}


export async function updateProductSize(request, response) {
    try {
        const productSize = await ProductSIZEModel.findByIdAndUpdate(
            request.params.id,
            {
            name: request.body.name,
        },{new:true})

        if (!productSize) {
            return response.status(500).json({
                message:"The Product Size can not be updated",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            message:"Product Size updated",
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


// delete product
export async function deleteProductSize(request, response) {
    try {
     const productSize = await ProductSIZEModel.findById(request.params.id);
     if (!productSize) {
         response.status(500).json({
             message:"Item Not found",
             error: true,
             success: false
         })
     }
 
     const deleteProductSize = await ProductSIZEModel.findByIdAndDelete(request.params.id);
 
     if(!deleteProductSize){
         response.status(404).json({
             message:"Item not deleted",
             error: true,
             success:false
         })
     }
 
     return response.status(200).json({
         message:"Product size deleted",
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
 
 // delete multiple products
//  export async function deleteMultipleProductSize(request, response) {
//      const { ids } = request.body;
 
//      if (!ids || !Array.isArray(ids)) {
//          return response.status(400).json({ error: true, success: false, message: 'Invalid input' });
//      }
 
//      for (let i = 0; i < ids.length; i++) {
//          const productSize = await ProductSIZEModel.findById(ids[i]);
 
//              try {
//                  await ProductSIZEModel.deleteMany({ _id: { $in: ids } });
//                  return response.status(200).json({
//                      message: "Product Size delete successfully",
//                      error: false,
//                      success: true
//                  });
//              } catch (error) {
//                  console.log("error from delete many product");
                 
//                  return response.status(500).json({
//                      message: error.message || error,
//                      error: true,
//                      success: false
//                  });
//              }
         
//      }
//  }


 export async function getProductSize(request, response) {
    try {
        const productSize = await ProductSIZEModel.find()

        if (!productSize) {
            return response.status(500).json({
                message:"The Product Size can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productSize,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get Size of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }

 export async function getProductSizeById(request, response) {
    try {
        const productSize= await ProductSIZEModel.findById( request.params.id)

        if (!productSize) {
            return response.status(500).json({
                message:"The Product SIZE can not found",
                error: true,
                success: false
            })
        } 

        return response.status(200).json({
            // message:"Product RAM updated",
            data: productSize,
            error: false,
            success: true
        })

    } catch (error) {
        console.error("Get Size of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }



 export async function filters(request,response) {
    const {catId , subCatId , thirdsubCatId , minPrice , maxPrice , rating, page , limit} = request.body;
    
    const filters = {};
if( catId?.length ){
        filters.catId = {$in:  catId}
    }

    if( subCatId?.length ){
        filters.subCatId = {$in:  subCatId}
    }
    
    if(thirdsubCatId?.length ){
        filters.thirdsubCatId = {$in: thirdsubCatId}
    }

    if(minPrice || maxPrice){
        filters.price= {$gte: +minPrice || 0 ,$lte: +maxPrice || Infinity}
    }

    if(rating?.length){
        filters.rating = {$in: rating}
    }

    try {
         const products = await ProductModel.find(filters)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ProductModel.countDocuments(filters);

    return response.status(200).json({
      error: false,
      success: true,
      products: products,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
    } catch (error) {
        console.error("Get filter of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
 }

const sortItems = (products, sortBy, order) => {
  return products.sort((a, b) => {
    if (sortBy === 'name') {
      return order === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }

    if (sortBy === 'price') {
      return order === 'asc' 
        ? a.price - b.price 
        : b.price - a.price;
    }

    return 0; // Default return if no sorting applied
  });
};


 export async function sortBy(request,response) {
    const {products , sortBy , order} = request.body;
    const sortedItems = sortItems([...products?.products] , sortBy,order);
    
    return response.status(200).json({
        error: false,
        success: true,
        products: sortedItems,
        page: 0 ,
        totalPages: 0,
        
    })
}



export async function searchProductController(request,response) {
    try {
        // const query = request.query.q;
const {query } = request.body;
        console.log(query);
        

        if(!query){
            return response.status(400).json({
                error: true,
                success: false,
                message:"Query is required"
            })
        }

        const products= await ProductModel.find({
            $or:[
                {name: {$regex: query, $options:"i"}},
                 {brand: {$regex: query, $options:"i"}},
                  {catName: {$regex: query, $options:"i"}},
                  {subCat: {$regex: query, $options:"i"}},
                  {thirdsubCat: {$regex: query, $options:"i"}},
            ],
        }).populate("category")

        return response.status(200).json({
            message:"Product Found successfully",
            error: false,
            success: true,
            products: products,
            //  products: products
        })

    } catch (error) {
        console.error("Get Size of product error", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }    
}