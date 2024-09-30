import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import payFailed from '../../Images/paymentFailed.jpg';
import { paymentCanceled } from '../../Services/orderAPI';

export const PaymentCanceled: React.FC = () => {
    const query = new URLSearchParams(useLocation().search);
    const orderId = query.get('orderId');
    const sessionId = query.get('sessionId');

    useEffect(() => {
        (async () => {
            await paymentCanceled(orderId, sessionId);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        })();

    }, [orderId, sessionId]);



    return (
        <div className="container text-center my-2">
            <div className="card p-4 shadow-lg d-flex justify-content-center">
                <div>
                <p className="mt-1 fs-1 text-danger">Payment Cancelled</p>
                <img
                    src={payFailed}
                    alt="Payment Success"
                    className="img-fluid mb-2 w-75 "
                    style={{ maxHeight: '500px' }}
                    />
                </div>
                <Link to="/" className="btn btn-danger mt-4 w-50 align-self-center ">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

