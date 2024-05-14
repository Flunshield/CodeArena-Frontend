import React from 'react';

interface ProgressBarProps {
    progress: number; // valeur de progression de 0 à 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-52 md:w-96 bg-gray-200 h-4 rounded-lg">
            <div
                className="bg-petroleum-blue h-4 rounded-xl"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
export default ProgressBar;