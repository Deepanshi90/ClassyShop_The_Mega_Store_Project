import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";
import mongoose from 'mongoose';

export const addAddressController = async (request, response) =>{
    

    try {

        const {address_line1, city , state , pincode , country , mobile, landmark, addressType } = request.body;

    const userId = request.userId;
    // console.log(userId);
        if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId || !landmark || ! addressType) {
            return response.status(400).json({
                message: "Please provide all fields properly"   ,
                error:true,
                success : false
            })
        }

        const address = new AddressModel({
            address_line1, city , state , pincode , country , mobile, userId ,landmark, addressType
        })

        const savedAddress = await address.save();

        const updateCartUser = await UserModel.updateOne({_id: userId},{
                    $push:{
                       address_details: savedAddress?._id
                    }
                 })

                 return response.status(200).json({
                    data: savedAddress,
                    message:"Address add successfully",
                    error: false,
                    success: true
                 })

} catch (error) {
    console.log("Error from address controller:", error);
    return response.status(500).json({
        message: error.message || error ||  "Something went wrong",
        error: true,
        success: false
    });
}
   
}


export const getAddressController = async (request, response) =>{
    try {
        const address = await AddressModel.find({
            userId: request?.query?.userId
        })

        console.log(request?.query?.userId);
        
        if(!address){
            return response.status(400).json({
                error: true,
                success: false,
                message:"Address Not found"
            })
        }
        else{
            const updateUser = await UserModel.updateOne({_id: request?.query?.userId},{
                $push:{
                   address: address?._id
                }
             })

        }

        return response.status(200).json({
            error: false,
            success: true,
            data: address
        })

    } catch (error) {
        console.log("Error from get address controller:", error);
        return response.status(500).json({
            message: error.message || error ||  "Something went wrong",
            error: true,
            success: false
        });
    }
}


// export const selectAddressController = async (request, response) =>{
//     try {
//         const userId = request.userId;

//         const address = await AddressModel.find({
//             _id: request.params.id,
//             userId: userId
//         })

//         const updateAddress = await AddressModel.find(
//            {
//             userId: userId,
//            }
//         )

//         if(!address){
//             return response.status(500).json({
//                 message: error.message || error || "Something went wrong",
//                 error: true,
//                 success: false
//             });
//         }
//         else{
//             const updateAddress = await AddressModel.findByIdAndUpdate(
//                 request.params.id, {
//                 selected: request?.body?.selected
//             },
//                 { new: true }
//             )

//               return response.json({
//                         error: false,
//                         success:true,
//                         address: updateAddress
//                     })
    
//         }
//     } catch (error) {
//         console.error("selected address  Error:", error);
//         return response.status(500).json({
//             message: error.message || error || "Something went wrong",
//             error: true,
//             success: false
//         });
//     }
// }

// delete item from cart
export const deleteAddressController = async(request,response)=>{
    try {
        const userId = request.userId;
        const _id = request.params.id
        if(!_id){
            return response.status(400).json({
                message:"Provide Id",
                error: true,
                succcess: false
            })
        }

        const deleteItem = await AddressModel.deleteOne({
            _id : _id,
            userId: userId
        })

        if(!deleteItem){
            return response.status(400).json({
                message:"The address database is  not found",
                error: true,
                succcess: false
            })
        }
        
        return response.status(200).json({
            message:"Address Removed Successfully",
            error: false,
            succcess: true,
            data: deleteItem
        })
    }
    catch (error) {
        console.error("delete updating error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}

export const getSingleAddressController = async (request, response) => {
  try {
    const id = request.params.id;

    const address = await AddressModel.findOne({ _id: id });

    if (!address) {
      return response.status(404).json({
        message: "Address not found with this ID",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Address found successfully",
      error: false,
      success: true,
     address: address,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export async function editAddress(request, response) {

    try {
        const id = request.params.id;
         const {address_line1, city , state , pincode , country , mobile, landmark, addressType,userId } = request.body;
        const userExist = await UserModel.findById(userId);
       

        const address = await AddressModel.findByIdAndUpdate(
            id, {
            address_line1:address_line1,
             city:city ,
              state:state ,
               pincode:pincode , 
               country:country ,
                mobile: mobile, 
             landmark:landmark,
              addressType:addressType
        },
            { new: true }
        )

        return response.json({
            message:"Address Updated Successfully",
            error: false,
            success:true,
           address:address
        })

    } catch (error) {
        console.error("User update Error:", error);
        return response.status(500).json({
            message: error.message || error || "Something went wrong",
            error: true,
            success: false
        });
    }
}