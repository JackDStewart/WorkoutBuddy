import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    //TODO: route to main page
  };

  const handleLogIn = () => {
    console.log("routing to login");
    setIsLoggedIn(true);
    //TODO: route to login page
  };

  const handleDash = () => {
    //TODO: route to dashboard
  };

  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <div>Logo/Brand</div>
      <div className="flex space-x-4">
        <Link
          href="/"
          passHref
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </Link>
        <Link
          href="/about"
          passHref
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          About
        </Link>
        {isLoggedIn && (
          <Link
            href="/dashboard"
            passHref
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
