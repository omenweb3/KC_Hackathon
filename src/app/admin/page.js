"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("general");

  // Protect admin route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(saved);
  }, [router]);

  const addNotice = () => {
    if (!text.trim()) return;

    const newNotice = { text, priority };
    const updated = [...notices, newNotice];

    localStorage.setItem("notices", JSON.stringify(updated));
    setNotices(updated);
    setText("");
    setPriority("general");
  };

  const clearNotices = () => {
    localStorage.removeItem("notices");
    setNotices([]);
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="retro-card p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Admin – Manage Notices</h2>

        <input
          placeholder="Notice text"
          className="border p-2 w-full mb-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="general">🟢 General</option>
          <option value="important">🟡 Important</option>
          <option value="critical">🔴 Critical</option>
        </select>

        <div className="flex gap-4 mb-4">
          <button onClick={addNotice} className="retro-btn px-4 py-2">
            Add Notice
          </button>
          <button
            onClick={clearNotices}
            className="border-2 border-red-700 text-red-700 px-4 py-2"
          >
            Clear All
          </button>
        </div>

        <ul className="space-y-2">
          {notices.map((n, i) => (
            <li key={i} className="border p-2">
              <b>[{n.priority.toUpperCase()}]</b> {n.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
