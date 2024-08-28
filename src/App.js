import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import PackagesList from './PackagesList';
import CategoryDropdown from './CategoryDropdown';
import PackageDetails from './PackageDetails';
import './App.css'
import BookingSummary from './BookingSummary';
import PaymentPage from './PaymentPage';
function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate(); // This hook should be used inside a component rendered by Router

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/packages/${category}`);
    };

    return (
        <div className="App">
            {/* Navigation Bar */}
            <CategoryNav />

            {/* Category Dropdown */}
            <div style={{ padding: '20px' }}>
                <CategoryDropdown onSelectCategory={handleCategorySelect} />
            </div>

            {/* Package List Rendering */}
            <Routes>
                <Route path="/packages/:category" element={<PackagesList category={selectedCategory} />} />
                <Route path="/packages/details/:id" element={<PackageDetails />} />
                <Route path="/booking-summary" element={<BookingSummary />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/" element={<h1>Select a category to see packages</h1>} />
            </Routes>
        </div>
    );
}

export default App;
