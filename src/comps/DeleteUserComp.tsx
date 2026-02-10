import { useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { LoginContext } from "../context/LoginContext";
import type { User } from "firebase/auth";

const DeleteUserComp = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
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
    if (!user) return;

    const confirmed = window.confirm(
      "Click 'OK' if you want to delete your profile"
    );

    if (!confirmed) return;

    await user.delete();
    await signOut(auth);
    setLoggedIn(false);
    window.location.href = "/login";
  };

  if (!user) {
    return <p>User is not logged in...</p>;
  }

  return (
    <div className="center">
      <button onClick={deleteUser}>Delete profile</button>
    </div>
  );
};

export default DeleteUserComp;
