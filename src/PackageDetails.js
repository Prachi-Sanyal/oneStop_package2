import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Tabs, Tab, Modal, Button, Card, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './PackageDetails.css';

function PackageDetails() {
    const { id } = useParams(); // package _id
    const navigate = useNavigate();
    const [packageDetails, setPackageDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/packages/details/${id}`);
                setPackageDetails(response.data);
            } catch (error) {
                console.error('Error fetching package details:', error);
                setError('Error fetching package details');
            } finally {
                setLoading(false);
            }
        };

        fetchPackageDetails();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (packageDetails.category && packageDetails.package_name) {
                    const response = await axios.get(`http://localhost:5001/api/reviews/${packageDetails.category}/${packageDetails.package_name}`);
                    setReviews(response.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            }
        };

        fetchReviews();
    }, [packageDetails]);

    const findNextAvailableServiceIndex = useCallback((startIndex) => {
        const services = Object.keys(packageDetails.vendor_details || {});
        for (let i = startIndex; i < services.length; i++) {
            const service = services[i];
            if (packageDetails.services[service] && packageDetails.vendor_details[service]?.length > 0) {
                return i;
            }
        }
        return -1;
    }, [packageDetails]);

    useEffect(() => {
        if (currentServiceIndex < Object.keys(packageDetails.vendor_details || {}).length) {
            const nextIndex = findNextAvailableServiceIndex(currentServiceIndex);
            if (nextIndex !== -1 && nextIndex !== currentServiceIndex) {
                setCurrentServiceIndex(nextIndex);
            }
        }
    }, [currentServiceIndex, findNextAvailableServiceIndex, packageDetails]);

    const handleShowModal = () => {
        console.log('Modal opened');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        console.log('Modal closed');
        setShowModal(false);
    };

    const handlePreferenceChange = (service, vendorIndex) => {
        setSelectedPreferences(prev => {
            const selected = prev[service] || [];
            if (selected.includes(vendorIndex)) {
                return {
                    ...prev,
                    [service]: selected.filter(index => index !== vendorIndex),
                };
            } else {
                return {
                    ...prev,
                    [service]: selected.length < 2 ? [...selected, vendorIndex] : [...selected.slice(1), vendorIndex],
                };
            }
        });
    };

    const handleConfirmBooking = () => {
        console.log('handleConfirmBooking called');
    
        // Navigate to booking summary without alert
        navigate('/booking-summary',{
            state: { selectedPreferences, packageDetails },
        });
    };

    const handleNextService = () => {
        const currentService = Object.keys(packageDetails.vendor_details || {})[currentServiceIndex];
        const isSelectionValid = selectedPreferences[currentService]?.length === 2;
        
        if (isSelectionValid) {
            const nextIndex = findNextAvailableServiceIndex(currentServiceIndex + 1);
            if (nextIndex !== -1) {
                setCurrentServiceIndex(nextIndex);
            }
        } else {
            console.log('Alert: Please select exactly 2 vendors for the current service.');
            //alert('Alert: Please select exactly 2 vendors for the current service.')
        }
    };

    const handlePreviousService = () => {
        const prevIndex = currentServiceIndex - 1;
        if (prevIndex >= 0) {
            const nextIndex = findNextAvailableServiceIndex(prevIndex);
            if (nextIndex !== -1) {
                setCurrentServiceIndex(nextIndex);
            }
        }
    };

    const renderVendorCards = (service, vendors) => {
        return vendors.map((vendor, index) => (
            <Card className="mb-3 vendor-card" key={index}>
                <Card.Img variant="top" src={vendor.image_url} />
                <Card.Body>
                    <Card.Title>{vendor.name}</Card.Title>
                    <Card.Text>
                        <strong>Contact:</strong> {vendor.contact}<br />
                        <strong>Address:</strong> {vendor.address}<br />
                        <strong>Description:</strong> {vendor.description}
                    </Card.Text>
                    <Form.Check
                        type="checkbox"
                        label="Select"
                        onChange={() => handlePreferenceChange(service, index)}
                        checked={selectedPreferences[service]?.includes(index) || false}
                    />
                </Card.Body>
            </Card>
        ));
    };

    const renderServiceSections = () => {
        const services = Object.keys(packageDetails.vendor_details || {});
        if (services.length === 0) return <p>No services available for this package.</p>;

        const currentService = services[currentServiceIndex];
        
        if (packageDetails.services[currentService] && packageDetails.vendor_details[currentService]?.length > 0) {
            const vendors = packageDetails.vendor_details[currentService];

            return (
                <div className="mb-4">
                    <h4>{currentService}</h4>
                    <div className="d-flex flex-wrap">
                        {renderVendorCards(currentService, vendors)}
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        {currentServiceIndex > 0 && (
                            <Button onClick={handlePreviousService}>Previous</Button>
                        )}
                        {findNextAvailableServiceIndex(currentServiceIndex + 1) !== -1 && (
                            <Button onClick={handleNextService}>Next</Button>
                        )}
                    </div>
                </div>
            );
        } else {
            if (findNextAvailableServiceIndex(currentServiceIndex + 1) !== -1) {
                handleNextService();
            } else {
                return <p>No more available services with vendors.</p>;
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h2>{packageDetails.category} - {packageDetails.package_name}</h2>
            {packageDetails.image_url && (
                <img src={packageDetails.image_url} className="img-fluid" alt={packageDetails.package_name} />
            )}
            <Tabs defaultActiveKey="overview" id="package-details-tabs" className="mb-3">
                <Tab eventKey="overview" title="Overview">
                    <h3>Overview</h3>
                    <p>{packageDetails.description || 'Loading...'}</p>
                    <Button className="btn btn-primary" onClick={handleShowModal}>Book Now</Button>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <h3>Reviews</h3>
                    {reviews.length > 0 ? (
                        <div>
                            {reviews.map((review) => (
                                <div className="mb-3" key={review._id}>
                                    <div className="d-flex align-items-center">
                                        {review.image_url && (
                                            <img src={review.image_url} alt="Review" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                                        )}
                                        <div className="ms-3">
                                            <p><strong>Rating:</strong> {'⭐'.repeat(review.stars)}</p>
                                            <p>{review.review_message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </Tab>
            </Tabs>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Select Your Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderServiceSections()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleConfirmBooking}>Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PackageDetails;
