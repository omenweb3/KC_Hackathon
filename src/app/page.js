"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="min-h-screen retro-screen px-6 pt-20">
      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">
          🩺 Retro Health Desk
        </h1>

        <p className="text-xl mb-6 text-gray-700">
          Modernizing traditional hospital notice boards and paper
          appointment registers using today’s web technology.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/appointment"
            className="retro-btn px-6 py-3 rounded"
          >
            Book Appointment
          </a>

          <a
            href="/notice"
            className="px-6 py-3 border-2 border-green-900 font-semibold"
          >
            View Notices
          </a>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="retro-card p-6">
          <h3 className="text-xl font-bold mb-2">
            📅 Digital Appointments
          </h3>
          <p className="text-gray-700">
            Replace paper registers with a simple digital
            appointment booking system.
          </p>
        </div>

        <div className="retro-card p-6">
          <h3 className="text-xl font-bold mb-2">
            📢 Smart Notice Board
          </h3>
          <p className="text-gray-700">
            Hospital notices managed by admins and instantly
            visible to patients.
          </p>
        </div>

        <div className="retro-card p-6">
          <h3 className="text-xl font-bold mb-2">
            📋 Health Records
          </h3>
          <p className="text-gray-700">
            Store basic patient health readings digitally,
            inspired by old medical files.
          </p>
        </div>
      </div>
      
    </div>
    
  );
}
