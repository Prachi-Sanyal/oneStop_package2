import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CategoryDropdown = ({ onSelectCategory }) => {
    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        onSelectCategory(eventKey);
        navigate(`/packages/${eventKey}`);
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Events
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="Wedding">Wedding</Dropdown.Item>
                <Dropdown.Item eventKey="Cultural">Cultural</Dropdown.Item>
                <Dropdown.Item eventKey="Milestones">Milestones</Dropdown.Item>
                <Dropdown.Item eventKey="Corporate">Corporate</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CategoryDropdown;
