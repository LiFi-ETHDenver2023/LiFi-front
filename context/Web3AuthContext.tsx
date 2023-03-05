import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import React, { createContext, useState } from 'react';

export const Web3AuthContext = createContext({});
export const Web3AuthProviderContext = createContext({});

export const Web3AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  return (
    <Web3AuthContext.Provider value={{ web3auth, setWeb3auth }}>
      <Web3AuthProviderContext.Provider value={{ provider, setProvider }}>
        {children}
      </Web3AuthProviderContext.Provider>
    </Web3AuthContext.Provider>
  );
};
