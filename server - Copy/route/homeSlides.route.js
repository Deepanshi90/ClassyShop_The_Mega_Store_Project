import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addHomeSlide, deleteMultipleSlides, deleteSlide, getHomeSlides, getSlide, removeImageFromCloudinary, updatedSlide,  uploadImages } from '../controllers/homeSlider.controller.js';


const homeSlidesRouter = Router();

homeSlidesRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
homeSlidesRouter.post('/add', auth, addHomeSlide);
homeSlidesRouter.get('/',  getHomeSlides);
homeSlidesRouter.get('/:id',getSlide);
homeSlidesRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
homeSlidesRouter.delete('/deleteMultiple',auth,deleteMultipleSlides);
homeSlidesRouter.delete('/:id',auth,deleteSlide);
homeSlidesRouter.put('/:id',auth,updatedSlide);
export default homeSlidesRouter;