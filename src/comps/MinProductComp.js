import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function MinProductComp({ product, count }) {
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: product.title + " (" + count + ")" }), _jsx("img", { src: product.image || "../assets/images-not-found.webp", alt: product.title }), _jsxs("p", { className: "price", children: [Math.round(product.price) + ".95 ", _jsx("s", { children: Math.round(product.price * 1.3) + ".95" }), " "] })] }));
}
export default MinProductComp;
