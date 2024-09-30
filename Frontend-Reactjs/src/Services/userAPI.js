import axios from 'axios';
import toast from 'react-hot-toast';
// import { getCartById } from './cartAPI';
import { baseURL } from './var';

export async function userLogin(userData) {
  const { data } = await axios
    .post(`${baseURL}/auth/login`, userData)
    .catch((err) => {
      console.log(err.response);
      toast.error(err.response.data?.error);
      return err.response.data;
    });
  console.log(data);
  if (data?.status === 'SUCCESS') {
    toast.success(data.message);
    localStorage.setItem('token', data.content.access_token);

  }
  return data;
}


export async function userSignup(userData) {
  const { data } = await axios
    .post(`${baseURL}/auth/register`, userData)
    .catch((err) => {
      console.log(err.response.data);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.error);
      }
      return err.response.data;
    });
  // console.log(data);
  if (data?.status === 'SUCCESS') {
    toast.success(data.message);
  }
  return data;
}



export async function getUserData() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${baseURL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Failed to get user data');
    localStorage.removeItem('token');
    return null;
  }
}

export async function updateMyAccount(userData) {
  const token = localStorage.getItem('token') || '';

  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  const { data } = await axios
    .patch(`${baseURL}/user/update_me`, userData,config)
    .catch((err) => {
      console.log(err.response.data);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.error);
      }
      return err.response.data;
    });
  if (data?.status === 'SUCCESS') {
    toast.success(data.message);
  }
  return data.content;
}


export async function forgotPass(email) {

  const { data } = await axios
    .post(`${baseURL}/auth/forgot-password-request`,{email})
    .catch((err) => {
      console.log(err.response);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.error);
      }
      return err.response.data;
    });
  if (data?.status === 'SUCCESS') {
    console.log(data)
    toast.success(data.message);
    
  }
  return data;
}

export async function ResetPass(newPassword, code) {

  const { data } = await axios
    .post(`${baseURL}/auth/reset-password-confirm?token=${code}`,{newPassword})
    .catch((err) => {
      console.log(err.response);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.error);
      }
      return err.response.data;
    });
  if (data?.status === 'SUCCESS') {
    console.log(data)
    toast.success(data.message);
  }
  return data;
}
