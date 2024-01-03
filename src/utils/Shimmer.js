import React from 'react';

import "./Shimmer.css";

const shimmer = () => {
    return (
        <div className="shimmer-container">
            {new Array(12).fill(1).map((_, index) => (
                <div key={index} className="rectangle-box"></div>
            ))}
        </div>
    )
}

export default shimmer;