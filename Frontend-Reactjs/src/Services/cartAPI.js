import axios from 'axios';
import toast from 'react-hot-toast';
import { baseURL } from './var';

export function createCartForNewUser() { }

export async function getCartById() {
  const token = localStorage.getItem('token') || '';
  if (!token) {
    return;
  }

  const userString = localStorage.getItem('user');
  if (!userString) {
    toast.error('No User Found');
    return;
  }
  const user = JSON.parse(userString);

  const cartId = user.cartId;
console.log(user,"user----");
  console.log(cartId, 'cartId');


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(
      `${baseURL}/cart/${cartId}`,
      config
    );
    console.log(data.content);
    return data.content;
  } catch (error) {
    console.log(error.response?.data?.error);
    toast.error(error.response.data.message || error.response.data.error);
  }
}

export async function addItemToCart(bookId) {
  const token = localStorage.getItem('token') || '';
  console.log(token);
  if (!token) {
    toast.error('please login First');
    return;
  }

  const userString = localStorage.getItem('user');
  if (!userString) {
    toast.error('No User Found');
    return;
  }
  const user = JSON.parse(userString);

  const cartId = user.cartId;
console.log(user,"user----");
  console.log(cartId, 'cartId');


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newItem = {
    bookId, 
    cartId,
    quantity: 1, 
  };

  try {
    const { data } = await axios.post(
      `${baseURL}/cart/add_item`,
      newItem,
      config
    );
    toast.success(data?.message);
    console.log(data)
    return data;

  } catch (error) {
    console.log(error?.response?.data);
    toast.error(error.response.data.message || error.response.data.error);

  }
}
export async function deleteItemFromCart(bookId, quantity = 1) {
  //? protected route
  const token = localStorage.getItem('token') || '';
  if (!token) {
    toast.error('please login First');
    return;
  }

  const userString = localStorage.getItem('user');
  if (!userString) {
    toast.error('No User Found');
    return;
  }
  const user = JSON.parse(userString);

  const cartId = user.cartId;
  console.log(cartId, 'cartId');


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const item = {
    bookId,
    cartId,
    quantity,
  };

  try {
    const { data } = await axios.post(
      `${baseURL}/cart/decrease_item`,
      item,
      config
    );
    toast.success(data.message);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data.error||error.response.data.message);
    toast.error(error.response.data.message || error.response.data.error);
   
  }
}
