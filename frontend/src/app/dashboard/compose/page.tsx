
"use client";

import { useState } from "react";
<div className="bg-white border-b px-8 py-4">
  <h1 className="text-2xl font-semibold">
    Scheduled Emails
  </h1>
</div>

export default function ComposePage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [delay, setDelay] = useState("");
  const [hourlyLimit, setHourlyLimit] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      if (!csvFile) {
        setMessage("Please upload a CSV file");
        return;
      }

      const formData = new FormData();

      formData.append("file", csvFile);
      formData.append("subject", subject);
      formData.append("body", body);
      formData.append("delay", delay);
      formData.append("hourlyLimit", hourlyLimit);

      const response = await fetch(
        "http://localhost:5000/api/schedule",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(data.message || "Emails Scheduled Successfully");

      setCsvFile(null);
      setSubject("");
      setBody("");
      setDelay("");
      setHourlyLimit("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to schedule emails");
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-semibold mb-8">
        Compose Email
      </h1>

      <div className="space-y-5">

        <div>
         <label className="block font-medium mb-2">
  Upload Recipient List
</label>

          <input
  type="file"
  accept=".csv"
  className="w-full border rounded-lg p-3 bg-white"

            onChange={(e) => {
              if (e.target.files?.[0]) {
                setCsvFile(e.target.files[0]);
              }
            }}
            
          />
        </div>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded p-3"
        />

        <div className="flex gap-4">

          <input
            type="number"
            placeholder="Delay Between Emails (seconds)"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className="border rounded p-3"
          />

          <input
            type="number"
            placeholder="Hourly Limit"
            value={hourlyLimit}
            onChange={(e) => setHourlyLimit(e.target.value)}
            className="border rounded p-3"
          />

        </div>

        <textarea
          placeholder="Write your email..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded p-3"
          rows={10}
        />

        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          Send
        </button>

        {message && (
          <p className="text-green-600 font-medium">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}