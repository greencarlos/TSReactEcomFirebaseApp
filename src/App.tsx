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

  return (
    <QueryClientProvider client={queryClient}>
      <LoginContext value={[loggedIn, setLoggedIn]}>
        <UserContext value={[user, setUser]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </UserContext>
      </LoginContext>
    </QueryClientProvider>
  );
}

export default App;
