import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserLogin } from '../../Hooks/userHooks';
import Spinner from '../../Components/spinner/Spinner';
import { tokenContext } from '../../context/TokenContext';
import { userLogin, getUserData } from '../../Services/userAPI';
import { UserContext } from '../../context/UserContext';

function Login() {
  const navigate = useNavigate();
  let { setToken } = useContext(tokenContext);
  let { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const userData = {
      email,
      password,
    };

    const user = await userLogin(userData);
    setIsLoading(false);
    if (user?.status === 'SUCCESS') {
      console.log(user.data);
      setToken(user.content.access_token);
      let loggedUser = await getUserData();
      console.log(loggedUser);
      setUser(loggedUser)
      navigate('/');
    }
  };

  return (
    <div className="container p-3 my-5 h-custom position-relative">
      {isLoading && <Spinner />}
      <Link
        to="/"
        className="btn btn-outline-primary btn-sm position-absolute top-0 start-0 m-3"
        style={{ zIndex: 1 }}
      >
        <i className="fas fa-long-arrow-alt-left me-2"></i>
        Back to shop
      </Link>
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-twitter"></i>
            </button>

            <button className="btn btn-primary btn-floating me-2">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              style={{ boxShadow: '0 0 5px #ADD8E6' }}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={handlePasswordChange}
              style={{ boxShadow: '0 0 5px #ADD8E6' }}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="text-center text-md-start mt-2 pt-2">
            <button
              className="btn btn-danger mb-1 px-5"
              size="lg"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className='d-flex justify-content-between'>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?
                <Link to="/signup" className="text-decoration-none text-danger">
                  {' '}
                  Register
                </Link>
              </p>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                <Link to="/forgotPassword" className="text-decoration-none text-danger fs-6">
                  {' '}
                  Forgot Your Password?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
