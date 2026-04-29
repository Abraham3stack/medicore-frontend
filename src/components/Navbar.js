"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getUser, logout } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const baseBtn = "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200";
  const ghostBtn = `${baseBtn} border-transparent text-textPrimary hover:bg-primary/10 hover:text-primary`;
  const activeBtn = `${baseBtn} border-primary text-primary bg-primary/10 font-semibold`;
  const primaryBtn = "px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-sm hover:scale-105 transition";
  const dangerBtn = "px-4 py-2 rounded-full bg-danger text-white text-sm font-semibold shadow-sm hover:scale-105 transition";

  useEffect(() => {
    const handleClickOutside = (e) => {
      // ignore clicks on the toggle button
      if (e.target.closest("button[aria-label='Toggle menu']")) return;

      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Fetch User
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [router]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = getUser();
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  // Logout Logic
  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="relative w-full sticky top-0 z-50 bg-gradient-to-r from-blue-50/80 to-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="group flex items-center gap-2 cursor-pointer transition"
      >
        <img
          src="/icon.png"
          alt="Medicore Logo"
          className="w-8 h-8 object-contain transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        />
        <h1 className="text-xl font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
          Medicore
        </h1>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 group"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-textPrimary transition-all duration-300 ${
            open ? "rotate-45 translate-y-1.5 bg-primary" : "group-hover:bg-primary"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-textPrimary my-1 transition-all duration-300 ${
            open ? "opacity-0" : "group-hover:bg-primary"
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-textPrimary transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-1.5 bg-primary" : "group-hover:bg-primary"
          }`}
        />
      </button>

      {/* Nav Links (Right side) */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <button
              onClick={() => {
                if (pathname !== "/") router.push("/#features");
                else document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={ghostBtn}
            >
              Features
            </button>
            <button
              onClick={() => {
                if (pathname !== "/") router.push("/#stats");
                else {
                  const el = document.getElementById("stats");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 80; // offset for navbar
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }
              }}
              className={ghostBtn}
            >
              Stats
            </button>
            <button
              onClick={() => router.push("/login")}
              className={ghostBtn}
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className={primaryBtn}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-textSecondary capitalize">
              {user.firstName}
            </span>

            <button
              onClick={() => {
                if (user.role === "admin") router.push("/admin");
                else if (user.role === "doctor") router.push("/doctor");
                else router.push("/dashboard");
              }}
              className={
                pathname === "/admin" || pathname === "/doctor" || pathname === "/dashboard"
                  ? activeBtn
                  : ghostBtn
              }
            >
              Dashboard
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => router.push("/admin/users")}
                className={
                  pathname.startsWith("/admin/users")
                    ? activeBtn
                    : ghostBtn
                }
              >
                Users
              </button>
            )}

            {user.role === "patient" && (
              <button
                onClick={() => router.push("/appointments")}
                className={
                  pathname.startsWith("/appointments")
                    ? activeBtn
                    : ghostBtn
                }
              >
                Appointments
              </button>
            )}

            <button
              onClick={handleLogout}
              className={dangerBtn}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <div
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-surface border-b shadow-sm px-6 py-4 flex flex-col gap-3 transition-all duration-300 ease-in-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        {!user ? (
          <>
            <button
              onClick={() => {
                setOpen(false);
                if (pathname !== "/") router.push("/#features");
                else document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`${ghostBtn} text-left w-full`}
            >
              Features
            </button>
            <button
              onClick={() => {
                setOpen(false);
                if (pathname !== "/") router.push("/#stats");
                else {
                  const el = document.getElementById("stats");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 80; // offset for navbar
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }
              }}
              className={`${ghostBtn} text-left w-full`}
            >
              Stats
            </button>
            <button
              onClick={() => { setOpen(false); router.push("/login"); }}
              className={`${ghostBtn} text-left w-full`}
            >
              Login
            </button>
            <button
              onClick={() => { setOpen(false); router.push("/register"); }}
              className={`${primaryBtn} text-left w-full`}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-textSecondary capitalize">
              {user.firstName}
            </span>
            <button
              onClick={() => {
                setOpen(false);
                if (user.role === "admin") router.push("/admin");
                else if (user.role === "doctor") router.push("/doctor");
                else router.push("/dashboard");
              }}
              className={`text-left w-full hover:text-primary ${
                pathname === "/admin" || pathname === "/doctor" || pathname === "/dashboard"
                  ? activeBtn
                  : ghostBtn
              }`}
            >
              Dashboard
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/admin/users");
                }}
                className={`text-left w-full hover:text-primary ${
                  pathname.startsWith("/admin/users")
                    ? activeBtn
                    : ghostBtn
                }`}
              >
                Users
              </button>
            )}
            {user.role === "patient" && (
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/appointments");
                }}
                className={`text-left w-full hover:text-primary ${
                  pathname.startsWith("/appointments")
                    ? activeBtn
                    : ghostBtn
                }`}
              >
                Appointments
              </button>
            )}
            <button
              onClick={() => { setOpen(false); handleLogout(); }}
              className={`${dangerBtn} text-left w-full`}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}