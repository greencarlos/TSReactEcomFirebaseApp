import { useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";

const GetUserComp = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [updatedProfile, setProfile] = useState<User | null>(null);

  onAuthStateChanged(auth, (user: User) => {
    if (user) {
      console.log('email', user.email, 'number', user.phoneNumber)
      setUser(user);
    } else {
      return <p>User is not logged in...</p>;
    }
  });

  const changeProfile = async () => {
    console.log("updatedProfile", updatedProfile);
    await updateProfile(auth.currentUser, updatedProfile);
    //alert("Profile updated!")
    //window.location.reload();
  };

  return (
    <div className="center">
      {user && (
        <div>
          <p>
            <b>Current Email:</b> {user.email}
            <br />
            <input
              placeholder="Enter a new email"
              type="email"
              onChange={(e) => {
                setProfile({ ...user, email: e.target.value });
              }}
            />
            <br />
            <br />
            <b>Current Name:</b> {user.displayName}
            <br />
            <input
              placeholder="Enter a new name"
              onChange={(e) => {
                setProfile({ ...user, displayName: e.target.value });
              }}
            />
            <br />
            <br />
            <b>Current Number:</b> {user.phoneNumber}
            <br />
            <input
              placeholder="Enter a new number"
              type="number"
              onChange={(e) => {
                setProfile({ ...user, phoneNumber: e.target.value });
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
