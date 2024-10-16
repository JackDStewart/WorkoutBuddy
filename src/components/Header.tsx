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
    <div id="header" className="pr-20 pl-20 pt-10">
      <h1 className="text-4xl font-bold text-center">Workout Buddy</h1>
      <div
        id="buttons"
        className="pt-6 w-full flex items-left justify-center text-l"
      >
        <Link
          href={"/home"}
          className="border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5"
        >
          Dashboard
        </Link>
        <Link
          href={"/create"}
          className="border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5"
        >
          Create Workout
        </Link>
        <Link
          href={"/social"}
          className="border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5"
        >
          Social
        </Link>
        <Link
          href={"/progess"}
          className="border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5"
        >
          Progess{" "}
        </Link>
        <Link
          href={"/explore"}
          className="border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5"
        >
          Explore Workouts{" "}
        </Link>
      </div>
    </div>
  );
};

export default Header;
