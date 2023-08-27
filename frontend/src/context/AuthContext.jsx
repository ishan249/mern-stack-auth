import React, { createContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext("");

export default AuthContext;

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

    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    });

    let responseData = await response.json();

    if (response.status === 200) {
      setToken(responseData.token);
      setUser(jwtDecode(responseData.token));
      localStorage.setItem("token", responseData.token);
      return { success: true };
    } else {
      return { success: false, error: responseData.error };
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        const loginData = { email, password };
        const loginResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
          credentials: "include",
        });

        if (loginResponse.status === 200) {
          const responseData = await loginResponse.json();
          setToken(responseData.token);
          setUser(jwtDecode(responseData.token));
          localStorage.setItem("token", responseData.token);
          return { success: true };
        } else {
          const errorData = await loginResponse.json();
          return { success: false, error: errorData.error };
        }
      } else {
        return { success: false, error: responseData.error };
      }
    } catch (error) {
      return { success: false, error: "An error occurred" };
    }
  };

  const handleGoogleLogin = async (name, email, googleId) => {
    let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        googleId,
      }),
    });

    let responseData = await response.json();
    if (response.status === 200) {
      setToken(responseData.token);
      setUser(jwtDecode(responseData.token));
      localStorage.setItem("token", responseData.token);
      return { success: true };
    } else {
      return { success: false, error: responseData.error };
    }
  };

  let context = {
    token: token,
    user: user,
    handleLogin: handleLogin,
    handleSignUp: handleSignUp,
    handleGoogleLogin: handleGoogleLogin,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
