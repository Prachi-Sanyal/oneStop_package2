import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <h3>Payment Failed</h3>
            <p>Unfortunately, your payment couldn't be processed. Please try again.</p>
            <button onClick={() => navigate('/payment')}>Retry Payment</button>
        </div>
    );
}

export default PaymentFailed;
