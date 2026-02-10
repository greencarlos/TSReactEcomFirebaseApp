import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { LoginContext } from "../context/LoginContext";
import LogoutComp from "./LogoutComp";
const LoginComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const loginContext = useContext(LoginContext);
    if (!loginContext) {
        throw new Error("LoginContext not provided");
    }
    const [loggedIn, setLoggedIn] = loginContext;
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            setLoggedIn(true);
        }
        catch (err) {
            setError(err.message);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: handleLogin, children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "pasword", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "submit", children: "Login" }), error && _jsx("p", { children: error }), _jsx("br", {}), _jsx(LogoutComp, {})] }) }));
};
export default LoginComp;
