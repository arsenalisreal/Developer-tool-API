// src/components/HarAnalyzer.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HarAnalyzer.css';

const HarAnalyzer = () => {
    const [harData, setHarData] = useState([]);
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const harContent = JSON.parse(e.target.result);
            const entries = harContent.log.entries.map((entry) => ({
                api: entry.request.url,
                size: `${(entry.response.bodySize / 1024).toFixed(2)} KB`,
                time: `${entry.time} ms`,
                status: entry.response.status,
                method: entry.request.method,
                requestBody: entry.request.postData?.text || '',
            }));
            setHarData(entries);
        };
        reader.readAsText(file);
    };

    const handleReExecute = (api, method, requestBody) => {
        navigate('/api-tool', { state: { api, method, requestBody } });
    };

    return (
        <div className="har-analyzer">
            <input type="file" accept=".har" onChange={handleFileUpload} className="upload-btn" />
            <table className="har-table">
                <thead>
                    <tr>
                        <th>API</th>
                        <th>Size</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {harData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.api}</td>
                            <td>{entry.size}</td>
                            <td>{entry.time}</td>
                            <td>{entry.status}</td>
                            <td>
                                <button
                                    onClick={() => handleReExecute(entry.api, entry.method, entry.requestBody)}
                                    className="execute-btn"
                                >
                                    Re-Execute
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HarAnalyzer;
