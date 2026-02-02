import { useContext } from "react";
import { NavLink } from "react-router";
import { store } from "../store/CartStore";
import type { User } from "firebase/auth";
import Logout from "../comps/LogoutComp";
import UserContext from "../context/UserContext";
import LoginContext from "../context/LoginContext";

function NavBar() {
  const cart = store.getState();
  const [loggedIn, setLoggedIn] = useContext<boolean>(LoginContext);

  console.log("isLoggedIn", loggedIn);

  if (loggedIn) {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Cart">
          Cart {cart.length > 0 ? "(" + cart.length + ")" : ""}
        </NavLink>
        <NavLink to="/profile">
          Profile
        </NavLink>
        <Logout />
      </div>
    </>
  );
}

export default NavBar;
