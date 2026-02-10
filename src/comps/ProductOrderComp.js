import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
function ProductOrderComp({ order }) {
    const { date, cart } = order;
    const newDate = new Date(date);
    const totalPrice = cart.reduce((a, c) => {
        a += +c.price;
        return a;
    }, 0);
    const cartHash = cart.reduce((a, c) => {
        a[c.title] = (a[c.title] || 0) + 1;
        return a;
    }, {});
    const entries = Object.entries(cartHash);
    console.log("entries", entries, totalPrice);
    return (_jsxs("div", { className: "center", children: [_jsxs("p", { children: ["You ordered on", " ", `
          Month: ${newDate.getMonth()}, 
          Day: ${newDate.getDay()} 
        ${newDate.getFullYear()}`, " ", "with a Total price of: ", _jsxs("b", { children: ["$", totalPrice] })] }), entries &&
                entries.length > 0 &&
                entries.map((entry) => (_jsx(_Fragment, { children: _jsxs("p", { children: [entry[1], " X ", entry[0]] }, crypto.randomUUID()) })))] }));
}
export default ProductOrderComp;
