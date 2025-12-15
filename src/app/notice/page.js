"use client";

import { useEffect, useState } from "react";

const priorityOrder = {
  critical: 1,
  important: 2,
  general: 3,
};

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notices")) || [];
    saved.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setNotices(saved);
  }, []);

  const getStyle = (priority) => {
    if (priority === "critical") return "bg-red-100 border-red-600";
    if (priority === "important") return "bg-yellow-100 border-yellow-600";
    return "bg-green-100 border-green-600";
  };

  const getIcon = (priority) => {
    if (priority === "critical") return "🔴";
    if (priority === "important") return "🟡";
    return "🟢";
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="retro-card p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Hospital Notice Board</h2>

        {notices.length === 0 ? (
          <p className="text-gray-600">No notices available</p>
        ) : (
          <ul className="space-y-3">
            {notices.map((n, i) => (
              <li
                key={i}
                className={`border-l-4 p-3 ${getStyle(n.priority)}`}
              >
                <span className="font-bold">
                  {getIcon(n.priority)} {n.priority.toUpperCase()}
                </span>
                <p>{n.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
