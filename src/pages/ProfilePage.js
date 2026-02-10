import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NavBar from "../navigation/navbar";
import GetUserComp from '../comps/GetUserComp';
import DeleteUserComp from '../comps/DeleteUserComp';
import OrderHistoryComp from '../comps/OrderHistoryComp';
const ProfilePage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx("h2", { className: "center", children: "Profile Page" }), _jsx(DeleteUserComp, {}), _jsx(GetUserComp, {}), _jsx(OrderHistoryComp, {})] }));
};
export default ProfilePage;
