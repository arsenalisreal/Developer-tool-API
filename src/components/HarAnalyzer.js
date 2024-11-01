import React, { useState } from "react";

function HarAnalyzer() {
    const [harData, setHarData] = useState([]);
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            const entries = data.log.entries.map((entry) => ({
                url: entry.request.url,
                method: entry.request.method,
                time: entry.time,
                size: entry.request.bodySize,
            }));
            setHarData(entries);
        };
        
        reader.readAsText(file);
    };

    const reExecuteApiCall = async (url, method) => {
        try {
            const response = await fetch(url, { method });
            const result = await response.json();
            console.log("Re-executed API response:", result);
        } catch (error) {
            console.error("Error re-executing API call:", error);
        }
    };

    return (
        <div className="har-analyzer">
            <input type="file" accept=".har" onChange={handleFileUpload} />
            {harData.length > 0 && (
                <table className="har-table">
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Method</th>
                            <th>Request Size (bytes)</th>
                            <th>Time (ms)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {harData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.url}</td>
                                <td>{entry.method}</td>
                                <td>{entry.size}</td>
                                <td>{entry.time}</td>
                                <td>
                                    <button onClick={() => reExecuteApiCall(entry.url, entry.method)}>Re-Execute</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default HarAnalyzer;
