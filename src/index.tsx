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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SeiWalletProvider
      chainConfiguration={{
        chainId: "pacific-1",
        restUrl: "https://rest.sei-apis.com/",
        rpcUrl: "https://rpc.sei-apis.com/",
      }}
    >
      <App />
    </SeiWalletProvider>
  </Provider>
);
