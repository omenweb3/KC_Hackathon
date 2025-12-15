"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Appointment() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);

  // Protect route + load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "patient") {
      router.push("/login");
      return;
    }
    setUser(storedUser);
  }, [router]);

  const bookAppointment = () => {
    if (!doctor || !date) return alert("Fill all fields");

    const appointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push({
      username: user.username,
      doctor,
      date,
    });

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    setSuccess(true);
  };

  if (!user) return null;

  return (
    <div className="flex justify-center mt-16">
      <div className="retro-card p-6 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4">
          Book Appointment
        </h2>

        {/* Auto-filled username */}
        <input
          value={user.username}
          disabled
          className="border p-2 w-full mb-3 bg-gray-100"
        />

        <input
          type="date"
          className="border p-2 w-full mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          <option>General Physician</option>
          <option>Cardiologist</option>
          <option>Dermatologist</option>
        </select>

        <button
          onClick={bookAppointment}
          className="retro-btn px-4 py-2"
        >
          Book Appointment
        </button>

        {success && (
          <p className="mt-4 text-green-700 font-semibold">
            ✅ Appointment booked successfully!
          </p>
        )}
      </div>
    </div>
  );
}
