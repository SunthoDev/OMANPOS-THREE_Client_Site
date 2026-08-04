import React from 'react';
import "./LoadingComponent.css"

const LoadingComponent = () => {
    return (
        <div className="LoadingComponentParent">
            <div className="loading-overlay">
                <div className="Spinner"></div>
            </div>
        </div>
    );
};

export default LoadingComponent;