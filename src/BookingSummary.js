import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './BookingSummary.css';

function BookingSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPreferences = {}, packageDetails = {} } = location.state || {};

    // Check if necessary data is available
    const isDataAvailable = packageDetails.package_name && Object.keys(selectedPreferences).length > 0;

    // Initialize state for form data
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        date: '',
        time: '',
        guests: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to payment page
        navigate('/payment', { state: { formData } });
    };

    if (!isDataAvailable) {
        return (
            <div className="container mt-4">
                <h3>Error: Booking details are missing.</h3>
                <p>Please ensure that all necessary data is provided.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h3>Booking Summary</h3>
                    <div>
                        <h4>{packageDetails.package_name}</h4>
                        {Object.keys(selectedPreferences).map(service => (
                            <div key={service}>
                                <h5>{service}</h5>
                                <ul>
                                    {selectedPreferences[service].map((vendorIndex) => {
                                        const vendor = packageDetails.vendor_details[service]?.[vendorIndex];
                                        return vendor ? (
                                            <li key={vendorIndex}>
                                                {vendor.name} - {vendor.contact}
                                            </li>
                                        ) : (
                                            <li key={vendorIndex}>Vendor details not available</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Event Details</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your contact number"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGuests">
                            <Form.Label>Number of Guests</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter number of guests"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Booking
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;
