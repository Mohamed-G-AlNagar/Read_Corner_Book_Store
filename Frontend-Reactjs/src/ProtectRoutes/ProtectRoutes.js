import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { tokenContext } from '../context/TokenContext';

export default function ProtectedRoutes(props) {
  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();

  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const isTokenNotExpired = decoded.exp > Date.now() / 1000;

      if (decoded.sub && isTokenNotExpired) {
        // setToken(token);
        return props.children; // Acces the child if the token is valid
      } else {
        console.log('Invalid or expired Token');
        localStorage.removeItem('token');
        setToken(null);
        toast.error('Invalid Session Token-Please Login First');
        navigate('/login');
      }
    } catch (error) {
      console.log('Invalid Token :', error.message);
      localStorage.removeItem('token');
      setToken(null);
      toast.error('Invalid Session Token-Please Login First');
      navigate('/login');
    }
  } else {
    toast.error('No Token Found, Please Login-------');
    navigate('/login');
  }
}
