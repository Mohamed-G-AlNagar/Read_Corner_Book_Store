import React from 'react';
import { Feedback } from '../Feedback/Feedback';
import { Link} from "react-router-dom";


export const Feedbacks = ({ feedbacks, setShowFeedbackModal }) => {

   const feedbacksSorted = feedbacks.sort((a,b)=> b.id - a.id);

   const token = localStorage.getItem('token') ;
   let isLoggedin = false;
   if (token) {
     isLoggedin = true;
   }

  return (
    <section id="feedbacks" className="my-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="card mb-3">
              <div className="card-body p-md-4">

               <div className='d-flex justify-content-center align-items-center '>
                    <h2 className='col-10 '>All Feedbacks</h2>
                    {isLoggedin && <Link
                            className=" fs-7 mt-2"
                            onClick={() => setShowFeedbackModal(true)}
                            >
                            Add Feedback
                    </Link> }
                </div>
                {feedbacksSorted.length === 0 ? (<p>No feedbacks available.</p>
                ) : (
                  feedbacksSorted.map((feedback, index) => (
                <Feedback feedback={feedback} key={feedback.id} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

