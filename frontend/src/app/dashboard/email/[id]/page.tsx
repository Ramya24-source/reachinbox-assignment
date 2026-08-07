"use client";

import { useParams } from "next/navigation";

export default function EmailDetails() {
  const params = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">
        Email Details
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p>
          Selected Email ID:
          <strong> {params.id}</strong>
        </p>
      </div>
    </div>
  );
}