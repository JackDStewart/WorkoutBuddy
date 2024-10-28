import React from "react";
import "../../app/globals.css";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import Link from "next/link"; // Import Link from Next.js

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0(); // Get loginWithRedirect function

  const handleLogin = async () => {
    // Call loginWithRedirect to log in the user
    await loginWithRedirect({
      appState: {
        targetUrl: '/home', // This is the target URL to redirect after login
      },
    });
  };

  const handleSignup = () => {
    // Directly navigate to the Auth0 signup URL
    window.location.href = `https://dev-tl8gmur5p3a4r3sh.us.auth0.com/authorize?client_id=wJdnyIJSDQaQaptdE7aqe2jF7wCUdxSS&redirect_uri=${encodeURIComponent('http://localhost:3000/home')}&response_type=code&scope=openid profile email&screen_hint=signup`;
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-8">
        <h1 className="code-font text-3xl font-bold mb-16">WorkoutBuddy</h1>
        <div className="bg-[#333333] rounded-lg shadow-md p-8 pb-10 w-full max-w-md">
          <h2 className="code-font text-2xl font-bold mb-4">Login</h2>
          <h3 className="code-font text-gray mb-4">
            Sign in to your account to continue
          </h3>
          <form className="flex flex-col w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email"
              className="w-3/4 p-2 border text-[#121212] border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-purple mb-6"
            />
            <input
              type="password"
              placeholder="password"
              className="w-3/4 p-2 border text-[#121212] border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-purple mb-4"
            />
            <Link
              href={"/home"}
              passHref
              type="submit"
              className="flex w-1/4 justify-center bg-purple text-white text-l font-bold p-2.5 rounded-lg hover:bg-transitionPurple transition duration-300 mt-4"
            >
              {" "}
              Login
            </Link>
          </form>
          <div className="flex justify-center mt-8">
            <span className="text-white text-l">
              Don’t have an account?&nbsp;
            </span>
            <button
              onClick={handleSignup} // Call handleSignup on click
              className="text-white text-l underline transition duration-300"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
