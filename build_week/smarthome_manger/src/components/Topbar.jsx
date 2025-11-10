import React from "react";
import { Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between mt-4 mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-white p-2 rounded shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input className="ml-2 outline-none" placeholder="Search devices..." />
        </div>
      </div>
    </div>
  );
}