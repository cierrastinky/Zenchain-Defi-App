'use client';

import React from 'react';
import { Transaction } from '@/types/fhevm';
import { formatBalance, formatHash, formatTimestamp } from '@/utils/fhevm/formatting';

interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
    if (!isOpen || !transaction) {
        console.log("Chua mo modal")
        return null
    };
    console.log(isOpen)
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-400';
            case 'pending': return 'text-green-400';
            case 'failed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'deposit': return 'text-green-400';
            case 'withdraw': return 'text-red-400';
            case 'transfer': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };
    console.log("Modal should render now", { isOpen, transaction });
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 border border-green-700 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-green-400">Transaction Details</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-green-400 font-semibold mb-3">Basic Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-400">Type:</div>
                                <div className={`font-semibold ${getTypeColor(transaction.type)}`}>
                                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-400">Status:</div>
                                <div className={`font-semibold ${getStatusColor(transaction.status)}`}>
                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-400">Amount:</div>
                                <div className="text-white font-semibold">{formatBalance(transaction.amount)}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Timestamp:</div>
                                <div className="text-white">{(transaction.timestamp)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Hash */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-green-400 font-semibold mb-3">Transaction Hash</h4>
                        <div className="font-mono text-sm text-green-400 bg-gray-900 p-3 rounded border break-all">
                            {transaction.hash}
                        </div>
                    </div>

                    {/* Recipient (if transfer) */}
                    {transaction.recipient && (
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                            <h4 className="text-green-400 font-semibold mb-3">Recipient Address</h4>
                            <div className="font-mono text-sm text-green-400 bg-gray-900 p-3 rounded border break-all">
                                {transaction.recipient}
                            </div>
                        </div>
                    )}

                    {/* Encrypted Data */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-green-400 font-semibold mb-3">🔐 Encrypted Amount (ZTC)</h4>
                        <div className="font-mono text-xs bg-gray-900 p-3 rounded border break-all text-green-400">
                            {transaction.encryptedAmount}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                            This ciphertext contains the encrypted transaction amount using ZTC encryption.
                            Only authorized parties with the correct keys can decrypt this value.
                        </div>
                    </div>

                    {/* Gas Information */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-green-400 font-semibold mb-3">⛽ Gas Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-400">Gas Used:</div>
                                <div className="text-white font-semibold">{transaction.gasUsed.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Gas Fee:</div>
                                <div className="text-white font-semibold">{transaction.gasFeeEth.toFixed(6)} ZTC</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Fee Percentage:</div>
                                <div className="text-green-400 font-semibold">
                                    {((transaction.gasFeeEth / transaction.amount) * 100).toFixed(4)}%
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-400">Gas Price:</div>
                                <div className="text-white font-semibold">25 gwei</div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Features */}
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-green-400 font-semibold mb-3">🛡️ Privacy Features</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span className='text-white'>Amount encrypted with ZTC</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span className='text-white'>Zero-knowledge proof generated</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span className='text-white'>Homomorphic computation performed</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-400">✓</span>
                                <span className='text-white'>Transaction metadata protected</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}