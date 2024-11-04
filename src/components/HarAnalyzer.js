// src/components/HarAnalyzer.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HarAnalyzer.css';

const HarAnalyzer = () => {
    const [harData, setHarData] = useState([]);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const harJson = JSON.parse(event.target.result);
                    const entries = harJson.log.entries.map(entry => ({
                        api: entry.request.url,
                        method: entry.request.method,
                        size: `${Math.round(entry.response.bodySize / 1024)}KB`,
                        time: `${entry.time}ms`,
                        status: entry.response.status
                    }));
                    setHarData(entries);
                } catch (error) {
                    console.error("Invalid HAR file:", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const reExecuteAPI = (entry) => {
        navigate('/apiTool', {
            state: {
                api: entry.api,
                method: entry.method,
                requestBody: entry.method === 'POST' || entry.method === 'PUT' ? entry.requestBody : ''
            }
        });
    };

    return (
        <div className="har-analyzer">
            <input type="file" onChange={handleFileUpload} accept=".har" className="upload-button" />
            {harData.length > 0 && (
                <table className="har-table">
                    <tbody>
                         <tr>
                            <th>API</th>
                            <th>Method</th>
                            <th>Size</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        {harData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.api}</td>
                                <td>{entry.method}</td>
                                <td>{entry.size}</td>
                                <td>{entry.time}</td>
                                <td>{entry.status}</td>
                                <td>
                                    <button className="re-execute-button" onClick={() => reExecuteAPI(entry)}>
                                        Re-execute
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HarAnalyzer;
