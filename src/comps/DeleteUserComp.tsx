import { useState, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import LoginContext from "../context/LoginContext";
import type { User } from "firebase/auth";

const DeleteUserComp = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useContext<boolean>(LoginContext);

  onAuthStateChanged(auth, (user: User) => {
    if (user) {
      setUser(user);
      console.log("user", user);
    } else {
      return <p>User is not logged in...</p>;
    }
  });

  const deleteUser = async () => {
    const input = window.confirm(
      `Click "Ok" if you want to delete your profile`
    );
    if (input) {
      await signOut(auth);
      setLoggedIn(false);
      await user.delete();
      alert("You've been logged out and your account has been deleted");
      window.location.href = "/login";
    }
  };

  return (
    <div className="center">
      <button onClick={deleteUser}>Delete profile</button>
    </div>
  );
};

export default DeleteUserComp;
