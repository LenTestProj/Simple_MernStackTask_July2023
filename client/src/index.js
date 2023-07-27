import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/context";
import { ToastContainer } from "react-toastify";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
