import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { createProduct, createProductRAMS, createProductSize, createProductWEIGHT, deleteMultipleProduct, deleteProduct, deleteProductRAMS, deleteProductSize, deleteProductWEIGHT, filters, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLevelCatId, getAllProductsByThirdLevelCatName, getProduct, getProductRams, getProductRamsById, getProductsCount, getProductSize, getProductSizeById, getProductWEIGHT, getProductWEIGHTById, removeImageFromCloudinary, searchProductController, sortBy, updateProduct, updateProductRam, updateProductSize, updateProductWEIGHT, uploadImages } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
productRouter.post('/create', auth,createProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLevelCat/:id', getAllProductsByThirdLevelCatId);
productRouter.get('/getAllProductsByThirdLevelCatName', getAllProductsByThirdLevelCatName);
productRouter.get('/getAllProductsByPrice', getAllProductsByPrice);
productRouter.get('/getAllProductsByRating', getAllProductsByRating);
productRouter.get('/getAllProductsCount', getProductsCount);
productRouter.get('/getAllFeaturedProducts', getAllFeaturedProducts);
productRouter.delete('/deleteMultiple' , deleteMultipleProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,updateProduct);

productRouter.post('/productRAMS/create',auth,createProductRAMS);
// productRouter.delete('/productRAMS/deleteMultiple' , deleteMultipleProductRams);
productRouter.delete('/productRAMS/:id', deleteProductRAMS);
productRouter.put('/productRAMS/:id',auth,updateProductRam);
productRouter.get('/productRAMS/get',getProductRams);
productRouter.get('/productRAMS/:id', getProductRamsById);

// WEIGHT

productRouter.post('/productWeight/create',auth,createProductWEIGHT);
// productRouter.delete('/productWeight/deleteMultiple' , deleteMultipleProductWEIGHT);
productRouter.delete('/productWeight/:id', deleteProductWEIGHT);
productRouter.put('/productWeight/:id',auth,updateProductWEIGHT);
productRouter.get('/productWeight/get',getProductWEIGHT);
productRouter.get('/productWeight/:id', getProductWEIGHTById);


// SIZE

productRouter.post('/productSize/create',auth,createProductSize);
// productRouter.delete('/productSize/deleteMultiple' , deleteMultipleProductSize);
productRouter.delete('/productSize/:id', deleteProductSize);
productRouter.put('/productSize/:id',auth,updateProductSize);
productRouter.get('/productSize/get',getProductSize);
productRouter.get('/productSize/:id', getProductSizeById);


productRouter.post('/filters', filters);
productRouter.post('/sortBy', sortBy);


productRouter.post("/search/get",searchProductController)

export default productRouter;