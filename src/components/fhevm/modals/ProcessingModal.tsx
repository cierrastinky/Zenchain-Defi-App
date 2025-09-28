'use client';

import React, { useEffect, useState } from 'react';

interface ProcessingModalProps {
    isOpen: boolean;
    onClose: () => void;
    operation: string;
}

export default function ProcessingModal({ isOpen, onClose, operation }: ProcessingModalProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setProgress(0); // reset về 0 mỗi lần mở modal
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1; // tăng mỗi lần 1%
                });
            }, 30); // mỗi 30ms tăng 1% → đầy trong ~3 giây
            return () => clearInterval(interval);
        } else {
            setProgress(0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-green-700">
                <div className="text-center">
                    <div className="text-4xl mb-4">🔄</div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Processing Transaction</h3>
                    <p className="text-gray-300 mb-4">{operation}</p>
                    
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    <p className="text-sm text-gray-400">
                        {progress < 100 
                            ? `Processing... ${progress}%` 
                            : "✅ Done! Transaction complete."}
                    </p>
                </div>
            </div>
        </div>
    );
}
