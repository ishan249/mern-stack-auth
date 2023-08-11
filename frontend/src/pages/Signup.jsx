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
  const { handleSignUp } = useContext(AuthContext);
  const { handleGoogleLogin } = useContext(AuthContext);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_KEY,
        callback: async (response) => {
          var userObj = jwtDecode(response.credential);

          try {
            const result = await handleGoogleLogin(
              userObj.name,
              userObj.email,
              userObj.sub
            );
            if (result.success) {
              toast.success("Logged in with google successfully!");
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);
            } else {
              toast.error(result.error || "Error occurred!! Try again");
            }
          } catch (error) {
            toast.error(error);
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
    const signUpResult = await handleSignUp(name, email, password);

    if (signUpResult.success) {
      toast.success("Signed up successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error(signUpResult.error || "Error occurred!! Try again");
    }
  };

  return (
    <div>
      <div>
        <Toaster position="top-right" />
      </div>
      <Navbar />
      <div className="flex justify-center mt-16 font-AlbertSans">
        <div className="form-box">
          <form onSubmit={handleRegister}>
            <input
              className="inputs"
              type="text"
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
            <br />
            <input
              className="inputs"
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
            <br />
            <input
              className="inputs"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />

            <br />
            <div className="mt-4 flex justify-center submit-form-btn">
              <button type="submit" className="font-semibold w-[100%]">
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center mb-2">or</div>
          <div className="flex justify-center" id="google-signin"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
