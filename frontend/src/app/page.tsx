import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold">
          ReachInbox Dashboard
        </h2>

        <p>Select Scheduled or Sent from sidebar.</p>
      </div>
    </div>
  );
}