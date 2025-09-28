'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';
import { useModals } from '@/hooks/useModals';
import { calculateGasFee } from '@/utils/fhevm/gasCalculation';
import { useDispatch } from 'react-redux';
import { showProcessing, showSuccess } from "@/redux/modalSlice";
export default function TransactionForm() {
    const { isWalletConnected, processTransaction, isProcessing, transactions} = useFHEVM();
    // const { showProcessing, showSuccess } = useModals();
    const dispatch = useDispatch();
    const [operation, setOperation] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [gasEstimate, setGasEstimate] = useState({ gasUsed: 0, gasFeeEth: 0, feePercentage: '0' });

    React.useEffect(() => {
        if (amount && parseFloat(amount) > 0) {
            const estimate = calculateGasFee(parseFloat(amount), operation);
            setGasEstimate(estimate);
        }
    }, [amount, operation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isWalletConnected || !amount || parseFloat(amount) <= 0) return;

        // dispatch(showProcessing());
        
        try {
            await processTransaction(
                operation, 
                parseFloat(amount), 
                operation === 'transfer' ? recipient : undefined
            );
            dispatch(showSuccess())
            
            setAmount('');
            setRecipient('');
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    const isFormValid = () => {
        if (!isWalletConnected || !amount || parseFloat(amount) <= 0) return false;
        if (operation === 'transfer' && !recipient) return false;
        return true;
    };

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">💸 Private Transactions</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Operation Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Operation Type</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['deposit', 'withdraw', 'transfer'] as const).map((op) => (
                            <button
                                key={op}
                                type="button"
                                onClick={() => setOperation(op)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                    operation === op
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {op.charAt(0).toUpperCase() + op.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Amount (ZTC)
                    </label>
                    <input
                        type="number"
                        step="0.000001"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                        disabled={!isWalletConnected || isProcessing}
                    />
                </div>

                {/* Recipient Address (for transfers) */}
                {operation === 'transfer' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Recipient Address
                        </label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="0x742d35Cc6634C0532925a3b8D4C0C0e4C5F8b4..."
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 font-mono text-sm"
                            disabled={!isWalletConnected || isProcessing}
                        />
                    </div>
                )}

                {/* Gas Estimation */}
                {amount && parseFloat(amount) > 0 && (
                    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <div className="text-xs text-gray-400 mb-2">Gas Estimation:</div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Gas Limit:</span>
                                <span className="text-white">{gasEstimate.gasUsed.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Fee:</span>
                                <span className="text-white">{gasEstimate.gasFeeEth.toFixed(6)} ZTC</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Fee %:</span>
                                <span className="text-green-400">{gasEstimate.feePercentage}%</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isFormValid() || isProcessing}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing 
                        ? '🔄 Processing...' 
                        : `🔐 Execute ${operation.charAt(0).toUpperCase() + operation.slice(1)} (Private)`
                    }
                </button>

                {/* Wallet Connection Notice */}
                {!isWalletConnected && (
                    <div className="text-center text-sm text-gray-400">
                        Connect your wallet to perform transactions
                    </div>
                )}
            </form>
        </div>
    );
}