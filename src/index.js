import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { WalletProvider } from "react-binance-wallet";

ReactDOM.render(
    <React.StrictMode>
        <WalletProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </WalletProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
