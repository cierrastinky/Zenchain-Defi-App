'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FHEVMImplementation } from '@/lib/fhevm/implementation';
import { Transaction, FHEVMContextType } from '@/types/fhevm';
import { calculateGasFee } from '@/utils/fhevm/gasCalculation';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { closeWalletConnectedModal, openWalletConnectedModal } from '@/redux/modalSlice';

const FHEVMContext = createContext<FHEVMContextType | undefined>(undefined);

interface FHEVMProviderProps {
    children: ReactNode;
}

export function FHEVMProvider({ children }: FHEVMProviderProps) {
    const [fhevm, setFhevm] = useState<FHEVMImplementation | null>(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentOperation, setCurrentOperation] = useState('Idle');
    const [currentAmount, setCurrentAmount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeFHEVM = async () => {
            const fhevmInstance = new FHEVMImplementation();
            await fhevmInstance.initialize();
            setFhevm(fhevmInstance);
            
            // Initialize with sample transactions
            initializeSampleTransactions(fhevmInstance);
        };

        initializeFHEVM();
    }, []);

    const initializeSampleTransactions = (fhevmInstance: FHEVMImplementation) => {
        const sampleTransactions: Transaction[] = [
            {
                id: '1',
                timestamp: '2024-01-15 14:30:22',
                type: 'deposit',
                amount: 500.0,
                encryptedAmount: fhevmInstance.encrypt(500.0),
                recipient: null,
                hash: '0x1a2b3c4d5e6f7890',
                status: 'confirmed',
                gasUsed: 152340,
                gasFeeEth: 0.002156
            },
            {
                id: '2',
                timestamp: '2024-01-15 12:15:45',
                type: 'transfer',
                amount: 150.5,
                encryptedAmount: fhevmInstance.encrypt(150.5),
                recipient: '0x742d35Cc6634C0532925a3b8D4C0C0e4C5F8b123',
                hash: '0x4d5e6f7890abcdef',
                status: 'confirmed',
                gasUsed: 205670,
                gasFeeEth: 0.000892
            },
            {
                id: '3',
                timestamp: '2024-01-14 16:45:12',
                type: 'withdraw',
                amount: 200.0,
                encryptedAmount: fhevmInstance.encrypt(200.0),
                recipient: '0x8f3e2a1b9c4d5e6f7890abcdef1234567890abcd',
                hash: '0x7g8h9i0j1k2l3m4n',
                status: 'pending',
                gasUsed: 185420,
                gasFeeEth: 0.001234
            }
        ];
        
        setTransactions(sampleTransactions);
    };

    const connectWallet = async (): Promise<void> => {
        // setIsProcessing(true);
        dispatch(openWalletConnectedModal())
        return new Promise((resolve) => {
            setTimeout(() => {
                setIsWalletConnected(true);
                setWalletAddress('0x742d35Cc6634C0532925a3b8D4C0C0e4C5F8b4');
                // setIsProcessing(false);
                dispatch(closeWalletConnectedModal())
                resolve();
            }, 2000);
        });
    };

    const disconnectWallet = (): void => {
        setIsWalletConnected(false);
        setWalletAddress('');
    };

    const processTransaction = async (operation: string, amount: number, recipient?: string): Promise<void> => {
        if (!fhevm) return;
        setCurrentAmount(amount);
        setIsProcessing(true);
        setCurrentOperation(`Processing ${operation}...`);

        return new Promise((resolve) => {
            setTimeout(() => {
                const gasInfo = calculateGasFee(amount, operation);
                
                if (operation === 'deposit') {
                    fhevm.fhevmAdd(fhevm.encryptedBalance, '', amount);
                } else if (operation === 'withdraw' || operation === 'transfer') {
                    fhevm.fhevmSub(fhevm.encryptedBalance, '', amount);
                }

                const transaction: Transaction = {
                    id: Date.now().toString(),
                    timestamp: new Date().toLocaleString(),
                    type: operation as 'deposit' | 'withdraw' | 'transfer',
                    amount: amount,
                    encryptedAmount: fhevm.encrypt(amount),
                    recipient: recipient || null,
                    hash: '0x' + CryptoJS.lib.WordArray.random(32).toString(),
                    status: 'confirmed',
                    gasUsed: gasInfo.gasUsed,
                    gasFeeEth: gasInfo.gasFeeEth
                };

                addTransaction(transaction);
                setIsProcessing(false);
                setCurrentOperation('Idle');
                resolve();
            }, 3000);
        });
    };

    const addTransaction = (transaction: Transaction): void => {
        setTransactions(prev => [transaction, ...prev]);
    };

    const decryptBalance = async (): Promise<number> => {
        if (!fhevm) return 0;
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const decrypted = fhevm.decrypt32(fhevm.encryptedBalance);
                resolve(fhevm.currentBalance);
            }, 1500);
        });
    };

    const value: FHEVMContextType = {
        fhevm,
        isWalletConnected,
        walletAddress,
        transactions,
        isProcessing,
        currentOperation,
        currentAmount,
        connectWallet,
        disconnectWallet,
        processTransaction,
        addTransaction,
        decryptBalance
    };

    return (
        <FHEVMContext.Provider value={value}>
            {children}
        </FHEVMContext.Provider>
    );
}

export { FHEVMContext };