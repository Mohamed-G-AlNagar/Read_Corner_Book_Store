import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { Form } from 'react-router-dom';
import { useAddfeedbackToBook } from '../../../Hooks/feedbackHooks';
import Spinner from '../../../Components/spinner/Spinner';

interface AddFeedbackModalProps {
  showModal: boolean;
  handleClose: () => void;
  bookId: string; 
}

export const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({bookId , showModal, handleClose }) => {
  if (!showModal) return null; 

  const { mutate: addFeedback } = useAddfeedbackToBook(); 

  const [rating, setRating] = useState<number | ''>('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (rating === '' || comment.trim() === '') {
      toast.error('Please fill out all fields.');
      return;
    }
    setIsSubmitting(true);
    
      await addFeedback({comment, rating, bookId : +bookId});
      setRating('');
      setComment('');
      handleClose();
      setIsSubmitting(false); 
  };

  return (
    <>
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="feedbackModal" tabIndex={-1} aria-labelledby="feedbackModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="feedbackModalLabel">Add Feedback</h5>
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form id="feedbackForm" onSubmit={handleSubmitFeedback}>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    min={1}
                    max={5}
                    placeholder="Rate between 1 and 5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows={3}
                    placeholder="Write your feedback here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};
