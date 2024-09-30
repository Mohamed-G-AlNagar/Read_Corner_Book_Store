import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import image from "../../Images/resetPass.jpg"
import { toast } from 'react-hot-toast';
import { useResetPassword } from '../../Hooks/userHooks';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.]+$/;

interface ResetPasswordFormData {
  password: string;
  passwordConfirm: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const {mutate: ResetPassword , isPending} = useResetPassword()
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ResetPasswordFormData>({
    mode: 'all',
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const {password} = data;
    if(code){
        ResetPassword({ password, code});

         setTimeout(() => {
             navigate("/")
         }, 500);
     
    }else{toast.error("No Reset Pass Token Found")}
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
              <h2 className="card-title text-center mb-4">Create New Password</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: passwordRegex,
                        message: 'Password must contain lowercase, uppercase, number, and special character',
                      },
                    })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                      required: 'Please confirm your password',
                      validate: (value) => value === getValues('password') || 'Passwords do not match',
                    })}
                  />
                  {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm.message}</div>}
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isPending}>
                  
                    {isPending ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 'Sending...'</> : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <img
            src={image}
            alt="Reset Password Illustration"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;