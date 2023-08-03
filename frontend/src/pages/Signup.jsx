import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState({});
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
            localStorage.setItem("token", responseData.token);
            console.log(responseData);
            navigate("/dashboard");
            alert("successfully signed up with google");
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

    try {
      console.log(name, email, password);
      let response = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      let responseData = await response.json();
      console.log(responseData);
      navigate("/login");
      alert("successfully signed in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
        <button type="submit" style={{ margin: "10px" }}>
          Submit
        </button>
      </form>
      <div id="google-signin"></div>
    </div>
  );
}

export default Signup;
