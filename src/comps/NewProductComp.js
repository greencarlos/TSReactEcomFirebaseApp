import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
function NewProductComp() {
    const [newProduct, setNewProduct] = useState({});
    const productCollectionRef = collection(db, "products");
    const handleOnChange = (key, val) => {
        const newState = Object.assign({}, newProduct);
        newState[`${key}`] = val;
        setNewProduct(newState);
    };
    const handleSubmit = async () => {
        await addDoc(productCollectionRef, newProduct);
        setNewProduct({}); // this is intentional to clear newProduct 
        window.location.reload();
    };
    return (_jsxs("div", { className: "center", children: [_jsx("h3", { children: "Enter a new Product:" }), _jsx("input", { placeholder: "New Product Title...", type: "string", onChange: (e) => handleOnChange("title", e.target.value) }), _jsx("br", {}), _jsx("input", { placeholder: "New Product Category...", type: "string", onChange: (e) => handleOnChange("category", e.target.value.toLowerCase()) }), _jsx("br", {}), _jsx("input", { placeholder: "New Product Price...", type: "number", onChange: (e) => handleOnChange("price", e.target.value) }), _jsx("br", {}), _jsx("input", { placeholder: "New Product Rating...", type: "number", onChange: (e) => handleOnChange("rating", e.target.value) }), _jsx("br", {}), _jsx("input", { placeholder: "New Product Supply...", type: "number", onChange: (e) => handleOnChange("supply", e.target.value) }), _jsx("br", {}), _jsx("input", { placeholder: "New Product Description...", type: "string", onChange: (e) => handleOnChange("description", e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: () => handleSubmit(), children: "Submit new product" })] }));
}
export default NewProductComp;
