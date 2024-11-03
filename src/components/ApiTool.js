import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MethodDropdown from './MethodDropdown';
import APIStatsWidget from './ApiStatsWidget';
import './ApiTool.css';

function ApiTool() {
    const location = useLocation();
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [requestBody, setRequestBody] = useState('');
    const [increment, setIncrement] = useState(1);
    const [response, setResponse] = useState(null);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        if (location.state) {
            setUrl(location.state.api);
            setMethod(location.state.method);
            setRequestBody(location.state.requestBody || '');
        }
    }, [location.state]);
    const handleSubmit = async () => {
        try {
            for (var i=0; i<increment;i++){
                const startTime = Date.now();

                // Debugging logs
                console.log(`Method: ${method}`);
                console.log(`URL: ${url}`);
                console.log(`Request Body: ${requestBody}`);
    
                // Define fetch options based on dropdown method selection and requestBody
                const options = {
                    method,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    ...(method === 'POST' || method === 'PUT' ? { body: JSON.stringify(requestBody) } : {})
                };
    
                // Send the API request and calculate response time
                const apiResponse = await fetch(url, options);
                if (!apiResponse.ok) {
                    throw new Error(`HTTP error! status: ${apiResponse.status}`);
                }
    
                const data = await apiResponse.json();
                const timeTaken = Date.now() - startTime;
    
                // Update response and stats
                const result = {
                    message: data,
                    status: apiResponse.status,
                    time: timeTaken
                };
    
                setResponse(result); // Display API response
                setStats((prevStats) => [...prevStats, result]); // Track stats for display
            }
        } catch (error) {
            setResponse({ message: `Error: ${error.message}`, status: 'Error', time: 0 });
        }
    };

    const handleIncrementChange = (e) => {
        const value = Math.min(100, e.target.value);
        setIncrement(value);
    };

    return (
        <div className="api-tool">
            <div className="api-form">
                <MethodDropdown method={method} setMethod={setMethod} />
                <input
                    type="text"
                    placeholder="Enter the API URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="url-input"
                />
                x<input
                    type="number"
                    min="1"
                    max="100"
                    value={increment}
                    onChange={handleIncrementChange}
                    className="incrementer"
                />
                <button onClick={handleSubmit} className="submit-btn">Send</button>
            </div>

            {/* Conditionally render request body input if POST or PUT is selected */}
            {['POST', 'PUT'].includes(method) && (
                <textarea
                    className="request-body"
                    placeholder="Request Body"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                />
            )}

            <div className="response-section">
                <div className="response-box">
                    <pre>{response ? JSON.stringify(response, null, 2) : 'No response yet'}</pre>
                </div>
                <APIStatsWidget stats={stats} /> {/* Pass stats to APIStatsWidget */}
            </div>
        </div>
    );
}

export default ApiTool;
