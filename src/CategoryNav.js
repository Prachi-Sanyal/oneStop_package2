import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CategoryNav = () => {
    const navigate = useNavigate();

    const handleSelect = (category) => {
        navigate(`/packages/${category}`);
    };

    return (
        <Nav className="justify-content-center" activeKey="/">
            <Nav.Item>
                <Nav.Link onClick={() => handleSelect('Wedding')}>Wedding</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => handleSelect('Cultural')}>Cultural</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => handleSelect('Milestones')}>Milestones</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => handleSelect('Corporate')}>Corporate</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default CategoryNav;
