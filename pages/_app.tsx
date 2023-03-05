import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../public/font/style.css';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
// import {
//   Web3AuthContext,
//   Web3AuthProvider,
//   Web3AuthProviderContext,
// } from '../context/Web3AuthContext';
import { useContext, useEffect, useState } from 'react';
// import { Web3Auth } from '@web3auth/modal';
// import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import dynamic from 'next/dynamic';

declare global {
  interface Window {
    aptos: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
  // const { web3auth, setWeb3auth } = useContext(Web3AuthContext);
  // const { provider, setProvider } = useContext(Web3AuthProviderContext);

  // const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  // const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const web3auth = new Web3Auth({
  //         clientId,
  //         web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
  //         chainConfig: {
  //           chainNamespace: CHAIN_NAMESPACES.EIP155,
  //           chainId: '0x13881',
  //           rpcTarget: 'https://rpc-mumbai.maticvigil.com', // This is the public RPC we have added, please pass on your own endpoint while creating an app
  //         },
  //       });

  //       setWeb3auth(web3auth);

  //       await web3auth.initModal();

  //       if (web3auth.provider) {
  //         setProvider(web3auth.provider);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   init();
  // }, []);

  return (
    // <Web3AuthProvider>
    <Component {...pageProps} />
    // </Web3AuthProvider>
  );
}
