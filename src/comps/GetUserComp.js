import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
const GetUserComp = () => {
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [updatedProfile, setProfile] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await setCurrentUser(user);
            }
        });
    }, []);
    const changeProfile = async () => {
        await updateProfile(auth.currentUser, updatedProfile);
        alert("Profile updated!");
        window.location.reload();
    };
    return (_jsx("div", { className: "center", children: currentUser && (_jsxs("div", { children: [_jsxs("p", { children: [_jsx("b", { children: "Current Email:" }), " ", currentUser.email, _jsx("br", {}), _jsx("input", { placeholder: "Enter a new email", type: "email", onChange: (e) => {
                                setProfile(Object.assign(Object.assign({}, currentUser), { email: e.target.value }));
                            } }), _jsx("br", {}), _jsx("br", {}), _jsx("b", { children: "Current Name:" }), " ", currentUser.displayName, _jsx("br", {}), _jsx("input", { placeholder: "Enter a new name", onChange: (e) => {
                                setProfile(Object.assign(Object.assign({}, currentUser), { displayName: e.target.value }));
                            } }), _jsx("br", {}), _jsx("br", {}), _jsx("b", { children: "Current Number:" }), " ", currentUser.phoneNumber, _jsx("br", {}), _jsx("input", { placeholder: "Enter a new number", type: "number", onChange: (e) => {
                                setProfile(Object.assign(Object.assign({}, currentUser), { phoneNumber: e.target.value }));
                            } })] }), _jsx("button", { onClick: changeProfile, children: "Change Profile" })] })) }));
};
export default GetUserComp;
