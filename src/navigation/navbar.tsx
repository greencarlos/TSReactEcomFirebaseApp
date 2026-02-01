import { NavLink } from "react-router";
import { store } from "../store/CartStore";

function NavBar() {
  const cart = store.getState();

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Cart">
        Cart {cart.length > 0 ? "(" + cart.length + ")" : ""}
      </NavLink>
    </div>
  );
}

export default NavBar;
