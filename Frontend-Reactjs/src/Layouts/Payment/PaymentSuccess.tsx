
import { Link, useLocation } from 'react-router-dom';
import { useOrderSuccess } from '../../Hooks/orderHooks';
import paySuccessImg from '../../Images/payment-success.jpg'
import { useState } from 'react';

export const PaymentSuccess: React.FC = () => {
    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get('orderId') || "";
    const sessionId = query.get('sessionId') || "";
    const [isProcessed, setIsProcessed] = useState(false);

    const {mutate:paySuccess} = useOrderSuccess();


        if(!isProcessed) {
            setIsProcessed(true);
            paySuccess({orderId, sessionId});
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
        
    return (
        <div className="container text-center my-2">
            <div className="card p-4 shadow-lg d-flex justify-content-center">
                <div>
                <p className="mt-1 fs-1 text-info">Thank you for your purchase.</p>
                <img
                    src={paySuccessImg}
                    alt="Payment Success"
                    className="img-fluid mb-2 w-75 "
                    style={{ maxHeight: '500px' }}
                    />
                </div>
                <Link to="/" className="btn btn-primary mt-4 w-50 align-self-center ">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

