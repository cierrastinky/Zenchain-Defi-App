'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';
import { formatBalance } from '@/utils/fhevm/formatting';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { onDecrypting } from '@/redux/modalSlice';

export default function EncryptedBalance() {
    const { fhevm, isWalletConnected, decryptBalance } = useFHEVM();
    const [isDecrypted, setIsDecrypted] = useState(false);
    const [decryptedValue, setDecryptedValue] = useState<number | null>(null);
    // const [isDecrypting, setIsDecrypting] = useState(false);
    const modalState = useSelector((state: RootState) => state.modals);
    const isDecrypting = modalState.isDecrypting;
    const dispatch = useDispatch();

    React.useEffect(() => {
  const autoDecrypt = async () => {
    if (isWalletConnected && fhevm && isDecrypted) {
      const balance = await decryptBalance();
      setDecryptedValue(balance);
    }
  };
  autoDecrypt();
}, [fhevm?.encryptedBalance, isWalletConnected, isDecrypted]);


    const handleDecrypt = async () => {
        if (!isWalletConnected || !fhevm) return;
        
        // setIsDecrypting(true);
        dispatch(onDecrypting())
        
        try {
            const balance = await decryptBalance();
            setDecryptedValue(balance);
            setIsDecrypted(true);
        } catch (error) {
            console.error('Decryption failed:', error);
        } finally {
            // setIsDecrypting(false);
        dispatch(onDecrypting())

        }
    };

    const handleHide = () => {
        setIsDecrypted(false);
        setDecryptedValue(null);
    };

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-4">💰 Encrypted Balance</h3>
            <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Ciphertext (ZTC):</div>
                    <div className="font-mono text-sm break-all bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                        {'ct_0x1a2b3c4d5e6f7890abcdef1234567890...'}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Decrypted:</span>
                    <span className="text-xl font-bold text-green-400">
                        {isDecrypted && decryptedValue !== null 
                            ? formatBalance(decryptedValue)
                            : '*****.** ZTC'
                        }
                    </span>
                </div>
                <button 
                    onClick={isDecrypted ? handleHide : handleDecrypt}
                    disabled={!isWalletConnected || isDecrypting}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {isDecrypting 
                        ? '🔄 Decrypting...' 
                        : isDecrypted 
                            ? '🔒 Hide Balance' 
                            : '🔓 Decrypt Balance (Client-side)'
                    }
                </button>
            </div>
        </div>
    );
}