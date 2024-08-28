import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PackagesList = () => {
    const [packages, setPackages] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/packages/${category}`);
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, [category]);

    return (
        <Container className="mt-4">
            <h2>{category} Packages</h2>
            <Row>
                {packages.map((pkg) => (
                    <Col key={pkg._id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{pkg.package_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Guest Limit: {pkg.guest_limit}</Card.Subtitle>
                                <ul>
                                    {Object.entries(pkg.services).map(([service, available]) => (
                                        <li key={service}>
                                            {available ? '✅' : '❌'} {service}
                                        </li>
                                    ))}
                                </ul>
                                <Card.Text>Price: Rs.{pkg.price}</Card.Text>
                                <Link to={`/packages/details/${pkg._id}`} className="btn btn-primary">View Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PackagesList;
