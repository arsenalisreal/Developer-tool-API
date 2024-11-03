// src/components/Header.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
        <NavLink to="/apiTool" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            API Tool
        </NavLink>
        <NavLink to="/harAnalyzer" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            HAR Analyzer
        </NavLink>
    </header>
);

export default Header;
