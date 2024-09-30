import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import image from "../../Images/resetPass.jpg"
import { useForgotPassword } from '../../Hooks/userHooks';


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {

  const navigate = useNavigate();
  const {mutate: forgetPassword, isPending, data:response } = useForgotPassword();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    mode: 'all',
  });


  const onSubmit = (data: ForgotPasswordFormData) => {
   forgetPassword(data.email);
   console.log(response,"response")
   if (response?.status === 'SUCCESS') {
    setTimeout(() => {
        navigate("/")
    }, 500);
}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card shadow">
      <Link
        to="/"
        className="btn btn-sm position-absolute top-0 start-0 m-3"
        style={{ zIndex: 1 }}
      >
        <i className="fas fa-long-arrow-alt-left me-2"></i>
        Back to shop
      </Link>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: emailRegex,
                        message: 'Please enter a valid email',
                      },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isPending}>
                    {isPending ?<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 'Sending...'</>: 'Send Reset Code'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <img
            src={image}
            alt="Forgot Password Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
