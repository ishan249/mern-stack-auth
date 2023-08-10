import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {});
  return (
    <div>
      <div>{user && <div> {user.name}</div>}</div>
    </div>
  );
}

export default Dashboard;
