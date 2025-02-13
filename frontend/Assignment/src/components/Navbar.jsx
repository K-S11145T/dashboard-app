import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navbar() {
  return (
    <nav className="bg-transparent absolute w-full flex items-center justify-between px-10 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/login" className="text-white hover:text-blue-300 transition duration-500">Login</Link>
        </li>
        <li>
          <Link to="/register" className="text-white hover:text-blue-300 transition duration-500">Register</Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white hover:text-blue-300 transition duration-500">Dashboard</Link>
        </li>
      </ul>
      <div className="bg-red-500 p-3 rounded-xl">
        <Logout /> {/* Yahan Link hata do, directly Logout component ko call karo */}
      </div>
    </nav>
  );
}

export default Navbar;
