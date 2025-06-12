import { Router } from 'express';
import auth from '../middleware/auth.js';
import { addAddressController, getAddressController,deleteAddressController, getSingleAddressController, editAddress } from '../controllers/address.controller.js';

const addressRouter = Router();

addressRouter.post("/add",auth,addAddressController);
addressRouter.get("/get",auth,getAddressController);
addressRouter.get("/:id",auth,getSingleAddressController);
addressRouter.put("/:id",auth,editAddress);
addressRouter.delete("/:id",auth,deleteAddressController);
// addressRouter.put("/selectAddress/:id",auth,selectAddressController);

export default addressRouter;