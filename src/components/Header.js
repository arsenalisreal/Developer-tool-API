import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import bitsLogo from './../bits-wilp.png';

const Header = () => (
    <header className="header">
        <div className="logo-container">
            <img src={bitsLogo} alt="BITS Pilani Logo" className="logo" />
        </div>
        <nav className="nav-links">
            <Link to="/apiTool" className="nav-button">API Tool</Link>
            <Link to="/harAnalyzer" className="nav-button">HAR Analyzer</Link>
            <Link to="/jsonBeautifier" className="nav-button">JSON</Link>
            <Link to="/apiResponseComparator" className="nav-button">Text Comparator</Link>
        </nav>
    </header>
);

export default Header;
