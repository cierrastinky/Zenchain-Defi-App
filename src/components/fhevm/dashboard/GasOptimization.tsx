import React, { useState, useEffect } from 'react';

export default function GasOptimization() {
    const [gasEstimate, setGasEstimate] = useState(180000);

    useEffect(() => {
        const updateGasEstimate = () => {
            const newEstimate = 180000 + Math.floor(Math.random() * 20000);
            setGasEstimate(newEstimate);
        };

        const interval = setInterval(updateGasEstimate, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">⛽ Gas Efficiency</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Standard TX:</span>
                    <span className="font-semibold text-white">21,000 gas</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">ZTC TX:</span>
                    <span className="font-semibold text-white">~{gasEstimate.toLocaleString("en-US")} gas</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Privacy Premium:</span>
                    <span className="font-semibold text-green-400">8.5x</span>
                </div>
                <div className="bg-green-900 bg-opacity-30 rounded-lg p-2 border border-green-700">
                    <div className="text-xs text-green-400">Optimization:</div>
                    <div className="text-sm font-medium text-green-300">Batch operations save 40%</div>
                </div>
            </div>
        </div>
    );
}