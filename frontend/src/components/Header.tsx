"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  console.log("SESSION:", session);

  return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex items-center gap-3">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        )}

        <div>
          <p className="font-semibold">
            {session?.user?.name}
          </p>

          <p className="text-sm text-gray-500">
            {session?.user?.email}
          </p>
        </div>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}