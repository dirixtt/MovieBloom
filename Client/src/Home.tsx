import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="m-auto w-full">
        <Link to="/register">Register</Link> / 
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}
