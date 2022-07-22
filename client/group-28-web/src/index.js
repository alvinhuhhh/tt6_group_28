import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Transaction from "./pages/Transaction/Transaction";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" />
        <Route path="/:wallet_id/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
