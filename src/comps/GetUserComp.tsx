import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";

const GetUserComp = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [updatedProfile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user: User) => {
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

  return (
    <div className="center">
      {currentUser && (
        <div>
          <p>
            <b>Current Email:</b> {currentUser.email}
            <br />
            <input
              placeholder="Enter a new email"
              type="email"
              onChange={(e) => {
                setProfile({ ...currentUser, email: e.target.value });
              }}
            />
            <br />
            <br />
            <b>Current Name:</b> {currentUser.displayName}
            <br />
            <input
              placeholder="Enter a new name"
              onChange={(e) => {
                setProfile({ ...currentUser, displayName: e.target.value });
              }}
            />
            <br />
            <br />
            <b>Current Number:</b> {currentUser.phoneNumber}
            <br />
            <input
              placeholder="Enter a new number"
              type="number"
              onChange={(e) => {
                setProfile({ ...currentUser, phoneNumber: e.target.value });
              }}
            />
          </p>
          <button onClick={changeProfile}>Change Profile</button>
        </div>
      )}
    </div>
  );
};

export default GetUserComp;
