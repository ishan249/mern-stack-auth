import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="content font-AlbertSans mt-16 flex justify-center">
        <div className="p-4 font-medium text-xl">
          Hello User, This is prebuilt <span className="font-semibold text-[#1a1919]">MERN</span> stack authentication system with <span className="font-semibold text-[#1a1919]"> Google
          OAuth login</span>. Find documentation and Code{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0284c7] underline"
            to="https://github.com/ishan249/mern-stack-auth-with-google-signin"
          >
            here
          </Link>
          . I hope you found this helpful. Happy Coding !!
        </div>
      </div>
      <div className="footer">
        Developed by{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0284c7] underline font-AlbertSans"
          to="https://ishanpatel.me"
        >
          Ishan
        </Link>
      </div>
    </div>
  );
}

export default Home;
