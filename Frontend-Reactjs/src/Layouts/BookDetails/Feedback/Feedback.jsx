import { useState } from "react";
import { Rating } from "../../../Components/Rating/Rating";
import { useDeleteFeedback } from "../../../Hooks/feedbackHooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Feedback = ({ feedback }) => {
  
  const { id, bookId, userFullName, comment, rate, createdDate, userEmail } = feedback;
  const { mutate: deleteFeedback } = useDeleteFeedback();
  
  let isUserFeedback = false;
  const userString = localStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);
    if (user.email === userEmail) {
      isUserFeedback = true;
    }
  }


  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      deleteFeedback({feedbackId: id, bookId});
      setDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(false);
  };


  const formattedDate = new Date(createdDate).toLocaleDateString();

  return (
    <>
      <hr />
      <div className="row  d-flex align-items-center">
        <div className="col-lg-3">
            <p className="mb-0">{formattedDate}</p> 
            <h5>{userFullName}</h5>
        </div>
        <div className="col-lg-9 d-flex gap-2  justify-content-around align-items-center">
          <p className="col-lg-7 ">{comment}</p>
          <Rating className="col-lg-3" rate={rate} />
          {isUserFeedback && (
          <div className="col-lg-1">
            <button 
              className="btn fs-5" 
              onClick={handleDeleteClick}
              style={{ background: 'none', border: 'none', padding: 0 }}
              >
              <FontAwesomeIcon icon={faTrash} style={{ color: 'red', fontSize: '1.2em' }} />
            </button>
          </div>
        )}
        </div>
        {deleteConfirmation && (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCancelDelete}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
