'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeWalletConnectedModal } from '@/redux/modalSlice';

export default function WalletConnectedModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modals.isWalletConnectedModalOpen);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                dispatch(closeWalletConnectedModal());
            }, 4000); // tự đóng sau 4s
            return () => clearTimeout(timer);
        }
    }, [isOpen, dispatch]);

    if (!isOpen) {
        console.log("Khong goi modal")
        return null
    };
    console.log(isOpen)
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700 w-96 text-center">
                <div className="text-green-400 text-3xl mb-2">🎉</div>
                <div className="text-lg text-white font-semibold mb-2">Wallet Connected! ✅</div>
                <div className="text-gray-300 text-sm mb-4">
                    Your wallet is successfully connected. You can now perform private transactions.
                </div>
                <button
                    onClick={() => dispatch(closeWalletConnectedModal())}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
