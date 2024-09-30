import axios from 'axios';
import toast from 'react-hot-toast';
import { baseURL } from './var';

export async function addfeedbackToBook(comment,rate,bookId) {

    const token = localStorage.getItem('token') || '';
    if (!token) {
      toast.error('pleasse login First');
      return;
    }
  
    const userString = localStorage.getItem('user');
    if (!userString) {
      toast.error('No User Found');
      return;
    }
    const user = JSON.parse(userString);  
  console.log(user,"user-----");
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const newItem = {
      userId:+user.id,
      bookId, 
      rate,
      comment
    };
  
      const { data } = await axios.post(
        `${baseURL}/feedback/`,
        newItem,
        config
      ).catch (error=> {
        console.log(error.response);
        if(err.response.data?.validationErrors?.length > 0){
          err.response.data.validationErrors.forEach(ValidErr => {
            toast.error(ValidErr)
          });
        }else{
          toast.error(err.response.data?.error);
        }
        return null;
      });

      toast.success('Feedback Successfully Added ');
      console.log(data)
      return data;
  
 
  }


export async function deletefeedback(feedbackId,bookId) {
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

  
      const { data } = await axios.delete(
        `${baseURL}/feedback/${feedbackId}`,
        config
      ).catch (error=> {
        console.log(error.response.data);
        toast.error(err.response.data?.error);
        
        return null;
      });

      toast.success('Feedback Successfully deleted ');
      console.log(data)
      return data;
  
 
  }

  