import React from 'react';

export default function DemoNotice() {
    return (
        <div className="bg-green-900 border-l-4 border-green-400 text-green-100 py-4 text-center flex items-center justify-center gap-2">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtDPTaAjwKal-PnQLfayU4UcL6QKyyNO82Bg&s" 
                alt="ZenChain Icon" 
                className="w-10 h-10 "
            />
            <p className="font-medium">
                ZenChain Dapp – Building Next-Gen DeFi with Low Fees & High Security
            </p>
        </div>
    );
}
