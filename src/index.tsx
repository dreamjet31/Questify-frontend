import React from "react";
import ReactDOM from "react-dom/client";
import { SeiWalletProvider } from "@sei-js/react";
import App from "./App";
import "./index.css";
import "./styles/wallet.css";
import "./styles/global.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";

export const chainId = "pacific-1";
const restUrl = "https://rest.sei-apis.com/";
const rpcUrl = "https://rpc.sei-apis.com/";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SeiWalletProvider
      chainConfiguration={{ chainId, restUrl, rpcUrl }}
      wallets={["compass", "fin", "keplr", "leap"]}
      autoConnect={
        // localStorage.getItem("connectedWallet")
        //   ? localStorage.getItem("connectedWallet") === "leap" ||
        //     localStorage.getItem("connectedWallet") === "compass" ||
        //     localStorage.getItem("connectedWallet") === "keplr" ||
        //     localStorage.getItem("connectedWallet") === "fin"
        //     ? localStorage.getItem("connectedWallet")
        //     : "leap"
        //   : "leap"
        localStorage.getItem("connectedWallet") &&
        localStorage.getItem("connectedWallet") === "leap"
          ? "leap"
          : localStorage.getItem("connectedWallet") &&
            localStorage.getItem("connectedWallet") === "compass"
          ? "compass"
          : localStorage.getItem("connectedWallet") &&
            localStorage.getItem("connectedWallet") === "keplr"
          ? "keplr"
          : localStorage.getItem("connectedWallet") &&
            localStorage.getItem("connectedWallet") === "fin"
          ? "fin"
          : undefined
      }
    >
      <App />
    </SeiWalletProvider>
  </Provider>
);
