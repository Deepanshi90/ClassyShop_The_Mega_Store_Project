import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { addBlog, deleteBlog, getBlog, getBlogs, updateBlog, uploadImages } from '../controllers/blog.controller.js';
import { removeImageFromCloudinary } from '../controllers/category.controller.js';


const blogRouter = Router();

blogRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
blogRouter.post('/add', auth, addBlog);
blogRouter.get('/',  getBlogs);
blogRouter.get('/:id',getBlog);
blogRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
blogRouter.delete('/:id',auth,deleteBlog);
blogRouter.put('/:id',auth,updateBlog);
export default blogRouter;  