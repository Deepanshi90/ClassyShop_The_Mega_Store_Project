import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";


// add item to the cart
export const addToCartItemController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {productId} = request.body;

        if(!productId){
            return response.status(402).json({
                message:"Provide ProductId",
                error: true,
                success: false
            })
        }
        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId:productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message:"Item already in the cart"
            })
        }

        const cartItem = new CartProductModel({
            quantity:1,
            userId: userId,
            productId: productId
        })
        const save = await cartItem.save();

         const updateCartUser = await UserModel.updateOne({_id: userId},{
            $push:{
                shopping_cart: productId
            }
         })
         return response.status(200).json({
            data: save,
            message:"Item added successfully",
            error: false,
            success: true
         })
    } catch (error) {
        console.error("Cart adding error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}

// get item to the cart
export const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId;

        const cartItem = await CartProductModel.find({
            userId: userId,
        }).populate('productId')

        return response.status(200).json({
            data: cartItem,
            error: false,
            succcess: true
        })

    } catch (error) {
        console.error("Cart getting error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}

// update the cart item
export const updateCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {_id,qty} = request.body;

        if(!_id || !qty){
            return response.status(400).json({
                message:"Provide Id and quantity",
                error: true,
                succcess: false
            })
        }

        const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId: userId
        },
    {
        quantity: qty
    })

    return response.status(200).json({
        message:"Cart Updated",
        error: false,
        succcess: true,
        data: updateCartitem
    })
    } catch (error) {
        console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}

// delete item from cart
export const deleteCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {_id,productId} = request.body
        if(!_id){
            return response.status(400).json({
                message:"Provide Id",
                error: true,
                succcess: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id : _id,
            userId: userId
        })

        if(!deleteCartItem){
            return response.status(400).json({
                message:"The product in the cart is not found",
                error: true,
                succcess: false
            })
        }
        const user = await UserModel.findOne({
            _id: userId,

        })

        const cartItems = user?.shopping_cart;

        const updatedUserCart = [...cartItems.slice(0,cartItems.indexOf(productId)),...cartItems.slice(cartItems.indexOf(productId)+1)]

        user.shopping_cart = updatedUserCart;

        await user.save();
        
        return response.status(200).json({
            message:"Item Removed Successfully",
            error: false,
            succcess: true,
            data: deleteCartItem
        })
    }
    catch (error) {
        console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}
