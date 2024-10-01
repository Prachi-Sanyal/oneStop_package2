import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const { packageDetails } = location.state || {};

    if (!packageDetails) {
        return <div>Error: No package details found.</div>;
    }

    const buyFunction = async () => {
        try {
            const response = await axios.post('http://localhost:3000/payment', {
                package: {
                    name: packageDetails.package_name, // Send package name
                    price: packageDetails.price / 2, // Send 50% of the package price
                },
            });
            
            if (response.status === 200) {
                window.location.href = response.data.url; // Redirect to Stripe Checkout URL
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div>
            <h1>Book your package now</h1>
            <h3>{packageDetails.package_name}</h3> {/* Display package name */}
            <p>Amount: ₹{(packageDetails.price / 2).toFixed(2)}</p> {/* Display 50% amount */}
            <button onClick={buyFunction}>Pay Now</button>
        </div>
    );
}

export default Payment;
