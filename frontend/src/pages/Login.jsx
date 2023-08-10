import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { handleLogin } = useContext(AuthContext);
  let { handleGoogleLogin } = useContext(AuthContext);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_KEY,
        callback: async (response) => {
          console.log("credentials: " + response.credential);
          var userObj = jwtDecode(response.credential);
          console.log(userObj);
          // setGoogleUser(userObj);
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

  const handleLoginUser = async (e) => {
    e.preventDefault();

    await handleLogin(email, password);
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Navbar />

      <form onSubmit={handleLoginUser}>
        <input
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          className="inputs"
          type="email"
          placeholder="email"
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
        <button type="submit" style={{ margin: "10px" }}>
          Login
        </button>
      </form>
      <div id="google-signin"></div>

      <button
        onClick={() => {
          toast.success("workingg");
        }}
      >
        click
      </button>
    </div>
  );
}

export default Login;
