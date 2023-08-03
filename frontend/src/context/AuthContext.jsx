import React, { createContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext("")

export default AuthContext

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  let [token, setToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );

  const handleLogin = async (email, password) => {
    let data = { email, password };
    console.log(email, password);

    let response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    let responseData = await response.json();

    if (response.ok) {
      console.log(responseData);
      setToken(responseData.token);
      setUser(jwtDecode(responseData.token))
      localStorage.setItem("token", responseData.token);
      navigate("/dashboard");
    } else {
      if (response.status === 401) {
        console.log(responseData.error);
      } else if (response.status === 404) {
        console.log(responseData.error);
      } else {
        console.log("Server error:", responseData.error);
      }
    }
  };

  let context = {
    token: token,
    user: user,
    handleLogin: handleLogin,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
