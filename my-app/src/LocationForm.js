import React, { useState } from 'react';

const LocationForm = ({ onFormSubmit }) => {
    const [zipCode, setZipCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(zipCode);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
            />
            <button type="submit">Get Weather</button>
        </form>
    );
};

export default LocationForm;
