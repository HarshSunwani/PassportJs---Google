import React, { useContext } from "react";
import { userContext } from "../../Context";
import { IUser } from "../../types/userType";
import "./Homepage.css";

export default function Homepage() {
  const user = useContext(userContext) as IUser;
  return (
    <div className="container">
      {user ? (
        <div className="profile">
          <img src={user.profilePic} alt="Profile Pic" id="profile-pic" />
          <h1>{`Hi, ${user.username.firstName} ${user.username.lastName}!`}</h1>
          <h1>Welcome to the Homepage 😍</h1>
        </div>
      ) : (
        <h1>Homepage</h1>
      )}
    </div>
  );
}
