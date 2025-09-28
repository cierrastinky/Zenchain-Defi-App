# ZENCHAIN PRIVATE DEFI

Zenchain Private DeFi is a Next.js decentralized application (dApp) that demonstrates how to perform confidential financial operations on blockchain with the ZTC (Zenchain Trusted Computation). 

In traditional DeFi systems, transaction data such as amounts, recipients, and balances are visible on-chain to everyone, which compromises user privacy. This project solves that problem by leveraging ZTC-powered smart contracts to encrypt and process all sensitive values, ensuring that:

- **Transaction amounts remain confidential** (only the user can decrypt their own balance).  
- **Recipients and senders are protected**, while still allowing transfers and verifications.  
- **DeFi primitives (deposit, withdraw, transfer)** work just like in regular DeFi apps, but entirely on encrypted data.  

The dApp provides a user-friendly interface with progress indicators, transaction history, and search/filtering tools — making it easy to interact with private assets while maintaining full transparency in system behavior and blockchain proofs.

This project is part of the exploration into privacy-preserving DeFi, showing how next-generation cryptographic tools like ZTC can enable: 
- **Private stablecoins**  
- **Confidential trading**  
- **Anonymous lending/borrowing**  
- **Private cross-chain bridges**  

---

## 🚀 Features

- **Private Transactions**: Deposit, withdraw, or transfer tokens with encrypted amounts.  
- **ZTC Integration: All on-chain operations are handled by Zenchain’s Trusted Computation. 
- **Transaction History**: Paginated history (5 per page) with detailed breakdown of hash, type, recipient, and encrypted values.  
- **Search & Filtering**: Find transactions by hash, recipient, type, or amount.  
- **Interactive Workflow**: Step-based progress animations to follow transaction lifecycle in real time.  
- **Secure Balance Decryption**: Balances can be decrypted locally on the client only when requested.  
- **Global Modal System**: Built with Redux, provides unified success/error/transaction detail modals.  

## ⚡ Installation & Running

   ```bash
   git clone https://github.com/cierrastinky/Zenchain-Defi-App.git
   ```

1. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
3. Open http://localhost:3000 in your browser.

## 🔮 Future Improvements
- Enhanced UI/UX for modals and animations.
- Multi-network / Testnet support for Web3 environments.
- Wallet integration (MetaMask / WalletConnect).
- Testing and validation of FHEVM logic for maximum security.

## 📜 License
This project is for educational and research purposes around privacy-preserving DeFi using ZTC.
