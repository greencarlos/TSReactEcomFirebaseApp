import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from './store/CartStore';
import App from "./App.tsx";
import "./index.css";
createRoot(document.getElementById("root")).render(_jsx(BrowserRouter, { children: _jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }) }));
