import React from 'react';

export default function PrivacyMetrics() {
    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🛡️ Privacy Level</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Data Encryption:</span>
                    <span className="text-green-400 font-semibold">128-bit ZTC</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Zero Knowledge:</span>
                    <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Homomorphic:</span>
                    <span className="text-green-400 font-semibold">Enabled</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="text-center text-sm text-gray-300">Privacy Score: 95/100</div>
            </div>
        </div>
    );
}