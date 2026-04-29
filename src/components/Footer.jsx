"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-gray-200 mt-10 px-6 py-8 bg-gradient-to-r from-blue-50/80 to-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary hover:opacity-80 transition">
          <img
            src="/icon.png"
            alt="Medicore Logo"
            className="w-5 h-5 object-contain"
          />
          Medicore
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          <Link
            href="/about"
            className={`transition hover:underline ${pathname === "/about" ? "text-primary font-semibold" : "hover:text-primary"}`}
          >
            About
          </Link>
          <Link
            href="/privacy"
            className={`transition hover:underline ${pathname === "/privacy" ? "text-primary font-semibold" : "hover:text-primary"}`}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className={`transition hover:underline ${pathname === "/terms" ? "text-primary font-semibold" : "hover:text-primary"}`}
          >
            Terms
          </Link>
        </div>

        {/* Copyright */}
        <div>
          © {new Date().getFullYear()} Medicore
        </div>
      </div>
    </footer>
  );
}