'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { Transaction } from "@/types/fhevm";

interface ModalState {
  processing: boolean;
  success: boolean;
  transactionDetails: boolean;
  selectedTransaction: Transaction | null;
  lastTransactionHash?: string;
}

interface ModalContextProps {
  modalState: ModalState;
  showProcessing: () => void;
  hideProcessing: () => void;
  showSuccess: (transactionHash?: string) => void;
  hideSuccess: () => void;
  showTransactionDetails: (transaction: Transaction) => void;
  hideTransactionDetails: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    processing: false,
    success: false,
    transactionDetails: false,
    selectedTransaction: null,
    lastTransactionHash: undefined,
  });

  const showProcessing = () => setModalState(p => ({ ...p, processing: true }));
  const hideProcessing = () => setModalState(p => ({ ...p, processing: false }));

  const showSuccess = (transactionHash?: string) => setModalState(p => ({
    ...p,
    success: true,
    processing: false,
    lastTransactionHash: transactionHash,
  }));

  const hideSuccess = () => setModalState(p => ({
    ...p,
    success: false,
    lastTransactionHash: undefined,
  }));

  const showTransactionDetails = (transaction: Transaction) => setModalState(p => ({
    ...p,
    transactionDetails: true,
    selectedTransaction: transaction,
  }));

  const hideTransactionDetails = () => setModalState(p => ({
    ...p,
    transactionDetails: false,
    selectedTransaction: null,
  }));

  return (
    <ModalContext.Provider value={{
      modalState,
      showProcessing,
      hideProcessing,
      showSuccess,
      hideSuccess,
      showTransactionDetails,
      hideTransactionDetails
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}
