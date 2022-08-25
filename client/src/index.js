import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/context/ContextProvider";
import ShopProvider from "./components/context/ShopContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ShopProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
