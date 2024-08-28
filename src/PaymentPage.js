import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './PaymentPage.css';

function PaymentPage() {
    return (
        <div className="container mt-4">
            <h3>Payment Details</h3>
            <Form>
                <Form.Group controlId="formCardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your card number"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formExpiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCVV">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter CVV"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Process Payment
                </Button>
            </Form>
        </div>
    );
}

export default PaymentPage;
