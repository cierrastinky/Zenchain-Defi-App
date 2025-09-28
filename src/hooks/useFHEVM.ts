import { useContext } from 'react';
import { FHEVMContext } from '@/contexts/FHEVMContext';

export function useFHEVM() {
    const context = useContext(FHEVMContext);
    if (context === undefined) {
        throw new Error('useFHEVM must be used within a FHEVMProvider');
    }
    return context;
}