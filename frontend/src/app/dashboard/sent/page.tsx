"use client";

import { useEffect, useState } from "react";

interface Email {
  id: number;
  recipient: string;
  status: string;
  sentTime: string | null;
}

export default function SentPage() {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/emails"
        );

        const data = await res.json();

        const sentEmails = data.filter(
          (item: Email) => item.status === "sent"
        );

        setEmails(sentEmails);
      } catch (err) {
        console.error(err);
      }
    };

    loadEmails();
  }, []);

  const deleteEmail = async (id: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this email?"
      );

      if (!confirmed) return;

      await fetch(
        `http://localhost:5000/api/emails/${id}`,
        {
          method: "DELETE",
        }
      );

      setEmails((prev) =>
        prev.filter((email) => email.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-semibold">
          Sent Emails
        </h1>

        <input
          type="text"
          placeholder="Search recipient..."
          className="w-full border rounded-lg p-3 mt-4"
        />
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg shadow">
          {emails.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No sent emails found
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className="border-b p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">
                      {email.recipient}
                    </p>

                    <p className="text-sm text-gray-500">
                      Campaign #{email.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex gap-2 justify-end">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Sent
                      </span>

                      <button
                        onClick={() =>
                          deleteEmail(email.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {email.sentTime
                        ? new Date(
                            email.sentTime
                          ).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}