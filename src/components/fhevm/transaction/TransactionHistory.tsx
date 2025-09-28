'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';
import { useDispatch } from 'react-redux';
import { showTransactionDetails } from "@/redux/modalSlice";
import { formatBalance, formatHash, formatTimestamp } from '@/utils/fhevm/formatting';

export default function TransactionHistory() {
    const { transactions, isWalletConnected } = useFHEVM();
    const dispatch = useDispatch();

    const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'transfer'>('all');
    const [sortBy, setSortBy] = useState<'timestamp' | 'amount'>('timestamp');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredTransactions = transactions
        .filter(tx => filter === 'all' || tx.type === filter)
        .sort((a, b) => {
            if (sortBy === 'timestamp') {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            } else {
                return b.amount - a.amount;
            }
        });

    const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return '✅';
            case 'pending': return '⏳';
            case 'failed': return '❌';
            default: return '❓';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'deposit': return '📥';
            case 'withdraw': return '📤';
            case 'transfer': return '💸';
            default: return '💰';
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

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-green-400">📊 Transaction History</h3>
                <div className="flex space-x-2">
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as "all" | "deposit" | "withdraw" | "transfer")}
                        className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="deposit">Deposits</option>
                        <option value="withdraw">Withdrawals</option>
                        <option value="transfer">Transfers</option>
                    </select>
                    
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "timestamp" | "amount")}
                        className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
                    >
                        <option value="timestamp">Sort by Time</option>
                        <option value="amount">Sort by Amount</option>
                    </select>
                </div>
            </div>

            {paginatedTransactions.length === 0 || !isWalletConnected ? (
                <div className="text-center py-8">
                    <div className="text-4xl mb-4">📝</div>
                    <div className="text-gray-400">No transactions found</div>
                    <div className="text-sm text-gray-500 mt-2">
                        Start by making your first private transaction
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {paginatedTransactions.map((transaction) => (
                        <div 
                            key={transaction.id}
                            onClick={() => dispatch(showTransactionDetails(transaction))}
                            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-700 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">
                                        {getTypeIcon(transaction.type)}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                            </span>
                                            <span className="text-lg">{getStatusIcon(transaction.status)}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {(transaction.timestamp)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <div className={`text-lg font-semibold ${getTypeColor(transaction.type)}`}>
                                        {transaction.type === 'deposit' ? '+' : '-'}{formatBalance(transaction.amount)}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Gas: {transaction.gasFeeEth.toFixed(6)} ZTC
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Hash:</span>
                                    <span className="font-mono text-gray-300">{formatHash(transaction.hash)}</span>
                                </div>
                                {transaction.recipient && (
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="text-gray-400">To:</span>
                                        <span className="font-mono text-gray-300">
                                            {formatHash(transaction.recipient)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 bg-gray-900 rounded p-2 border border-gray-600">
                                <div className="text-xs text-gray-400 mb-1">Encrypted Amount (ZTC):</div>
                                <div className="font-mono text-xs text-green-400 truncate">
                                    {transaction.encryptedAmount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-black' : 'bg-gray-700 text-white'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {filteredTransactions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">
                                {!isWalletConnected ? 0 : filteredTransactions.length}
                            </div>
                            <div className="text-sm text-gray-400">Total Transactions</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">
                                {!isWalletConnected ? 0 : filteredTransactions.filter(tx => tx.status === 'confirmed').length}
                            </div>
                            <div className="text-sm text-gray-400">Confirmed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">
                                {!isWalletConnected ? 0 : filteredTransactions.reduce((sum, tx) => sum + tx.gasFeeEth, 0).toFixed(6)}
                            </div>
                            <div className="text-sm text-gray-400">Total Gas (ZTC)</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
