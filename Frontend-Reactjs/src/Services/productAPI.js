import axios from 'axios';
import { baseURL } from '../Services/var';
import toast from 'react-hot-toast';

export async function getAllProducts() {
  const { data: response, error } = await axios
    .get(`${baseURL}/book/`)
    .catch((err) => {
      console.error(err.message);
      // if(err.message == "Network Error")
      toast.error(err.message);
      throw Error(err);
    });
    
    console.log(response.content);
    return response.content;
  }
  
  export async function getNewNineProducts() {
    const { data: response, error } = await axios
    .get(`${baseURL}/book/?size=9&page=1&sort=createdDate`)
    .catch((err) => {
      console.error(err.message);
      toast.error(err.message);
      throw Error(err);
    });
    
    console.log(response.content);
    return response.content;
  }
  
  export async function getProduct(id) {
    const { data: response, error } = await axios
    .get(`${baseURL}/book/${id}`)
    .catch((err) => {
      console.error(err.message);
      toast.error(err.message);
      throw Error(err);
    });

    console.log(response.content);
    return response.content;
}

  export async function deleteBook(id) {

    const token = localStorage.getItem('token') || '';
    if (!token) {
      toast.error('pleasse login First');
      return;
    }

    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response, error } = await axios
    .delete(`${baseURL}/book/${id}`,config)
    .catch((err) => {
      console.error(err.message);
      throw Error(err);
    });

    console.log(response.content);
    toast.success(response.message);
    return response.content;
}


export async function addBook(formData) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Please login first');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await axios.post(`${baseURL}/book/`, formData, config);
  return data;
}


export async function updateBook(id,formData) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Please login first');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await axios.put(`${baseURL}/book/${id}`, formData, config);
  return data;
}
