import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import RegisterComp from "../comps/RegisterComp";
import LoginComp from "../comps/LoginComp";
import { LoginContext } from "../context/LoginContext";
import UserContext from "../context/UserContext";
import LogoutComp from "../comps/LogoutComp";
import { Link } from "react-router";
const LoginPage = () => {
    const [user, setUser] = useContext(UserContext);
    const loginContext = useContext(LoginContext);
    if (!loginContext) {
        throw new Error("LoginContext not provided");
    }
    const [loggedIn, setLoggedIn] = loginContext;
    if (loggedIn) {
        window.location.href = "/login";
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setTimeout(() => {
                window.location.href = "/";
            }, 5000);
        });
        return () => unsubscribe();
    }, []);
    return (_jsx("div", { children: user ? (_jsxs("div", { className: "center", children: [_jsxs("h2", { children: ["Welcome, ", user.email] }), _jsx(Link, { to: "/", children: _jsx("button", { children: "Click here to get redirected to the Home Page" }) }), _jsx(LogoutComp, {})] })) : (_jsxs("div", { className: "center", children: [_jsx(RegisterComp, {}), _jsx(LoginComp, {})] })) }));
};
export default LoginPage;
