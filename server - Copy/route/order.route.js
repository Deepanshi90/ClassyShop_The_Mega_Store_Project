import { Router } from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { captureOrderPaypalController, createOrderController, createOrderPaypalController, getOrderDetailsController, getTotalOrdersCountController, totalSalesController, totalUsersController, updateOrderStausController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/create',auth,createOrderController);
orderRouter.get('/order-list',auth,getOrderDetailsController);
orderRouter.get('/create-order-paypal', auth,createOrderPaypalController); // no auth middleware
orderRouter.post('/capture-order-paypal',auth,captureOrderPaypalController);
orderRouter.put('/order-status/:id',auth,updateOrderStausController);
orderRouter.get('/count',auth,getTotalOrdersCountController);
orderRouter.get('/sales',auth,totalSalesController);
orderRouter.get('/users',auth,totalUsersController);

export default orderRouter;