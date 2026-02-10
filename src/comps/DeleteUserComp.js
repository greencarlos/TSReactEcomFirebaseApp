import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { LoginContext } from "../context/LoginContext";
const DeleteUserComp = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const loginContext = useContext(LoginContext);
    if (!loginContext) {
        throw new Error("LoginContext not provided");
    }
    const [loggedIn, setLoggedIn] = loginContext;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoggedIn(!!user);
        });
        return unsubscribe;
    }, [auth, setLoggedIn]);
    const deleteUser = async () => {
        if (!user)
            return;
        const confirmed = window.confirm("Click 'OK' if you want to delete your profile");
        if (!confirmed)
            return;
        await user.delete();
        await signOut(auth);
        setLoggedIn(false);
        window.location.href = "/login";
    };
    if (!user) {
        return _jsx("p", { children: "User is not logged in..." });
    }
    return (_jsx("div", { className: "center", children: _jsx("button", { onClick: deleteUser, children: "Delete profile" }) }));
};
export default DeleteUserComp;
