import { FHEVMImplementation } from "@/lib/fhevm";

export interface Transaction {
    id: string;
    timestamp: string;
    type: 'deposit' | 'withdraw' | 'transfer';
    amount: number;
    encryptedAmount: string;
    recipient?: string | null;
    hash: string;
    status: 'confirmed' | 'pending' | 'failed';
    gasUsed: number;
    gasFeeEth: number;
}

export interface GasInfo {
    gasUsed: number;
    gasFeeEth: number;
    feePercentage: string;
}

export interface FHEVMContextType {
    fhevm: FHEVMImplementation | null;
    isWalletConnected: boolean;
    walletAddress: string;
    transactions: Transaction[];
    isProcessing: boolean;
    currentOperation: string;
    currentAmount: number;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    processTransaction: (operation: string, amount: number, recipient?: string) => Promise<void>;
    addTransaction: (transaction: Transaction) => void;
    decryptBalance: () => Promise<number>;
}

export interface ModalState {
    processing: boolean;
    success: boolean;
    transactionDetails: boolean;
    selectedTransaction: Transaction | null;
}

export interface ProcessingStep {
    message: string;
    progress: number;
    step: number;
}

export interface FHEVMStats {
    encryptionCount: number;
    decryptionCount: number;
    homomorphicOps: number;
    currentBalance: number;
    encryptedBalance: string;
}