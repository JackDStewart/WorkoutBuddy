import React from "react";
import "../../app/globals.css";
import { useAuth0 } from "@auth0/auth0-react"; 
import Link from "next/link"; 
import Image from "next/image"; 


export default function LoginPage() {
  const { loginWithRedirect } = useAuth0(); 

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        targetUrl: '/home', 
      },
    });
  };

  const handleSignup = () => {
    window.location.href = `https://dev-tl8gmur5p3a4r3sh.us.auth0.com/authorize?client_id=wJdnyIJSDQaQaptdE7aqe2jF7wCUdxSS&redirect_uri=${encodeURIComponent('http://localhost:3000/home')}&response_type=code&scope=openid profile email&screen_hint=signup`;
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
          onClick={handleSignup}
          className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Login/Signup
        </button>
      </div>

      {/* Centered Title */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">WorkoutBuddy</h1>
        <p className="text-lg text-gray-700">
          Workout to look like Lebron.
        </p>
      
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
