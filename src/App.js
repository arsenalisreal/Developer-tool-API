import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiTool from "./components/ApiTool";
import HarAnalyzer from "./components/HarAnalyzer";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1 className="app-title">API Tool</h1>
                    <div className="nav-options">
                        <button className="nav-button" onClick={() => window.location.href = "/"}>API Tool</button>
                        <button className="nav-button" onClick={() => window.location.href = "/har-analyzer"}>HAR Analyzer</button>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<ApiTool />} />
                    <Route path="/har-analyzer" element={<HarAnalyzer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
