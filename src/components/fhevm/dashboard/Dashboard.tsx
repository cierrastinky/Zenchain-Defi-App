'use client';

import React from 'react';
import DemoNotice from '../layout/DemoNotice';
import Navbar from '../layout/Navbar';
import WalletStatus from '../layout/WalletStatus';
import EncryptedBalance from './EncryptedBalance';
import FHEOperations from './FHEOperations';
import PrivacyMetrics from './PrivacyMetrics';
import GasOptimization from './GasOptimization';
import TransactionForm from '../transaction/TransactionForm';
import ProcessingView from '../transaction/ProcessingView';
import TransactionHistory from '../transaction/TransactionHistory';
import TechnicalDetails from '../technical/TechnicalDetails';

export default function Dashboard() {
    return (
        <div className="bg-black min-h-screen text-white">
            <DemoNotice />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <WalletStatus />

                {/* FHEVM Status Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <EncryptedBalance />
                    <FHEOperations />
                    <PrivacyMetrics />
                    <GasOptimization />
                </div>

                {/* Transaction Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <TransactionForm />
                    <ProcessingView />
                </div>

                <TransactionHistory />
                <TechnicalDetails />
            </div>
        </div>
    );
}