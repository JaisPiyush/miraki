import { createContext, useState } from "react";

interface WalletConnectionData {
    isConnected: boolean;
    address?: string;
    provider?: any;
    setIsConnected: (value: boolean) => void;
    setAddress: (value: string) => void;
    setProvider: (provider: any) => void;
    
}


export const WalletConnectorContext = createContext<WalletConnectionData>({
    isConnected: false,
    setIsConnected: (v) => {},
    setAddress(value) {
        
    },
    setProvider(provider) {
        
    },
});
