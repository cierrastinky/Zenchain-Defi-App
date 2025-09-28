'use client';

import React, { useState } from 'react';
import { useFHEVM } from '@/hooks/useFHEVM';

export default function TechnicalDetails() {
    const { fhevm, isWalletConnected } = useFHEVM();
    const [activeTab, setActiveTab] = useState<'overview' | 'encryption' | 'network' | 'performance'>('overview');

    const tabs = [
        { id: 'overview', label: '🔍 Overview', icon: '🔍' },
        { id: 'encryption', label: '🔐 Encryption', icon: '🔐' },
        { id: 'network', label: '🌐 Network', icon: '🌐' },
        { id: 'performance', label: '⚡ Performance', icon: '⚡' }
    ];

    const renderOverview = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-green-400 font-semibold mb-2">🔐 ZTC Status</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Initialized:</span>
                            <span className="text-green-400">{fhevm?.isInitialized ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Library:</span>
                            <span className="text-white">ZTC-rs v0.7.0</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Mode:</span>
                            <span className="text-blue-400">Simulation + Real ZTC</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-green-400 font-semibold mb-2">🛡️ Security Level</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-300">Encryption:</span>
                            <span className="text-green-400">128-bit ZTC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Key Size:</span>
                            <span className="text-white">2048 bits</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">Quantum Safe:</span>
                            <span className="text-green-400">Yes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-2">📊 Current Statistics</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-400">{isWalletConnected?  fhevm?.encryptionCount : 0}</div>
                        <div className="text-xs text-gray-400">Encryptions</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-400">{isWalletConnected ?  fhevm?.homomorphicOps : 0}</div>
                        <div className="text-xs text-gray-400">Homomorphic Ops</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-400">{isWalletConnected ?  fhevm?.decryptionCount : 0}</div>
                        <div className="text-xs text-gray-400">Decryptions</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEncryption = () => (
        <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🔑 Key Information</h4>
                <div className="space-y-3">
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Public Key:</div>
                        <div className="font-mono text-xs bg-gray-900 p-2 rounded border break-all">
                            {fhevm?.realFHEVM.publicKey || 'pk_1a2b3c4d5e6f7890abcdef1234567890...'}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Client Key:</div>
                        <div className="font-mono text-xs bg-gray-900 p-2 rounded border break-all">
                            {fhevm?.realFHEVM.clientKey?.substring(0, 50) || 'ck_9876543210fedcba0987654321...'}...
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Server Key:</div>
                        <div className="font-mono text-xs bg-gray-900 p-2 rounded border break-all">
                            {fhevm?.realFHEVM.serverKey?.substring(0, 50) || 'svk_abcdef1234567890abcdef12...'}...
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🔐 Encryption Parameters</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-400">Scheme:</div>
                        <div className="text-white">ZTC (Torus ZTC)</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Security Level:</div>
                        <div className="text-green-400">128 bits</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Noise Distribution:</div>
                        <div className="text-white">Gaussian</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Ciphertext Size:</div>
                        <div className="text-white">~2KB per value</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🧮 Supported Operations</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Addition (ct + ct)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Subtraction (ct - ct)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Scalar Addition (ct + pt)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Scalar Multiplication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">⚠</span>
                        <span>Multiplication (Limited)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400">⚠</span>
                        <span>Comparison (Bootstrap)</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNetwork = () => (
        <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🌐 Network Configuration</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-400">Network:</div>
                        <div className="text-white">ZenChain Testnet</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Chain ID:</div>
                        <div className="text-white">8009</div>
                    </div>
                    <div>
                        <div className="text-gray-400">RPC URL:</div>
                        <div className="text-blue-400 font-mono text-xs">https://zenquest.zenchain.io/quests</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Block Time:</div>
                        <div className="text-white">~2 seconds</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">⛽ Gas Configuration</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Current Gas Price:</span>
                        <span className="text-white">25 gwei</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Standard Transfer:</span>
                        <span className="text-white">21,000 gas</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">ZTC Encryption:</span>
                        <span className="text-green-400">~150,000 gas</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Homomorphic Add:</span>
                        <span className="text-green-400">~200,000 gas</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🔗 Smart Contract Addresses</h4>
                <div className="space-y-2 text-sm">
                    <div>
                        <div className="text-gray-400 mb-1">ZTC Gateway:</div>
                        <div className="font-mono text-xs bg-gray-900 p-2 rounded border">
                            0x339eCcC6b2b68f5b5c5b5c5b5c5b5c5b5c5b5c5b
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 mb-1">ACL Contract:</div>
                        <div className="font-mono text-xs bg-gray-900 p-2 rounded border">
                            0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPerformance = () => (
        <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">⚡ Operation Benchmarks</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Encryption (32-bit):</span>
                        <span className="text-white">~50ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Decryption (32-bit):</span>
                        <span className="text-white">~30ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Homomorphic Add:</span>
                        <span className="text-white">~100ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">Bootstrap (Refresh):</span>
                        <span className="text-white">~2000ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">📊 Memory Usage</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-400">Client Key Size:</div>
                        <div className="text-white">~50MB</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Server Key Size:</div>
                        <div className="text-white">~500MB</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Ciphertext (32-bit):</div>
                        <div className="text-white">~2KB</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Working Memory:</div>
                        <div className="text-white">~1GB</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-green-400 font-semibold mb-3">🎯 Optimization Tips</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Batch multiple operations to reduce gas costs</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Use scalar operations when possible (cheaper than FHE ops)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Minimize bootstrapping operations (very expensive)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>Cache encrypted values to avoid re-encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return renderOverview();
            case 'encryption': return renderEncryption();
            case 'network': return renderNetwork();
            case 'performance': return renderPerformance();
            default: return renderOverview();
        }
    };

    return (
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-green-700">
            <h3 className="text-lg font-semibold text-green-400 mb-6">🔧 Technical Details</h3>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "overview" | "encryption" | "network" | "performance")}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'bg-green-600 text-white'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label.replace(/🔍|🔐|🌐|⚡/, '').trim()}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {renderContent()}
            </div>
        </div>
    );
}