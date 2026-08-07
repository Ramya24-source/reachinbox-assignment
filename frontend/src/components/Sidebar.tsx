"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Compose",
      href: "/dashboard/compose",
    },
    {
      name: "Scheduled",
      href: "/dashboard/scheduled",
    },
    {
      name: "Sent",
      href: "/dashboard/sent",
    },
  ];

  return (
    <div className="w-64 h-screen border-r bg-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        ReachInbox
      </h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}