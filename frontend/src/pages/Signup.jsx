import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState({});
  const { handleSignUp } = useContext(AuthContext);
  const { handleGoogleLogin } = useContext(AuthContext);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_KEY,
        callback: async (response) => {
          console.log("credentials: " + response.credential);
          var userObj = jwtDecode(response.credential);
          console.log(userObj);
          setGoogleUser(userObj);
          document.getElementById("google-signin").hidden = true;

          try {
            console.log(userObj.name, userObj.email, userObj.sub);
            await handleGoogleLogin(userObj.name, userObj.email, userObj.sub);
          } catch (error) {
            console.log(error);
          }
        },
      });

      google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    initializeGoogleSignIn();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    await handleSignUp(name, email, password);
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Navbar />
      <div className="flex justify-center font-AlbertSans">
        <div className="form-box">
        <form onSubmit={handleRegister}>
          <input
            className="inputs"
            type="text"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <br />
          <input
            className="inputs"
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <br />
          <input
            className="inputs"
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <br />
          <div className="mt-4 flex justify-center submit-form-btn">
            <button type="submit" className="font-semibold w-[100%]">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mb-2">or</div>
        <div className="w-[90%]" id="google-signin"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
