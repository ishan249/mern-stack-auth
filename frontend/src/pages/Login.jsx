import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState({});
  let {handleLogin} = useContext(AuthContext)
  // const handleCallbackResponse= async (response) =>{
  //   console.log("credentials: " + response.credential);
  //   var userObj = jwtDecode(response.credential);
  //   console.log(userObj);
  //   setGoogleUser(userObj);
  //   document.getElementById("google-signin").hidden = true;

  //   try {
  //     console.log(userObj.name, userObj.email, userObj.sub);

  //     let response = await fetch("http://localhost:8000/signup/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({name:userObj.name, email:userObj.email, googleId:userObj.sub}),
  //     });

  //     let responseData = await response.json();
  //     console.log(responseData);
  //     navigate("/dashboard");
  //     alert("successfully signed in with google");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
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

            let response = await fetch("http://localhost:8000/signup/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userObj.name,
                email: userObj.email,
                googleId: userObj.sub,
              }),
            });

            let responseData = await response.json();
            console.log(responseData);
            localStorage.setItem("token", responseData.token);
            navigate("/dashboard");
            alert("successfully logged in with google");
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
    // const data = { email, password };
    await handleLogin(email,password)
    // try {
    //   console.log(email, password);
    //   let response = await fetch("http://localhost:8000/login/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //     credentials: "include",
    //   });

    //   let responseData = await response.json();

    //   if (response.ok) {
    //     console.log(responseData);
    //     localStorage.setItem("token", responseData.token);
    //     navigate("/dashboard");
    //     alert("Successfully logged in");
    //   } else {
    //     if (response.status === 401) {
    //       console.log(responseData.error);
    //     } else if (response.status === 404) {
    //       console.log(responseData.error);
    //     } else {
    //       console.log("Server error:", responseData.error);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

  };

  return (
    <div>
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
    </div>
  );
}

export default Login;
