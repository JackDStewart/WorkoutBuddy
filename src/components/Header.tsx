import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const getGreetingText = () => {
    const route = router.pathname;

    switch (route) {
      case "/home":
        return "Hello, user";
      case "/create":
        return "Create Workout";
      case "/social":
        return "Connect with Others";
      case "/progress":
        return "Track Your Progress";
      case "/explore":
        return "Explore New Workouts";
      default:
        return "Hello, user";
    }
  };

  const isActiveLink = (path: string) => router.pathname === path;

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
      <h1 className="text-4xl font-medium text-center">Workout Buddy</h1>
      <div
        id="buttons"
        className="pt-6 w-full flex items-left justify-center text-l"
      >
        <Link
          href={"/home"}
          className={`border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5 ${
            isActiveLink("/home") ? "font-bold text-black" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href={"/create"}
          className={`border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5 ${
            isActiveLink("/create") ? "font-bold text-black" : ""
          }`}
        >
          Create Workout
        </Link>
        <Link
          href={"/social"}
          className={`border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5 ${
            isActiveLink("/social") ? "font-bold text-black" : ""
          }`}
        >
          Social
        </Link>
        <Link
          href={"/progress"}
          className={`border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5 ${
            isActiveLink("/progress") ? "font-bold text-black" : ""
          }`}
        >
          Progress
        </Link>
        <Link
          href={"/explore"}
          className={`border border-none bg-purple w-[180px] p-2 rounded-full text-center mx-1.5 ${
            isActiveLink("/explore") ? "font-bold text-black" : ""
          }`}
        >
          Explore Workouts
        </Link>
      </div>
      <div className="relative">
        <h1 className="code-font text-4xl mt-10">{getGreetingText()}</h1>
        <Link
          href="/"
          passHref
          className="absolute top-0 right-0 bg-purple hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Header;
