import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { userContext } from "../../Context";

const NavBar = () => {
  const context = useContext(userContext);
  const logout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data === "done") {
          window.location.href = "http://localhost:3000/";
        }
      });
  };

  return (
    <div className="navBarWrapper">
      <ul className="navBar">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {context ? (
          <li>
            <NavLink to="/logout" onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
