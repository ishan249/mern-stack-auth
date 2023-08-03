import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

import axios from "axios";
function Dashboard() {
  const { user } = useContext(AuthContext);
  console.log("user is this ", user);
  // const { token } = useContext(UserContext);
  // console.log(token)
  // const fetchUserProfile = async () => {
  //   if (token) {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/profile",
  //         { token },
  //         { withCredentials: true }
  //       );
  //       setUser(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setUser(null);
  //   }
  // };

  useEffect(() => {
    
  });
  // console.log(user)
  return <div>{user && <div> {user.name}</div>}</div>;
}

export default Dashboard;
