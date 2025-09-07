import React, { useState } from "react";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      {/* Row: Left = title + date, Right = badge */}
      <div className="flex justify-between items-center gap-4">
        <div>
          {/* Prompt / Title */}
          <h2 className="font-medium text-slate-700">{item.prompt}</h2>

          {/* Type + Date */}
          <p className="text-gray-500 text-xs mt-1">
            {item.type} -{" "}
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Invalid Date"}
          </p>
        </div>

        {/* Badge aligned right */}
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-3 py-1 rounded-full text-xs">
          {item.type}
        </button>
      </div>

      {/* Expandable Content */}
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="creation"
              className="w-full max-w-md rounded-md"
            />
          ) : (
            <div className="h-32 overflow-y-auto text-sm text-slate-700 border-t pt-2">
              {item.content}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
