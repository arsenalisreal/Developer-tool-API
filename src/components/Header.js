// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import bitsLogo from './../bits-logo.png'; // Make sure to place the logo in the appropriate folder

const Header = () => (
    <header className="header">
        <div className="logo-container">
            <img src={bitsLogo} alt="BITS Pilani Logo" className="logo" />
            <span className="title">Developer Tool API</span>
        </div>
        <nav className="nav-links">
            <Link to="/apiTool">API Tool</Link>
            <Link to="/harAnalyzer">HAR Analyzer</Link>
            <Link to="/jsonBeautifier">JSON</Link>
            <Link to="/apiResponseComparator">Text Comparator</Link>
        </nav>
    </header>
);

export default Header;
