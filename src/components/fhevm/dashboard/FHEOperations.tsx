'use client';

import React from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';

export default function FHEOperations() {
    const { fhevm, currentOperation, isWalletConnected } = useFHEVM();
    
    const stats = fhevm?.getStats();

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">🔐 ZTC Operations</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-300">Encryptions:</span>
                    <span className="font-semibold text-white">{isWalletConnected ? stats?.encryptionCount : 0 }</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Homomorphic Ops:</span>
                    <span className="font-semibold text-white"> {isWalletConnected ? stats?.homomorphicOps :0}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Decryptions:</span>
                    <span className="font-semibold text-white">{isWalletConnected ? stats?.decryptionCount : 0}</span>
                </div>
                <div className="bg-blue-900 bg-opacity-30 rounded-lg p-2 border border-blue-600">
                    <div className="text-xs text-blue-400">Current Operation:</div>
                    <div className="text-sm font-medium text-blue-300">{currentOperation}</div>
                </div>
            </div>
        </div>
    );
}