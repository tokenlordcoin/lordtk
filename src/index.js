import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit";  

import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { sepolia } from "wagmi/chains";

 
const infuraId = process.env.REACT_APP_INFURA_PROJECT_ID;
const alchemyKEY = process.env.REACT_APP_ALCHEMY_KEY;

const { publicClient, chains } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: infuraId }), publicProvider()],
  [alchemyProvider({ apiKey: alchemyKEY }), publicProvider()],
  { pollingInterval: 10_000, targetQuorum: 2 }
);
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.REACT_APP_ALCHEMY_KEY, // or infuraId
    walletConnectProjectId: process.env.REACT_APP_WCV2,
    chains,
    // Required
    appName: "Staking-Elixir", // Your app name
    // Optional
    appDescription: "Staking DApp - Created by Web3Market.site",
    appUrl: "https://staking-elixir.web3market.site/", // your app's url
    publicClient,
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="nouns">
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
