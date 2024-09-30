import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useProductDatails } from '../../Hooks/productHooks';
import Spinner from '../../Components/spinner/Spinner';
import { Feedbacks } from './Feedbacks/Feedbacks';
import { Rating } from '../../Components/Rating/Rating';
import { useAddItemToCart } from '../../Hooks/cartHooks';
import { AddFeedbackModal } from '../BookDetails/AddFeedback/AddFeedback'; 

export const BookDetailsAndFeedbacks = () => {
  const { id } = useParams();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const { product, error, isLoading } = useProductDatails(id || "");
  
  const { mutate: addItemToCart } = useAddItemToCart();
  
  function handleAddToCart() {
    addItemToCart(Number(id) || 1);
  }
  
  if (isLoading) return <Spinner />;
  if (error) return <p>Error</p>;

  const {
    bookCover: image,
    description,
    title,
    price,
    rating,
    stock,
    category,
    feedbacks,
  } = product;

  return (
    <section className="bg-light">
      <div className="container py-3">
        <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row book-details-row">
                  <div className="col-12 col-lg-3 mb-1 mb-lg-0">
                    <div className="book-cover-container bg-image hover-zoom ripple rounded ripple-surface">
                      <img 
                        src={image} 
                        className="book-cover-image"
                        alt="Product"
                      />
                      <div className="hover-overlay">
                        <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 book-info-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="text-primary">{title}</h4>
                      <h5>{category}</h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-danger">
                        <Rating rate={rating} />
                      </div>
                      <p className="text-muted mb-0">Stock: {stock}</p>
                    </div>
                    <hr />
                    <p className="mb-4 mb-md-0">{description}</p>
                  </div>
                  <div className="col-12 col-lg-3 book-price-column border-start">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="text-primary">{formatCurrency(price)}</h4>
                      <span className="text-success">Free shipping</span>
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-100 mb-3"
                      type="button"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <div className="pt-2">
                      <h6 className="mb-0">
                        <Link
                          to="/"
                          className="btn  btn-lg w-100"
                        >
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Back to shop
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Feedbacks feedbacks={feedbacks} setShowFeedbackModal={setShowFeedbackModal} />
      <AddFeedbackModal bookId={id || ""} showModal={showFeedbackModal} handleClose={() => setShowFeedbackModal(false)} />
    </section>
  );
};