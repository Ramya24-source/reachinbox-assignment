"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            ReachInbox
          </h1>

          <p className="text-gray-500 mt-2">
            Email Campaign Scheduler
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl px-5 py-3 hover:bg-gray-50 transition duration-200 shadow-sm"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          Secure login powered by Google OAuth
        </div>
      </div>
    </div>
  );
}