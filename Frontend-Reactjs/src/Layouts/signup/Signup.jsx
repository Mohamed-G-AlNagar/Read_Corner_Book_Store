
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';
import Spinner from '../../Components/spinner/Spinner';
import { userSignup } from '../../services/userAPI';

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    mode: 'onBlur',
  });

  const { errors } = formState;

  async function onSubmit(data) {
    setIsLoading(true);
    console.log(data);
    const userData = {
      ...data,
    };

    const resData = await userSignup(userData);
    console.log(resData);
    setIsLoading(false);

    if (resData?.status === 'SUCCESS') {
      console.log(resData);
      navigate('/login');
    }
  }

  function onError(errors) {
    console.log(errors);
  } 

  return (
    <div className="container-fluid position-relative">
      <div className="card text-black m-3" style={{ borderRadius: '25px'}}>
        {isLoading && <Spinner />}
        <div className="card-body">
          <Link
            to="/"
            className="btn btn-outline-primary btn-sm position-absolute top-0 start-0 m-3"
            style={{ zIndex: 1 }}
          >
            <i className="fas fa-long-arrow-alt-left me-2"></i>
            Back to shop
          </Link>
          <div className="row d-flex justify-content-center">
            <Form
              className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>
              <div className='d-flex justify-content-between' style={{ width: '70%'}}>
                <div
                  className={`form-floating ${errors.firstName ? 'mb-1' : 'mb-4'}`}
                  style={{ width: '49%', boxShadow: '0 0 5px #ADD8E6' }}
                >
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? 'is-invalid mb-0' : ''
                    }`}
                    id="firstName"
                    placeholder=""
                    {...register('firstName', {
                      required: 'Please enter your first name',
                      minLength: {
                        value: 3,
                        message: 'First name must be at least 3 characters',
                      },
                    })}
                  />
                  <label htmlFor="firstName">First Name</label>
                  <span className="m-0 fa-sm" style={{ color: 'red' }}>
                    {errors?.firstName?.message}
                  </span>
                </div>
                <div
                  className={`form-floating ${errors.lastName ? 'mb-1' : 'mb-4'}`}
                  style={{ width: '49%', boxShadow: '0 0 5px #ADD8E6' }}
                >
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? 'is-invalid mb-0' : ''
                    }`}
                    id="lastName"
                    placeholder=""
                    {...register('lastName', {
                      required: 'Please enter your last name',
                      minLength: {
                        value: 3,
                        message: 'Last name must be at least 3 characters',
                      },
                    })}
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <span className="m-0 fa-sm" style={{ color: 'red' }}>
                    {errors?.lastName?.message}
                  </span>
                </div>
              </div>
              <div
                className={`form-floating ${errors.email ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                <label htmlFor="email">Your Email</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.email?.message}
                </span>
              </div>
              <div
                className={`form-floating ${errors.password ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  {...register('password', {
                    required: 'Please enter your password',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,\-#_])(?=.*\d).{8,}$/,
                      message:
                        'Password must contain at least one lowercase letter, one uppercase letter, one special character (.,-.#._), one number, and be at least 8 characters long',
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.password?.message}
                </span>
              </div>
              <div
                className={`form-floating ${
                  errors.passwordConfirm ? 'mb-1' : 'mb-4'
                }`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  placeholder=""
                  {...register('passwordConfirm', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      getValues().password === value ||
                      'Passwords do not match',
                  })}
                />
                <label htmlFor="passwordConfirm">Repeat your password</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.passwordConfirm?.message}
                </span>
              </div>
              <div
                className={`form-floating ${
                  errors.address ? 'mb-1' : 'mb-4'
                }`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder=""
                  {...register('address', {
                    required: 'Please enter your address',
                  })}
                />
                <label htmlFor="address">Your Address</label>
                <span className="m-0 fa-sm" style={{ color: 'red' }}>
                  {errors?.address?.message}
                </span>
              </div>
              <div
                className={`form-floating ${errors.phone ? 'mb-1' : 'mb-4'}`}
                style={{ width: '70%', boxShadow: '0 0 5px #ADD8E6' }}
              >
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder=""
                  {...register('phone', {
                    required: 'Please enter your phone number',
                    pattern: {
                      value: /^01[0125][0-9]{8}$/,
                      message:
                        'Please enter a valid phone number (01X-XXXXXXXX)',
                    },
                  })}
                />
                <label htmlFor="phone">Your Phone Number</label>
                <span style={{ color: 'red' }}>{errors?.phone?.message}</span>
              </div>
              <div className='d-flex justify-content-around w-75'>
                <button className="btn btn-primary w-50 mb-1" type="submit">
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Have an account?
                  <Link to="/login" className="link-danger">
                    {' '}
                    Login
                  </Link>
                </p>
              </div>
            </Form>
            <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Signup illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

