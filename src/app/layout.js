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
          <nav className="bg-green-900 text-white px-8 py-4 flex justify-between">
            <div className="flex gap-6 font-semibold">
              <a href="/">Home</a>

              <a href="/dashboard">Dashboard</a>

              {/* Everyone can view notices */}
              <a href="/notice">Notice Board</a>

              {/* Patient-only links */}
              {user?.role === "patient" && (
                <>
                  <a href="/appointment">Appointment</a>
                  <a href="/records">Health Records</a>
                </>
              )}

              {/* Admin-only link */}
              {user?.role === "admin" && (
                <a href="/admin">Admin</a>
              )}
            </div>

            <div>
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

        < main className="p-6">{children}</main>
      </body>
    </html >
  );
}
