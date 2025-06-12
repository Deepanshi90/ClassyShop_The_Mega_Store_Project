import CartProductModel from "../models/cartproduct.model.js";



// add item to the cart
export const addToCartItemController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {productTitle,image,rating,price,quantity,oldPrice,subTotal,productId,countInStock, discount , size, weight, ram,brand} = request.body;

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
            productTitle:productTitle,
            image: image,
            rating: rating,
            price:price,
            oldPrice: oldPrice,
            quantity:quantity,
            subTotal: subTotal,
            countInStock: countInStock,
            userId: userId,
            productId: productId,
            brand: brand,
            discount: discount,
            size: size,
            weight: weight,
            ram:ram,
        })
        const save = await cartItem.save();

        // const updateCartUser = await UserModel.updateOne({_id: userId},{
        //     $push:{
        //         shopping_cart: productId
        //     }
        //  })
         
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

        const cartItems = await CartProductModel.find({
            userId: userId,
        })

        return response.status(200).json({
            data: cartItems,
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
        const {_id,qty,subTotal,size,weight,ram} = request.body;

        console.log(qty);
        

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
        quantity: qty,
            subTotal: subTotal,
            size: size,
            ram: ram,
            weight: weight
    },{
        new: true
    })

    return response.status(200).json({
        message:"Cart Updated Successfully!",
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
        const {id} = request.params;
        // console.log(id);
        
        if(!id){
            return response.status(400).json({
                message:"Provide Id",
                error: true,
                succcess: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({
            _id : id,
            userId: userId
        })

        if(!deleteCartItem){
            return response.status(400).json({
                message:"The product in the cart is not found",
                error: true,
                succcess: false
            })
        }
        // const user = await UserModel.findOne({
        //     _id: userId,

        // })

        // const cartItems = user?.shopping_cart;

        // const updatedUserCart = [...cartItems.slice(0,cartItems.indexOf(productId)),...cartItems.slice(cartItems.indexOf(productId)+1)]

        // user.shopping_cart = updatedUserCart;

        // await user.save();
        
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


export const emptyCartController = async (request, response) => {
  try {
    const userId = request.params.id; // middleware
    // const cartItems = await CartProductModel.find({ userId: userId });

    await CartProductModel.deleteMany({ userId: userId });

    return response.status(200).json({
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};
