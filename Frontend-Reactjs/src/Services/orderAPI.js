import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "./var";

export async function makeOrder(cartId) {
    const token = localStorage.getItem('token') || '';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data: response, error } = await axios
        .post(`${baseURL}/order/create/${cartId}`,null, config)
        .catch((err) => {
            console.error(err);
            toast.error(err.response.data.message);
        });

    console.log(response);
    return response;

}


export async function paymentSuccess(orderId, sessionId) {
    if (!orderId || !sessionId) {
        console.error('Order ID or Session ID is missing');
        toast.error('Order ID or Session ID is missing');
        return;
    }

    const token = localStorage.getItem('token') || '';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data: response } = await axios.get(`${baseURL}/order/success?orderId=${orderId}&sessionId=${sessionId}`, config);
        console.log(response);
        toast.success(response?.message)
        return response;
    } catch (err) {
        console.error(err.response?.data || err);
        toast.error('Failed to confirm payment');
        toast.error(err.response?.data?.message);
        return null;
    }
}


export async function paymentCanceled(orderId, sessionId) {
    if (!orderId || !sessionId) {
        console.error('Order ID or Session ID is missing');
        toast.error('Order ID or Session ID is missing');
        return;
    }

    const token = localStorage.getItem('token') || '';

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data: response } = await axios.get(`${baseURL}/order/cancel?orderId=${orderId}&sessionId=${sessionId}`, config);
        console.log(response);
        toast.success(response.message)
        return response;
    } catch (err) {
        console.error(err);
        toast.error('Failed to cancel payment');
        toast.error(err.response.data.message);

        return null;
    }
}

export async function getAllOrders(){

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login first');
    }

    const userString = localStorage.getItem('user');
    if (!userString) {
      toast.error('No User Found');
      return;
    }
    const user = JSON.parse(userString);  
  if(user.role != "ADMIN") {
    toast.error("You are not authorized to view this page.");
    return;
  }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response, error } = await axios
    .get(`${baseURL}/order/`,config)
    .catch((err) => {
      console.error(err);
      toast.error(err.response.data.message);
      throw Error(err);
    });
    
    console.log(response.content);
    return response.content;
}

export async function getMyOrders(){

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login first');
    }

    const userString = localStorage.getItem('user');
    if (!userString) {
      toast.error('No User Found');
      return;
    }
    const user = JSON.parse(userString);  
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response, error } = await axios
    .get(`${baseURL}/order/user/${user.id}`, config)
    .catch((err) => {
      console.error(err);
      toast.error(err.response.data.message);
    });
    
    console.log(response.content);
    return response.content;
}

export async function updateOrderStatus(orderId, newStatus){

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login first');
    }

    const userString = localStorage.getItem('user');
    if (!userString) {
      toast.error('No User Found');
      return;
    }

    const user = JSON.parse(userString);  
  if(user.role != "ADMIN") {
    toast.error("You are not authorized to view this page.");
    return;
  }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedStatus={
        status: newStatus
    }
    
    const { data: response } = await axios
    .put(`${baseURL}/order/updateStatus/${orderId}`,updatedStatus, config)
    .catch((err) => {
      console.error(err);
      if(err.response.data?.validationErrors?.length > 0){
        err.response.data.validationErrors.forEach(ValidErr => {
          toast.error(ValidErr)
        });
      }else{
        toast.error(err.response.data?.message||err.response.data?.error);
      }
    
    });
    
    console.log(response);
    toast.success(response.message);
    return response.content;
}