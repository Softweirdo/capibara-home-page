import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';


import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {  Chain } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';

const zkSynckChain: Chain = {
  id: 369,
  name: 'pulseChain',
  network: 'pulseChain',
  // iconUrl: 'https://example.com/icon.svg',
  // iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Pulse',
    symbol: 'PULSE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.pulsechain.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zksync.io/' },
    etherscan: { name: 'Explorer', url: 'https://explorer.zksync.io/' },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [zkSynckChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
