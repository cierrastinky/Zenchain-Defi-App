import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  processing: boolean;
  success: boolean;
  transactionDetails: boolean;
  selectedTransaction: any | null;
  lastTransactionHash?: string;
  isDecrypting: boolean;
  isWalletConnectedModalOpen: boolean;
}

const initialState: ModalState = {
  processing: false,
  success: false,
  transactionDetails: false,
  selectedTransaction: null,
  lastTransactionHash: undefined,
  isDecrypting: false,
  isWalletConnectedModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openWalletConnectedModal: (state) => {
            state.isWalletConnectedModalOpen = true;
        },
        closeWalletConnectedModal: (state) => {
            state.isWalletConnectedModalOpen = false;
        },
    onDecrypting: (state) => {
      state.isDecrypting = !state.isDecrypting;
    },
    showProcessing: (state) => {
      state.processing = true;
    },
    hideProcessing: (state) => {
      state.processing = false;
    },
    showSuccess: (state, action: PayloadAction<string | undefined>) => {
      state.success = true;
      state.processing = false;
      state.lastTransactionHash = action.payload;
      console.log(action.payload)
    },
    hideSuccess: (state) => {
      state.success = false;
      state.lastTransactionHash = undefined;
    },
    showTransactionDetails: (state, action: PayloadAction<any>) => {
      state.transactionDetails = true;
      state.selectedTransaction = action.payload;
      console.log(action.payload)
    },
    hideTransactionDetails: (state) => {
      state.transactionDetails = false;
      state.selectedTransaction = null;
    },
  },
});

export const {
    onDecrypting,
  showProcessing,
  hideProcessing,
  showSuccess,
  hideSuccess,
  showTransactionDetails,
  hideTransactionDetails,
  openWalletConnectedModal, 
  closeWalletConnectedModal
} = modalSlice.actions;

export default modalSlice.reducer;
