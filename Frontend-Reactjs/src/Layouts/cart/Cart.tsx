import './cart.css';
import {CartItem} from './CartItem/CartItem';
import { CartItem as CartItemProps } from '../../models/ICart';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/spinner/Spinner';
import { makeOrder } from '../../Services/orderAPI';
import { useState } from 'react';
import { useCart } from '../../Hooks/cartHooks';

function Cart() {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const { data: cartData, isLoading, error } = useCart();
  if (isLoading) return <Spinner />;
  if (error) {
    return <h1>Error</h1>;
  }

  const {
    cartItems,
    totalPrice,
    user,
    cartId
  } = cartData;

  const {fullName : createdBy} = user


  async function handleOrder() {
    setIsLoadingPayment(true);
    const response = await makeOrder(cartId);
    console.log(response, 'response Payment');
    setIsLoadingPayment(false);
    if (response?.status === 'SUCCESS') {
      window.location.href = response.content;
    }
  }

  return (
    <section className="h-100 h-custom z-0">
      {isLoadingPayment && <Spinner />}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: '15px' }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          {createdBy?.userName} Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {cartItems.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {cartItems.map((item: CartItemProps) => (
                        <CartItem key={item.cartItemId} item={item} />
                      ))}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link
                            to={'/'}
                            className="btn btn-link link-dark"
                            aria-label="View cartItems"
                          >
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-4 rounded-5 position-relative"
                    style={{ minHeight: '100vh', backgroundColor: '#abc7fc' }}
                  >
                    <div className="p-5 h-100">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          items {cartItems.length}
                        </h5>
                      </div>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>{Math.round(totalPrice)} EGP</h5>
                      </div>
                    </div>
                    <div className="p-5 sticky-button">
                      <button
                        type="button"
                        className="btn btn-dark btn-lg mb-4 "
                        style={{ width: '50%' }}
                        data-mdb-ripple-color="dark"
                        onClick={handleOrder}
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
