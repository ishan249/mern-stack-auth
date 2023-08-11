import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {});
  return (
    <div className="font-AlbertSans">
      <div className="flex justify-end my-6 mx-10">
        <button
          className="bg-[#000] font-medium text-white rounded py-2 px-3 hover:bg-[#2e2e2e]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center">
        {" "}
        {user ? (
          <div className="text-lg p-4">
            {" "}
            Hello, <span className="font-semibold text-xl">{user.name}</span>,
            You are now on authenticated user on this app. You can access logged
            in user anywhere in the app using auth context.
          </div>
        ) : (
          <div>
            Not a user, go to{" "}
            <Link
              className="text-[#0284c7] underline font-AlbertSans"
              to="/login"
            >
              login
            </Link>
            .{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
