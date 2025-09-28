'use client';

import React from 'react';
import { FHEVMProvider } from '@/contexts/FHEVMContext';
import Dashboard from '@/components/fhevm/dashboard/Dashboard';
import ProcessingModal from '@/components/fhevm/modals/ProcessingModal';
import SuccessModal from '@/components/fhevm/modals/SuccessModal';
import TransactionDetailsModal from '@/components/fhevm/modals/TransactionDetailsModal';
import { useModals } from '@/hooks/useModals';
import Head from 'next/head';
import Script from 'next/script';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { hideProcessing, hideSuccess, hideTransactionDetails } from "@/redux/modalSlice";
import WalletConnectedModal from '@/components/fhevm/modals/WalletConnectedModal';


function FHEVMPageContent() {
    const modalState = useSelector((state: RootState) => state.modals);
    const dispatch = useDispatch();
    // const { modalState, hideProcessing, hideSuccess, hideTransactionDetails } = useModals();
    console.log(modalState)
    return (
        <>
            <Dashboard />
            <WalletConnectedModal/>
            <ProcessingModal
                isOpen={modalState.processing}
                onClose={() => dispatch(hideProcessing())}
                operation="Processing encrypted transaction..."
                
            />

            <SuccessModal
                isOpen={modalState.success}
                onClose={() => dispatch(hideSuccess())}
                transactionHash={modalState.lastTransactionHash}
            />

            <TransactionDetailsModal
                isOpen={modalState.transactionDetails}
                onClose={() => dispatch(hideTransactionDetails())}
                transaction={modalState.selectedTransaction}
            />
        </>
    );
}

export default function FHEVMPage() {
    return (
        <FHEVMProvider>
            {/* Load scripts đúng chuẩn */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://unpkg.com/tfhe@0.7.0/tfhe.js"
                strategy="beforeInteractive"
            />

            
                <FHEVMPageContent />
           
        </FHEVMProvider>
    );
}
