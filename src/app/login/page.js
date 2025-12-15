"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("patient");

    // Redirect if already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            window.location.href = "/";
        }
    }, []);

    const handleLogin = () => {
        if (!username.trim()) {
            alert("Please enter username");
            return;
        }

        localStorage.setItem(
            "user",
            JSON.stringify({ username, role })
        );

        const records =
            JSON.parse(localStorage.getItem("healthRecords")) || {};

        if (role === "patient" && !records[username]) {
            records[username] = [
                { bp: "120/80", sugar: "95", temp: "98.6" }
            ];
            localStorage.setItem(
                "healthRecords",
                JSON.stringify(records)
            );
        }


        // Force refresh so navbar updates
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center retro-screen">
            <div className="retro-card p-6 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Login
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 w-full mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <select
                    className="border p-2 w-full mb-4"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    onClick={handleLogin}
                    className="retro-btn w-full py-2"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
