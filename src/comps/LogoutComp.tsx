import { useContext } from "react";
import { auth } from "../../firebaseConfig";
import {signOut} from 'firebase/auth'
import LoginContext from "../context/LoginContext";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext<boolean>(LoginContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      setLoggedIn(false)
      window.location.href = "/login"
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
