// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ApiTool from './components/ApiTool';
import HarAnalyzer from './components/HarAnalyzer';

function App() {
    return (
        <Router>
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/apiTool" element={<ApiTool />} />
                    <Route path="/harAnalyzer" element={<HarAnalyzer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
