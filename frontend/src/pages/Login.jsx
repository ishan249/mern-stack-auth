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
          theme: "standard",
          size: "large",
        }
      );
    };

    initializeGoogleSignIn();
  }, []);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const loginResult = await handleLogin(email, password);
    if (loginResult.success) {
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error(loginResult.error || "Error occurred!! Try again");
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
          <form onSubmit={handleLoginUser}>
            <input
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              className="inputs"
              type="email"
              placeholder="Email"
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
                Login
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

export default Login;
