import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentSuccess() {
    const location = useLocation();
    const { formData = {}, packageDetails = {} } = location.state || {};

    return (
        <div className="container mt-4">
            <h3>Payment Successful!</h3>
            <p>Your advance payment for the {packageDetails.package_name} package has been successfully received.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
                <li>Name: {formData.name}</li>
                <li>Contact: {formData.contact}</li>
                <li>Date: {formData.date}</li>
                <li>Time: {formData.time}</li>
                <li>Guests: {formData.guests}</li>
            </ul>
            <p>The remaining balance will be paid after the event.</p>
        </div>
    );
}

export default PaymentSuccess;
