"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const priorityOrder = {
    critical: 1,
    important: 2,
    general: 3,
};

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const savedAppointments =
            JSON.parse(localStorage.getItem("appointments")) || [];

        setAppointments(savedAppointments);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            router.push("/login");
            return;
        }
        setUser(storedUser);

        const savedNotices =
            JSON.parse(localStorage.getItem("notices")) || [];

        savedNotices.sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );

        setNotices(savedNotices);

    }, [router]);

    if (!user) return null;

    const criticalCount = notices.filter(
        (n) => n.priority === "critical"
    ).length;

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">
                Hospital Dashboard
            </h1>

            {/* TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Appointments Today"
                    value={appointments.length}
                    color="green"
                />
                <StatCard title="Active Notices" value={notices.length} color="blue" />
                <StatCard title="Critical Alerts" value={criticalCount} color="red" />
                <StatCard title="System Status" value="ONLINE" color="emerald" />
            </div>

            {/* USER INFO */}
            <div className="retro-card p-6 mb-8">
                <h2 className="text-xl font-bold mb-2">Logged In User</h2>
                <p>
                    <b>Username:</b> {user.username}
                </p>
                <p>
                    <b>Role:</b> {user.role.toUpperCase()}
                </p>
            </div>

            {/* NOTICE SUMMARY */}
            <div className="retro-card p-6">
                <h2 className="text-xl font-bold mb-4">
                    Notice Priority Overview
                </h2>

                {notices.length === 0 ? (
                    <p className="text-gray-600">No notices available</p>
                ) : (
                    <ul className="space-y-2">
                        {notices.map((n, i) => (
                            <li
                                key={i}
                                className={`flex items-center gap-3 p-2 ${n.priority === "critical" ? "critical-alert" : ""
                                    }`}
                            >

                                <span>
                                    {n.priority === "critical" && "🔴"}
                                    {n.priority === "important" && "🟡"}
                                    {n.priority === "general" && "🟢"}
                                </span>
                                <span>{n.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="retro-card p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">
                    Recent Appointments
                </h2>

                {appointments.length === 0 ? (
                    <p className="text-gray-600">No appointments booked</p>
                ) : (
                    <ul className="space-y-2">
                        {appointments.map((a, i) => (
                            <li key={i} className="border p-2">
                                👤 {a.username} | 🩺 {a.doctor} | 📅 {a.date}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div className="retro-card p-5 text-center">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className={`text-3xl font-bold text-${color}-700`}>
                {value}
            </p>
        </div>
    );
}
