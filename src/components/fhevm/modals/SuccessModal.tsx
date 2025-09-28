'use client';

import React from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    transactionHash?: string;
}

export default function SuccessModal({ isOpen, onClose, transactionHash }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-green-600">
                <div className="text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Transaction Successful!</h3>
                    <p className="text-gray-300 mb-4">
                        Your private transaction has been confirmed on the blockchain.
                    </p>
                    
                    {transactionHash && (
                        <div className="bg-gray-800 rounded-lg p-3 mb-4 border border-gray-700">
                            <div className="text-sm text-gray-400 mb-1">Transaction Hash:</div>
                            <div className="font-mono text-xs text-green-400 break-all">
                                {transactionHash}
                            </div>
                        </div>
                    )}
                    
                    <button
                        onClick={onClose}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}