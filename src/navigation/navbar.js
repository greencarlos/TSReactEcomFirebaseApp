import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { NavLink } from "react-router";
import { store } from "../store/CartStore";
import Logout from "../comps/LogoutComp";
import { LoginContext } from "../context/LoginContext";
function NavBar() {
    const cart = store.getState();
    const loginContext = useContext(LoginContext);
    if (!loginContext) {
        throw new Error("LoginContext not provided");
    }
    const [loggedIn, setLoggedIn] = loginContext;
    if (loggedIn) {
        window.location.href = "/login";
    }
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "navbar", children: [_jsx(NavLink, { to: "/", children: "Home" }), _jsxs(NavLink, { to: "/Cart", children: ["Cart ", cart.length > 0 ? "(" + cart.length + ")" : ""] }), _jsx(NavLink, { to: "/profile", children: "Profile" }), _jsx(Logout, {})] }) }));
}
export default NavBar;
