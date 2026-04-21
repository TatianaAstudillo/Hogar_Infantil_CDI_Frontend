import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../styles/globals.css";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider } from "../providers/AuthProvider";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root no encontrado");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
