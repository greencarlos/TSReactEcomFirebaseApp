import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import ProductOrderComp from "./ProductOrderComp";
const OrderHistoryComp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                const ordersRef = collection(db, "orders");
                const data = await getDocs(ordersRef);
                const filteredData = data.docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { id: doc.id })));
                console.log("filteredData", filteredData);
                setOrders(filteredData);
            }
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: "center", children: "Order History" }), _jsx("ul", { children: orders &&
                    orders.length > 0 &&
                    orders.map((order) => {
                        return (_jsx("li", { children: _jsx(ProductOrderComp, { order: order }) }, crypto.randomUUID()));
                    }) })] }));
};
export default OrderHistoryComp;
