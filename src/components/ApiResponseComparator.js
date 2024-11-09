// src/components/JsonComparer.js
import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';
import './ApiResponseComparator.css';

const JsonComparer = () => {
    const [leftJson, setLeftJson] = useState('');
    const [rightJson, setRightJson] = useState('');
    const [showDiff, setShowDiff] = useState(false);

    const handleCompare = () => {
        setShowDiff(true);
    };

    const parseJson = (json) => {
        try {
            return JSON.stringify(JSON.parse(json), null, 2);
        } catch (error) {
            return '{ "error": "Invalid JSON" }';
        }
    };

    return (
        <div className="json-comparer">
            <div className="text-boxes">
                <textarea
                    className="json-input"
                    value={leftJson}
                    onChange={(e) => setLeftJson(e.target.value)}
                    readOnly={showDiff}
                />
                <button className="compare-button" onClick={handleCompare}>
                    Compare
                </button>
                <textarea
                    className="json-input"
                    value={rightJson}
                    onChange={(e) => setRightJson(e.target.value)}
                    readOnly={showDiff}
                />
            </div>
            {showDiff && (
                <DiffViewer
                    oldValue={parseJson(leftJson)}
                    newValue={parseJson(rightJson)}
                    splitView={true}
                    styles={{
                        variables: {
                            diffViewerBackground: '#fafafa',
                            addedBackground: '#e6ffed',
                            addedColor: '#008000',
                            removedBackground: '#ffeef0',
                            removedColor: '#ff0000',
                        },
                    }}
                />
            )}
        </div>
    );
};

export default JsonComparer;
