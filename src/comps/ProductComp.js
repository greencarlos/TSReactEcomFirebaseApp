import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Rating } from "@mui/material";
import { NavLink } from "react-router";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { store, addToCart } from "../store/CartStore";
import { db } from "../../firebaseConfig";
function ProductComp({ product }) {
    var _a, _b;
    const [productKey, setKey] = useState("");
    const [productVal, setVal] = useState("");
    const handleDelete = async () => {
        const productDoc = doc(db, "products", product.id);
        await deleteDoc(productDoc);
        window.location.reload();
    };
    const handleUpdate = async () => {
        const updatedVal = {};
        const productDoc = doc(db, "products", product.id);
        updatedVal[`${productKey}`] = productVal;
        await updateDoc(productDoc, updatedVal);
        setKey("");
        setVal("");
        window.location.reload();
    };
    const add = (p) => {
        store.dispatch(addToCart(p));
    };
    return (_jsx("div", { className: "center", children: _jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Title:" }), " ", product.title] }), _jsx("button", { onClick: () => handleDelete(), children: "Delete product" }), _jsxs("p", { className: "price", children: [_jsx("strong", { children: "Price:" }), " ", Math.round(product.price) + ".95", " ", _jsx("s", { children: Math.round(product.price * 1.3) + ".95" })] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", product.category] }), _jsxs(NavLink, { to: `/product/${product.id}`, children: ["Product Details", _jsx("br", {}), _jsx("img", { src: product.image || "../assets/images-not-found.webp", alt: product.title })] }), _jsx("br", {}), _jsx(Rating, { name: "product-rating", defaultValue: (_a = product.rating) === null || _a === void 0 ? void 0 : _a.rate, precision: 0.1 }), _jsx("br", {}), _jsxs("p", { children: [_jsx("strong", { children: "Supply:" }), " ", (_b = product.rating) === null || _b === void 0 ? void 0 : _b.count] }), _jsx("button", { onClick: () => add(product), children: "Add to Cart" }), _jsx("br", {}), _jsx("select", { onClick: (e) => setKey(e.target.value), children: Object.keys(product).map((key) => (_jsx("option", { children: key }, crypto.randomUUID()))) }), _jsx("input", { placeholder: "Update this value", onChange: (e) => setVal(e.target.value) }), _jsx("button", { onClick: () => handleUpdate(), children: "Update" }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", product.description] })] }, product.id) }));
}
export default ProductComp;
