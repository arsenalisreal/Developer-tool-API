import React, { useState } from "react";
import ApiStatsWidget from "./ApiStatsWidget";

function ApiTool() {
    const [url, setUrl] = useState("");
    const [method, setMethod] = useState("GET");
    const [iterations, setIterations] = useState(1);
    const [requestBody, setRequestBody] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [stats, setStats] = useState([]);

    const handleApiCall = async () => {
        setResponseData(null);
        setStats([]);
        const results = [];

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { "Content-Type": "application/json" },
                    body: method === "GET" ? null : requestBody,
                });
                const data = await response.json();
                const end = performance.now();

                results.push({
                    time: (end - start).toFixed(2),
                    status: response.status,
                    iteration: i + 1,
                });

                if (i === 0) setResponseData(JSON.stringify(data, null, 2));
            } catch (error) {
                console.error("API call error:", error);
            }
        }
        setStats(results);
    };

    return (
        <div className="api-tool">
            <div className="input-section">
                <div className="top-row">
                    <select
                        className="method-dropdown"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Enter API URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="input-box"
                    />
                    <div className="iterations">
                        <label>x</label>
                        <input
                            type="number"
                            value={iterations}
                            onChange={(e) => setIterations(e.target.value)}
                            min="1"
                            className="small-input-box"
                        />
                    </div>
                    <button className="fetch-btn" onClick={handleApiCall}>➔</button>
                </div>
                <textarea
                    className="input-box"
                    placeholder="Enter request body"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                />
                <div className="response-section">
                    <div className="response-box">
                        <h3>Response</h3>
                        <pre>{responseData || "Response will appear here"}</pre>
                    </div>
                    <ApiStatsWidget stats={stats} />
                </div>
            </div>
        </div>
    );
}

export default ApiTool;
