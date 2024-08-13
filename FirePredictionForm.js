
import React, { useState } from 'react';
import axios from 'axios';

function FirePredictionForm() {
    const [formData, setFormData] = useState({
        FFMC: '',
        DMC: '',
        DC: '',
        ISI: '',
        temp: '',
        RH: '',
        wind: '',
        rain: ''
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', [formData]);
            setPrediction(response.data);
        } catch (error) {
            console.error("Error making prediction", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Render input fields */}
            <input type="number" name="FFMC" value={formData.FFMC} onChange={handleChange} placeholder="FFMC" />
            <input type="number" name="DMC" value={formData.DMC} onChange={handleChange} placeholder="DMC" />
            <input type="number" name="DC" value={formData.DC} onChange={handleChange} placeholder="DC" />
            <input type="number" name="ISI" value={formData.ISI} onChange={handleChange} placeholder="ISI" />
            <input type="number" name="temp" value={formData.temp} onChange={handleChange} placeholder="Temperature" />
            <input type="number" name="RH" value={formData.RH} onChange={handleChange} placeholder="RH" />
            <input type="number" name="wind" value={formData.wind} onChange={handleChange} placeholder="Wind" />
            <input type="number" name="rain" value={formData.rain} onChange={handleChange} placeholder="Rain" />
            <button type="submit">Predict</button>
            {prediction && <div>Prediction: {prediction}</div>}
        </form>
    );
}

export default FirePredictionForm;
