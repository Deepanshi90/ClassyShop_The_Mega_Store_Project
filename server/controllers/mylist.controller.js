import MyListModel from "../models/myList.model.js";

export const addToMyListController = async(request,response)=>{
    try {
        const userId = request.userId;
        const {productId, productTitle,image,rating,price,oldPrice,brand,discount} = request.body;

        const item = await MyListModel.findOne({
            userId:userId,
            productId:productId,
        })
        console.log(item);
        

        if(item){
            return response.status(400).json({
                message: "Item already in mylist"
            })
        }

        const myList = new MyListModel({
            productId, productTitle,image,rating,price,oldPrice,brand,discount,userId
        })

        const save = await myList.save();

        return response.status(200).json({
            error: false,
            success: true,
            message:"Product saved in My List"
        })

    } catch (error) {
        console.error("Add to myList error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}


// delete to my list
export const deleteToMyListController = async(request,response)=>{
    try {
       const myListItem = await MyListModel.findById(request.params.id);
       
       if(!myListItem){
        return response.status(404).json({
            message:"The item with given id is not selected",
            error: true,
            success: false
        })
       }

       const deletedItem = await MyListModel.findByIdAndDelete(request.params.id);

       if(!deletedItem){
        return response.status(400).json({
            message:"The item is not deleted",
            success:false,
            error: true
        })
       }

       return response.status(200).json({
        message:"Item removed from my List",
        error: false,
        success: true
       })
    } catch (error) {
        console.error("Delete to myList error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}

export const getMyListController = async(request,response)=>{
    try {
        const userId = request.userId;

        const myListItems = await MyListModel.find({
            userId: userId
        })

        return response.status(200).json({
            error: false,
            success: true,
            data: myListItems
        })
    } catch (error) {
        console.error("Get to myList error", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: true
        });
    }
}