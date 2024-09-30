import  { useEffect, useState } from 'react';
import image from '../../Images/emailConfirm2.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../Components/spinner/Spinner';
import { baseURL } from '../../Services/var';

export function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function verifymail() {
    try {
        console.log(token);
      const { data} = await axios.get(`${baseURL}/auth/activate-account?token=${token}`);
      toast.success(data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
    console.error(error);
      navigate('/signup');
    }
  }

  useEffect(() => {
    setIsLoading(true);
    verifymail();
    setIsLoading(false);
  }, [token]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="container d-flex justify-content-center align-items-center mt-4">
        <div className="w-75 p-3" style={{ border: '2px solid #eee', borderRadius: '10px', boxShadow: '0 0 3px #ADD8E6' }}>
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6">
              <img
                src={image}
                alt="Sample"
                className="img-fluid"
                style={{ maxWidth: '90%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

