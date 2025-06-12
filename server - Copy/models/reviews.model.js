import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
     userName:{
        type: String,
        default: '',
    },
    image:{
            type: String,
        default: '',
        },
    review:{
        type: String,
        default: '',
    },
    rating:{
        type: String,
        default: '',
    },
    userId:{
        type: String,
        default: '',
    },
    productId:{
        type: String,
        default: '',
    },
},{
    timestamps: true
})


const ReviewModel = mongoose.model('review', reviewsSchema);

export default ReviewModel; 