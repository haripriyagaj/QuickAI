import React, { useState, useEffect } from "react";
import { Sparkles, Gem } from "lucide-react";
import { Protect } from "@clerk/clerk-react";

// ✅ Creation Item Component
const CreationItem = ({ item }) => {
  return (
    <div className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer">
      {/* Title */}
      <h2 className="font-medium text-slate-700">{item.prompt}</h2>

      {/* Type + Date */}
      <p className="text-gray-500 text-xs mt-1">
        {item.type} - {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Invalid Date"}
      </p>

      {/* Type Badge */}
      <button className="mt-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-3 py-1 rounded-full text-xs">
        {item.type}
      </button>
    </div>
  );
};

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  // Dummy data (replace later with API data)
  const dummyCreationData = [
    {
      id: 1,
      prompt: "Generate a blog title for the keyword blog in the category Technology.",
      type: "blog-title",
      createdAt: null, // to show "Invalid Date"
    },
    {
      id: 2,
      prompt: "Generate a blog title for the keyword blog in the category General.",
      type: "blog-title",
      createdAt: null,
    },
    {
      id: 3,
      prompt: "Write an article about AI With Coding in Short (500-800 words).",
      type: "article",
      createdAt: null,
    },
  ];

  useEffect(() => {
    setCreations(dummyCreationData);
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>

        {/* Recent Creations */}
        <div className="space-y-3 w-full max-w-2xl">
          <p className="mt-6 mb-4 font-semibold text-slate-700">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
