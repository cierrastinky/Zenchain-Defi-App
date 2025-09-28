'use client';

import React from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';
import { formatAddress } from '@/utils/fhevm/formatting';

export default function WalletStatus() {
    const { isWalletConnected, walletAddress, fhevm } = useFHEVM();

    if (!isWalletConnected) return null;

    return (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>Connected: <span className="font-mono">{formatAddress(walletAddress)}</span></span>
                </div>
                <div className="text-sm">
                    <span className="opacity-75">ZTC Key:</span>
                    <span className="font-mono text-xs">
                        {fhevm?.realFHEVM.publicKey?.substring(0, 20)}...
                    </span>
                </div>
            </div>
        </div>
    );
}