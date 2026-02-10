import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { store, clearCart } from "../store/CartStore";
import { hashTable } from "../funcs/hashTable";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "../navigation/navbar";
import PriceComp from "../comps/PriceComp";
import MinProductComp from "../comps/MinProductComp";
function CheckoutPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();
    const cart = store.getState();
    const entries = Object.entries(hashTable(cart));
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const orderRef = collection(db, "orders");
                await addDoc(orderRef, { date: new Date().getTime(), uid: user.uid, cart: [...cart] });
            }
        });
    }, []);
    const handleClick = async () => {
        store.dispatch(clearCart());
        alert("Thank you for your purchase!");
    };
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx("h1", { className: "center", children: "Purchase Page" }), _jsx(PriceComp, {}), cart &&
                entries.map((item, idx) => {
                    const [count, product, price] = item[1];
                    return (_jsx("div", { children: _jsx(MinProductComp, { product: product, count: count }) }, product.id));
                }), cart.length > 0 && (_jsx(Link, { to: "/", onClick: () => handleClick(), children: _jsx("button", { className: "checkout", children: "Purchase Now" }) }))] }));
}
export default CheckoutPage;
