import { GasInfo } from '@/types/fhevm';

export function calculateGasFee(amount: number, operation: string): GasInfo {
    const currentGasPrice = 25; // Default gas price in gwei
    
    const baseGas: Record<string, number> = {
        'deposit': 150000,
        'withdraw': 180000,
        'transfer': 200000
    };
    
    const amountBasedGas = Math.floor(amount * 1000);
    const gasUsed = baseGas[operation] + amountBasedGas + Math.floor(Math.random() * 15000);
    
    const feePercentage = 0.0001 + (Math.random() * 0.0004);
    const baseFeeEth = amount * feePercentage;
    const gasPriceEth = (gasUsed * currentGasPrice * 1e-9);
    const totalFeeEth = Math.min(baseFeeEth + gasPriceEth, amount * 0.02);
    
    return {
        gasUsed: gasUsed,
        gasFeeEth: totalFeeEth,
        feePercentage: (totalFeeEth / amount * 100).toFixed(4)
    };
}

export function formatGasPrice(gwei: number): string {
    return `${gwei} gwei`;
}

export function formatGasFee(eth: number): string {
    return `${eth.toFixed(6)} ETH`;
}