import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react"; // Import icon

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  // Dummy data for now
  const dummyCreationData = [
    { id: 1, name: "Creation 1" },
    { id: 2, name: "Creation 2" },
    { id: 3, name: "Creation 3" },
  ];

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white
        rounded-xl border border-gray-200 shadow-sm">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7]
          flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
