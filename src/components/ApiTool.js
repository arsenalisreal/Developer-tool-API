import React, { useState } from 'react';
import './ApiTool.css';

const ApiTool = () => {
    const [url, setUrl] = useState('');
    const [headers, setHeaders] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [iterations, setIterations] = useState(1);
    const [responseStats, setResponseStats] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('GET');

    const determineHeaders = () => {
        const headersObject = {};
        headers.split('\n').forEach((header) => {
            const [key, value] = header.split(':').map((str) => str.trim());
            if (key && value) {
                headersObject[key] = value;
            }
        });

        if (!headersObject['Content-Type']) {
            if (url.endsWith('.json')) {
                headersObject['Content-Type'] = 'application/json';
            } else if (url.endsWith('.xml')) {
                headersObject['Content-Type'] = 'application/xml';
            } else {
                headersObject['Content-Type'] = 'text/plain';
            }
        }

        return headersObject;
    };

    const handleApiCall = async () => {
        setResponseStats([]); // Reset stats before each call
        setResponseData(null); // Reset response data
        setError(null); // Reset error message
    
        let stats = [];
        const headerData = determineHeaders();
    
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            try {
                const response = await fetch(url, {
                    method: selectedMethod, // Add the selected HTTP method
                    headers: headerData,
                });
                const data = await response.json();
                const end = performance.now();
    
                setResponseData(JSON.stringify(data, null, 2)); // Format JSON nicely
                stats.push({
                    time: (end - start).toFixed(2),
                    status: response.status,
                    iteration: i + 1,
                });
            } catch (err) {
                stats.push({
                    time: 'N/A',
                    status: 'Error',
                    iteration: i + 1,
                });
                setError('Error fetching data. Check the URL or headers.');
            }
        }
        setResponseStats(stats); // Set the stats after the loop
    };
    

    const calculateAverageTime = () => {
        const validTimes = responseStats.filter(stat => stat.time !== 'N/A').map(stat => parseFloat(stat.time));
        if (validTimes.length === 0) return 'N/A';
        const avgTime = validTimes.reduce((acc, time) => acc + time, 0) / validTimes.length;
        return avgTime.toFixed(2) + ' ms';
    };

    return (
        <div className="api-tool-container">
            <header className="header">
                <h1>API Tool</h1>
            </header>
            <div className="api-tool">
                <div className="input-section">
                    <select 
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="method-dropdown"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input 
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter API URL"
                        className="input-box"
                    />
                    <button className="fetch-btn" onClick={handleApiCall}>
                        ➔
                    </button>
                    <div className="iterations-input">
                        <label>x</label>
                        <input
                            type="number"
                            value={iterations}
                            onChange={(e) => setIterations(e.target.value)}
                            min="1"
                            className="small-input-box"
                        />
                    </div>

                    {/* Stat Widget next to URL */}
                    <div className="stats-widget">
                        <h3>Stats</h3>
                        <div className="circle-widget">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                {responseStats.map((stat, index) => (
                                    <circle
                                        key={index}
                                        className={`circle ${stat.status === 200 ? 'success' : 'error'}`}
                                        strokeDasharray={`${(100 / iterations) * (index + 1)} ${100 - (100 / iterations) * (index + 1)}`}
                                        cx="18" cy="18" r="15.91549431"
                                    />
                                ))}
                            </svg>
                            <div className="circle-text">
                                <span>{calculateAverageTime()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="headers-section">
                    <textarea
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        placeholder="Enter headers in 'Key: Value' format"
                        className="input-box"
                    />
                </div>

                <div className="response-box">
                    {responseData ? (
                        <pre>{responseData}</pre>
                    ) : (
                        <p>{error ? error : "Response will be shown here"}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApiTool;
