import React, { useState } from 'react'
import api from '../../../api/api';
import { Rating } from '@mui/material';
import useUrlHeader from '../../../utilities/urlHeader';

function AddReview(props) {
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');
    const auth = useUrlHeader()
    const {course_id , getModal} = props


    const handleReviewSubmit = (e) => {
        e.preventDefault();

        // Check if name, rating, and comment are not empty
        if ( rate === 0 ) {
          alert('Please fill in all fields.');
          return;
        }

        // Create a new review object
        const newReview = {
          rate,
          review,
          course : course_id
        };
        console.log(newReview);
        api.post(
          `/student/review-rating/` ,
          newReview,
          auth
        ).then(response=>{
          console.log(response.data);
        }).catch(error=>{
          console.log(error);
        })
       
        setRate(0);
        setReview('');
        getModal(false)
      };

  return (
    <div className="w-[500px] mt-8 p-6 bg-white rounded-md shadow-md">
                      <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
                      <form onSubmit={handleReviewSubmit}>
                        
                        <div className="mb-4">
                          <p className='my-2'>Give your rating</p>
                          <Rating
                            name="simple-controlled"
                            value={rate}
                            onChange={(event, newValue) => {
                              setRate(newValue)
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
                            Review
                          </label>
                          <textarea
                            id="comment"
                            name="comment"
                            rows="3"
    
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                          ></textarea>
                        </div>
                        <div className='flex justify-end gap-5'>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                          >
                            Submit Review
                          </button>
                          <button
                            onClick={()=>{getModal(false)}}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue"
                          >
                            Cancel 
                          </button>

                        </div>
                      </form>
                    </div>
  )
}

export default AddReview
