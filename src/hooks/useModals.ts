'use client';

import { useState } from 'react';
import { Transaction } from '@/types/fhevm';

interface ModalState {
    processing: boolean;
    success: boolean;
    transactionDetails: boolean;
    selectedTransaction: Transaction | null;
    lastTransactionHash?: string;
}

export function useModals() {
    const [modalState, setModalState] = useState<ModalState>({
        processing: false,
        success: false,
        transactionDetails: false,
        selectedTransaction: null,
        lastTransactionHash: undefined
    });

    const showProcessing = () => {
        setModalState(prev => ({ ...prev, processing: true }));
    };

    const hideProcessing = () => {
        setModalState(prev => ({ ...prev, processing: false }));
    };

    const showSuccess = (transactionHash?: string) => {
        setModalState(prev => ({ 
            ...prev, 
            success: true, 
            processing: false,
            lastTransactionHash: transactionHash 
        }));
    };

    const hideSuccess = () => {
        setModalState(prev => ({ 
            ...prev, 
            success: false, 
            lastTransactionHash: undefined 
        }));
    };

    const showTransactionDetails = (transaction: Transaction) => {
        setModalState(prev => ({ 
            ...prev, 
            transactionDetails: true, 
            selectedTransaction: transaction 
        }));
        console.log(modalState)
    };

    const hideTransactionDetails = () => {
        setModalState(prev => ({ 
            ...prev, 
            transactionDetails: false, 
            selectedTransaction: null 
        }));
    };

    return {
        modalState,
        showProcessing,
        hideProcessing,
        showSuccess,
        hideSuccess,
        showTransactionDetails,
        hideTransactionDetails
    };
}