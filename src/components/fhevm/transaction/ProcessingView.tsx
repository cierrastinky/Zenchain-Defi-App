'use client';

import React, { useState, useEffect } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';
import { ProcessingStep } from '@/types/fhevm';

export default function ProcessingView() {
    const { isProcessing, currentOperation, currentAmount } = useFHEVM();
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<ProcessingStep[]>([]);

    const processingSteps: ProcessingStep[] = [
        { message: "Initializing ZTC transaction...", progress: 10, step: 1 },
        { message: "Encrypting transaction data with ZTC...", progress: 25, step: 2 },
        { message: "Generating zero-knowledge proof...", progress: 45, step: 3 },
        { message: "Performing homomorphic computation...", progress: 65, step: 4 },
        { message: "Validating encrypted state...", progress: 80, step: 5 },
        { message: "Broadcasting to ZenChain network...", progress: 95, step: 6 },
        { message: "Transaction confirmed!", progress: 100, step: 7 }
    ];

    useEffect(() => {
        if (isProcessing) {
            setSteps(processingSteps);
            setCurrentStep(0);
            
            const interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev < processingSteps.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        } else {
            setCurrentStep(0);
            setSteps([]);
        }
    }, [isProcessing]);

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">⚡ Processing Status</h3>
            
            {!isProcessing ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">⏳</div>
                    <div className="text-gray-400">Waiting for transaction...</div>
                    <div className="text-sm text-gray-500 mt-2">
                        All operations are performed with full privacy using ZTC
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Current Operation */}
                    <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3 border border-blue-600">
                        <div className="text-sm font-medium text-blue-300">{currentOperation}</div>
                        <div className="text-sm font-semibold text-green-400">{currentAmount.toFixed(4)} ZTC</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${steps[currentStep]?.progress || 0}%` }}
                        ></div>
                    </div>

                    {/* Processing Steps */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {steps.map((step, index) => (
                            <div 
                                key={index}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-all ${
                                    index <= currentStep 
                                        ? 'bg-green-900 bg-opacity-30 border border-green-600' 
                                        : 'bg-gray-800 border border-gray-700'
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    index < currentStep 
                                        ? 'bg-green-500 text-white' 
                                        : index === currentStep 
                                            ? 'bg-green-500 text-black animate-pulse' 
                                            : 'bg-gray-600 text-gray-400'
                                }`}>
                                    {index < currentStep ? '✓' : step.step}
                                </div>
                                <div className={`text-sm ${
                                    index <= currentStep ? 'text-white' : 'text-gray-400'
                                }`}>
                                    {step.message}
                                </div>
                                {index === currentStep && (
                                    <div className="ml-auto">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Technical Info */}
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <div className="text-xs text-gray-400 mb-1">ZTC Technical Details:</div>
                        <div className="text-xs space-y-1">
                            <div>• Encryption: ZTC 128-bit security</div>
                            <div>• Zero-Knowledge: PLONK proof system</div>
                            <div>• Network: ZenChain Testnet (ZTC)</div>
                            <div>• Privacy: Complete transaction confidentiality</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}