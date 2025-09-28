'use client';

import React, { useState, useEffect } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';

export default function Navbar() {
    const { isWalletConnected, connectWallet, disconnectWallet, isProcessing } = useFHEVM();
    const [gasPrice, setGasPrice] = useState(25);

    useEffect(() => {
        const updateGasPrice = () => {
            const prices = [18, 22, 25, 28, 32, 35, 29, 24, 20, 26, 31, 27];
            const randomPrice = prices[Math.floor(Math.random() * prices.length)];
            setGasPrice(randomPrice);
        };

        const interval = setInterval(updateGasPrice, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleWalletClick = async () => {
        if (isWalletConnected) {
            disconnectWallet();
        } else {
            await connectWallet();
        }
    };

    return (
        <nav className="bg-gradient-to-r from-green-400 via-green-500 to-green-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="text-white text-xl font-bold">🔐 Private DeFi ZenChain</div>
                        <div className="ml-3 text-white text-sm opacity-75">ZenChain Powered</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-white text-sm">
                            <span className="opacity-75">Network:</span>
                            <span className="font-medium">ZenChain Testnet</span>
                        </div>
                        <div className="text-white text-sm">
                            <span className="opacity-75">Gas Price:</span>
                            <span className="font-medium">{gasPrice} gwei</span>
                        </div>
                        <button 
                            onClick={handleWalletClick}
                            disabled={isProcessing}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
    isWalletConnected 
        ? 'bg-green-600 text-white hover:bg-green-700' 
        : 'bg-green-400 text-black hover:bg-green-300'
}`}

                        >
                            {isProcessing ? 'Connecting...' : (isWalletConnected ? 'Disconnect' : 'Connect Wallet')}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}