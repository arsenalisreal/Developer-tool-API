// src/components/JsonBeautifier.js
import React, { useState } from "react";
import "./JsonBeautifier.css";

const JsonBeautifier = () => {
    const [inputJson, setInputJson] = useState("");
    const [outputJson, setOutputJson] = useState("");
    const [error, setError] = useState("");

    const handleBeautify = () => {
        try {
            const parsed = JSON.parse(inputJson);
            setOutputJson(JSON.stringify(parsed, null, 2));
            setError("");
        } catch (err) {
            setError("Invalid JSON format.");
            setOutputJson("");
        }
    };

    const handleInputChange = (e) => {
        setInputJson(e.target.value);
    };

    const handleOutputChange = (e) => {
        setOutputJson(e.target.value);
    };

    return (
        <div className="json-beautifier">
            <h2>JSON Beautifier and Iterator</h2>
            <div className="text-boxes">
                <textarea
                    placeholder="Enter JSON here"
                    value={inputJson}
                    onChange={handleInputChange}
                    className="json-input"
                />
                <button className="convert-button" onClick={handleBeautify}>
                    Convert
                </button>
                <textarea
                    placeholder="Beautified JSON will appear here"
                    value={outputJson}
                    onChange={handleOutputChange}
                    className="json-output"
                />
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default JsonBeautifier;
