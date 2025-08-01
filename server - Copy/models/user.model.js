import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    access_token: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum:["Active","Inactive","Suspended"],
        default: "Active"
    },
    address_details: [{
        type: mongoose.Schema.ObjectId,
       ref:'address'
    }],
    shopping_cart: [{
        type: mongoose.Schema.ObjectId,
        ref:'cartProduct'
    }],
    orderHistory:[
        {
            type: mongoose.Schema.ObjectId,
            ref:'order'
        }
    ],
    otp:{
        type: String
    },
    otpExpires:{
        type:Date
    },
    role: {
        type: String,
        enum:['ADMIN','USER'],
        default:"USER"
    },
    signUpWithGoogle:{
        type: Boolean,
        default: false
    }
},
    {
        timestamps:true
    }
);

const UserModel = mongoose.model("User",userSchema);
export default UserModel;
