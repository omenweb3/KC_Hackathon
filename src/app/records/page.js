"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HealthRecords() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(null);

  // Protect route + load patient records
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      router.push("/login");
      return;
    }

    setUser(storedUser);

    const allRecords =
      JSON.parse(localStorage.getItem("healthRecords")) || {};

    setRecords(allRecords[storedUser.username] || []);
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex justify-center mt-16">
      <div className="retro-card p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">
          Health Records – {user.username}
        </h2>

        {records.length === 0 ? (
          <p className="text-gray-600">
            No health records available.
          </p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="border p-2">BP</th>
                <th className="border p-2">Sugar</th>
                <th className="border p-2">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td className="border p-2">{r.bp}</td>
                  <td className="border p-2">{r.sugar}</td>
                  <td className="border p-2">{r.temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
