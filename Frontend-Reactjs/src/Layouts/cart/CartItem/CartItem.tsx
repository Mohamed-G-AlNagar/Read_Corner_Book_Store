import React, { useState } from 'react';
import { useAddItemToCart, useRemoveItemFromCart } from '../../../Hooks/cartHooks';
import { CartItem as CartItemType } from '../../../models/ICart'; // Import the pre-made interface

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { mutate: removeItem } = useRemoveItemFromCart();
  const { mutate: addItemToCart } = useAddItemToCart();

  // Destructure properties from the item
  const { book, quantity } = item;
  const [itemQty, setItemQty] = useState<number>(quantity);

  function decreaseQty() {
    setItemQty(itemQty - 1);
    console.log(itemQty);
    removeItem({ itemId: book.bookId });
  }

  function increaseQty() {
    setItemQty(itemQty + 1);
    console.log(itemQty);
    addItemToCart( book.bookId);
  }

  function handleRemoveItem() {
    console.log( book.bookId);
    removeItem({ itemId:  book.bookId, quantity: itemQty + 1 });
    setItemQty(itemQty - 1);
  }

  return (
    <div className="row mb-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
        <img
          src={book?.bookCover} 
          className="img-fluid rounded-3"
          alt={book?.bookTitle}
        />
      </div>
      <div className="col-md-3 col-lg-3 col-xl-3">
        <h6 className="text-black mb-0">{book?.bookTitle}</h6>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button className="btn btn-link px-2" onClick={decreaseQty}>
          <i className="fas fa-minus"></i>
        </button>
        <input
          id="form1"
          min="0"
          name="quantity"
          value={itemQty}
          type="number"
          className="form-control form-control-sm text-center"
          disabled
        />
        <button className="btn btn-link px-2" onClick={increaseQty}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 className="mb-0">
          {Math.round(book?.price) * itemQty} EGP
        </h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <button className="btn btn-link p-0 fs-4" onClick={handleRemoveItem}>
          <i className="fas fa-times text-muted"></i>
        </button>
      </div>
      <hr className="my-4" />
    </div>
  );
};
