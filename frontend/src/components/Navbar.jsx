import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-center bg-[#e1e1e1] navbar-main m-2 rounded-[14px]">
      <div className="navbar-box">
        <NavLink className="navbar-links" exact to="/">
          Home
        </NavLink>
        <NavLink className="navbar-links" to="/login">
          Login
        </NavLink>
        <NavLink className="navbar-links" to="/signup">
          Signup
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
