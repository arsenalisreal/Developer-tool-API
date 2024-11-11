import React from "react";
import './ApiStatsWidget.css';

function ApiStatsWidget({ stats = [] }) {
    if (stats.length === 0) {
        return <div className="stats-placeholder">Stats will appear here</div>;
    }

    // Calculate average response time and status counts
    const avgTime = (stats.reduce((sum, s) => sum + parseFloat(s.time), 0) / stats.length).toFixed(2);
    const statusCounts = stats.reduce((acc, stat) => {
        acc[stat.status] = (acc[stat.status] || 0) + 1;
        return acc;
    }, {});

    // Determine circle color based on status
    const circleClass = statusCounts[200] === stats.length ? "success" : "error";

    return (
        <div className="stats-widget">
            <h3>API Stats</h3>
            <div className="circle-widget">
                <div className="circular-chart">
                    <svg viewBox="0 0 36 36">
                        <circle className={`circle ${circleClass}`} cx="18" cy="18" r="15.9" />
                    </svg>
                    <div className="circle-text">
                        <span>{avgTime} ms</span>
                    </div>
                </div>
                <ul className="status-list">
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <li key={status}>Status {status}: {count}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ApiStatsWidget;
