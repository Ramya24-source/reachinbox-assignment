"use client";

import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header />

      <div className="p-6">
        <h1>ReachInbox Dashboard</h1>
      </div>
    </>
  );
}