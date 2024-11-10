import React from "react";
import "../../app/globals.css";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const handleLogin = () => {
    // Redirects to /api/auth/login to initiate Auth0 login
    window.location.href = "/api/auth/login?returnTo=/home";
  };

  const handleSignup = () => {
    // Redirects to /api/auth/login with a signup hint
    window.location.href = "/api/auth/login?screen_hint=signup";
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Top Navigation with buttons */}
      <div className="flex justify-between items-center w-full px-8 py-8">
        <Link href="/home" passHref>
          <span className="bg-purple text-white py-3 px-4 rounded hover:bg-purple-600">
            Direct to Home Page
          </span>
        </Link>

        <button
          className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={handleLogin}
        >
          Login/Signup
        </button>
      </div>

      {/* Centered Title */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">
          WorkoutBuddy
        </h1>
        <p className="text-lg text-gray-700">Workout to look like Lebron.</p>

        <div className="mt-2">
          <Image
            src="/white_db2.png"
            alt="Workout example"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
