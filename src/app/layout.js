"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body>
        {!hideNavbar && (
          <nav className="bg-green-900 text-white px-8 py-4 grid grid-cols-3 items-center">
            
            {/* LEFT: Website Name */}
            <div className="font-bold text-lg">
              <a href="/">Retro Health Desk</a>
            </div>

            {/* CENTER: Navigation */}
            <div className="flex justify-center gap-6 font-semibold">
              <a href="/">Home</a>

              {user && <a href="/dashboard">Dashboard</a>}

              <a href="/notice">Notice Board</a>

              {user?.role === "patient" && (
                <>
                  <a href="/appointment">Appointment</a>
                  <a href="/records">Health Records</a>
                </>
              )}

              {user?.role === "admin" && (
                <a href="/admin">Admin</a>
              )}
            </div>

            {/* RIGHT: Login / Logout */}
            <div className="flex justify-end">
              {user ? (
                <button onClick={logout} className="underline">
                  Logout ({user.username})
                </button>
              ) : (
                <a href="/login" className="underline">Login</a>
              )}
            </div>

          </nav>
        )}

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
