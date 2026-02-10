import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import NavBar from "../navigation/navbar";
import { store, removeItem } from "../store/CartStore";
import { Link } from "react-router";
import { hashTable } from "../funcs/hashTable";
import MinProductComp from '../comps/MinProductComp';
function CartPage() {
    const cart = store.getState();
    const entries = Object.entries(hashTable(cart));
    const remove = (p) => {
        store.dispatch(removeItem(p));
    };
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx("h1", { className: "header", children: "Cart Page" }), _jsxs("h3", { className: "center", children: ["Total Cart price $", cart.length > 0
                        ? Math.round(entries.reduce((acc, item, idx) => {
                            const [count, product, price] = item[1];
                            acc += count * price;
                            return acc;
                        }, 0))
                        : 0] }), cart &&
                entries.map((item, idx) => {
                    const [count, product, price] = item[1];
                    return (_jsxs("div", { children: [_jsx(MinProductComp, { product: product, count: count }), _jsx("button", { onClick: () => remove(product.id), children: "Delete from Cart" })] }, product.id));
                }), _jsx(Link, { to: "/purchase", children: cart.length > 0 ? (_jsx("button", { className: "checkout", children: "Checkout Products" })) : (_jsx(_Fragment, {})) })] }));
}
export default CartPage;
