import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoginContext } from "./context/LoginContext";
import UserContext from "./context/UserContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
const queryClient = new QueryClient();
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(LoginContext, { value: [loggedIn, setLoggedIn], children: _jsxs(UserContext, { value: [user, setUser], children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/purchase", element: _jsx(PurchasePage, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) })] }), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }) }));
}
export default App;
