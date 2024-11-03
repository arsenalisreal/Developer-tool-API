// src/components/MethodDropdown.js

import React from 'react';
import './MethodDropdown.css';

const MethodDropdown = ({ method, setMethod }) => (
    <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className={`method-dropdown ${method.toLowerCase()}`}
    >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
    </select>
);

export default MethodDropdown;
