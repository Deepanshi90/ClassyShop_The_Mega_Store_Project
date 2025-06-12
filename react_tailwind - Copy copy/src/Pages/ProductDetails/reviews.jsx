import { Rating } from '@mui/material';
import React from 'react'

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/api';


const Reviews = (props) => {
const context = useContext(MyContext)
    const [reviews, setReviews] = useState({
        image: '',
        userName: '',
        review:'',
        rating:1,
        userId:'',
        productId:'',
    })

const [reviewsData , setReviewsData] = useState([]);

    useEffect(() =>{
// console.log(context?.userData);
// console.log(props?.productId);

setReviews(() =>({
    ...reviews,
    image: context?.userData?.avatar,
    userName : context?.userData?.name,
    userId: context?.userData?._id,
    productId: props?.productId,


}))
getReviews();
},[context?.userData,props])

const onChangeInput = (e) =>{
setReviews(() =>({
    ...reviews,
review: e.target.value,    
}))
}

const addReview = (e) =>{
    e.preventDefault();
    // console.log(reviews);

    if(reviews.review !== ""){
        postData("/api/user/addReview",reviews).then((res)=>{
        // console.log(res);
        
        if(res?.error === false){
            context.alertBox("success",res?.message || "Review added Successfully!");
            setReviews(() =>({
    ...reviews,
review: '',
rating:1,    
}))
getReviews();
        }else{
             context.alertBox("error",res?.message || "Please Login!");
        }
    }) 
    }
    else{
        context.alertBox("error","Please add Review!");
    }

   
    
}

// const getReviews = () =>{
//     fetchDataFromApi(`/api/user/getReview?productId=${props?.productId}`).then((res) =>{
//         if(res?.error === false){
//             setReviewsData(res?.reviews)
//             context.alertBox("success",res?.message)
//             console.log(res.reviews);
            
//         }
//     })
// }


const getReviews = () => {
  fetchDataFromApi(`/api/user/getReview?productId=${props?.productId}`).then((res) => {
    if (res?.error === false) {
      setReviewsData(res?.reviews);
      props.setReviewsCount(res?.reviews?.length)
      // Remove this line below to avoid alert on page load
      // context.alertBox("success", res?.message);
    }
  });
};

// const addReview = (e) => {
//     e.preventDefault();
//     console.log(reviews);

//     postData("/api/user/addReview", reviews).then((res) => {
//         console.log("API Response:", res);

//         if (res?.error === false) {
//             context.alertBox("success", res?.message || "Review added successfully");

//             setReviews(prev => ({
//                 ...prev,
//                 review: '',
//                 rating: 1 // Reset to default number
//             }));
//         }
//     });
// };


  return (
 <>
   <div className="w-full productReviewContainer">
              <h2 className=' text-[16px] lg:text-[18px]'>Customer Question and answers</h2>
              {
                reviewsData?.length !== 0 && 
                <>
                 <div className="reviewScroll pr-5 w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5">

                    {
                        reviewsData?.map((review,index) =>{
return(
      <div className="review pt-5 pb-5 border-b !border-b-[rgba(0,0,0,0.1)] w-full flex items-center justify-between">
                  <div className="info w-[60%] flex items-center gap-3" >
                    <div className="img w-[80px] h-80px rounded-full overflow-hidden">
                      <img src={review?.image || '/default-avatar.png'} alt="user-avatar" className='w-full' />

                    </div>
                    <div className="w-[80%]">
                      <h4 className='text-[16px]'>{review?.userName}</h4>
                      <h5 className='text-[13px] mb-0'> {review?.
updatedAt?.split("T")[0]}</h5>
                      <p className='mt-0 mb-0'>{review?.review}</p>
                    </div>
                  </div>
                  <Rating name="size-medium" value={review.rating} readOnly/>
                </div>
)
                        })
                    }
                

              
                
              </div>
                </>
              }

             

              <br />

              <div className="reviewForm  bg-[#fafafa] p-4 rounded-md">
                <h2 className='text-[18px]'>Add a review</h2>
                <form className="w-full mt-5" onSubmit={addReview}>
        <TextField
          id="outlined-multiline-flexible"
          label="Write a Review.."
          className='w-full'
          onChange={onChangeInput}
          name='review'
          multiline
          rows={5}
          value={reviews.review}
        />
        <br />
        <br />
        <Rating name="size-medium" value={reviews.rating} onChange={(event,newValue) =>{
           setReviews(() =>({
    ...reviews,
rating: newValue,    
}))
            
        }}/>
        <div className="flex items-center mt-5">
          <Button type='submit' className='btn-org'>Submit Review</Button>
        </div>
                </form>
              </div>
            </div>
 </>
  )
}


export default Reviews;