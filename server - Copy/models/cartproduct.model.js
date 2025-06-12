import mongoose from 'mongoose';

const cartProductSchema = mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    size: {
        type: String
    },
    weight: {
        type: String
    },
    ram: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    countInStock:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    brand:{
        type: String,
    },

},{
    timestamps: true
});

const CartProductModel = mongoose.model('cart', cartProductSchema);

export default CartProductModel;
