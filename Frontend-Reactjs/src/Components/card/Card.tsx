import './cart.css';
import { IBook } from '../../models/IBook';
import { useAddItemToCart } from '../../Hooks/cartHooks';
import { useNavigate } from 'react-router-dom';
import { Rating } from '../Rating/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  product: IBook;
}

export default function Card({ product }: CardProps) {
  const navigate = useNavigate();
  const { mutate: addItemToCart } = useAddItemToCart();
  const { id, title, category, stock, price, bookCover, rating } = product || [];

  function handleAddToCart() {
    addItemToCart(id);
  }

  function handleGoToDetails() {
    navigate(`/book/${id}`, { state: { item: product } });
  }

  return (
    <div className="card h-100 combo-offer rounded-8 border border-black">
      <div className="d-flex justify-content-between p-2">
        <p className="lead mb-0 text-primary">{category}</p>
        <div
          className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
          style={{ minWidth: '35px', height: '35px' }}
        >
          <FontAwesomeIcon icon={faStar} style={{ color: '#FFD700' }} />
        </div>
      </div>

      <div className="w-100 overflow-hidden" style={{ height: '200px' }} onClick={handleGoToDetails}>
        <img src={bookCover} className="card-img-top h-100 w-100 object-cover" alt={title} />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between mb-1">
          <h5 className="mb-0 text-truncate">{title}</h5>
          <h5 className="text-dark mb-0">${price.toFixed(2)}</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">Available: <span className="fw-bold">{stock}</span></p>
          <div className="ms-auto text-warning">
            <Rating rate={rating} />
          </div>
        </div>

        <button
          className="btn btn-info mt-auto w-100"
          onClick={handleAddToCart}
          style={{ whiteSpace: 'nowrap' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
