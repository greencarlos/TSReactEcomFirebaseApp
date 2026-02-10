import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import RegisterComp from "../comps/RegisterComp";
import LoginComp from "../comps/LoginComp";
import { LoginContext } from "../context/LoginContext";
import UserContext from "../context/UserContext";
import LogoutComp from "../comps/LogoutComp";

const LoginPage = () => {
  const [user, setUser] = useContext<User | null>(UserContext);
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
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div className="center">
          <h2>Welcome, {user.email}</h2>
          <p>Redirecting you to the home page in 5 seconds...</p>
          {setTimeout(() => {
            window.location.href = "/";
          }, 5000)}
          <LogoutComp />
        </div>
      ) : (
        <div className="center">
          <RegisterComp />
          <LoginComp />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
