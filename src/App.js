// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApiTool from './components/ApiTool';
import HarAnalyzer from './components/HarAnalyzer';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/apiTool" element={<ApiTool />} />
                        <Route path="/harAnalyzer" element={<HarAnalyzer />} />
                        <Route path="/" element={<ApiTool />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
