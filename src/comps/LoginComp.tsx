import { useContext } from "react";
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { LoginContext } from "../context/LoginContext";
import LogoutComp from "./LogoutComp";

const LoginComp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("LoginContext not provided");
  }

  const [loggedIn, setLoggedIn] = loginContext;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setLoggedIn(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="pasword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <br />
        <LogoutComp />
      </form>
    </>
  );
};

export default LoginComp;
