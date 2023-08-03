import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div style={{ margin: "20px" }}>
      <Link className="navbar-links" to="/">
        Home
      </Link>
      <Link className="navbar-links" to="/login">
        Login
      </Link>
      <Link className="navbar-links" to="/Signup">
        Signup
      </Link>
    </div>
  );
}

export default Navbar;
