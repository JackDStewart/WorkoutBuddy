import React from "react";
import "../../app/globals.css";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const handleLogin = () => {
    // Redirects to /api/auth/login to initiate Auth0 login
    window.location.href = "/api/auth/login?returnTo=/home";
  };

  return (
    <div className="flex flex-col items-center mt-40">
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
      <button
        className="bg-purple text-white text-2xl font-bold px-6 py-4 rounded-lg hover:bg-purple-600"
        onClick={handleLogin}
      >
        Login/Signup
      </button>
    </div>
  );
}
